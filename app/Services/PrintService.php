<?php

namespace App\Services;

use App\Models\Transaksi;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;
use Exception;
use Illuminate\Support\Facades\Log;

class PrintService
{
    /**
     * Nama printer
     */
    protected string $printerName = 'POS-58';

    /**
     * Print a receipt for a given order
     */
    public function printReceipt(Transaksi $transaksi): bool
    {
        // Load relations if not already loaded
        $transaksi->load('detailTransaksis.menu');

        // Coba metode WindowsPrintConnector dulu
        try {
            return $this->printWithWindowsConnector($transaksi);
        } catch (Exception $e) {
            Log::warning('WindowsPrintConnector gagal: ' . $e->getMessage() . '. Mencoba metode file...');
        }

        // Fallback ke metode file
        try {
            return $this->printWithFileMethod($transaksi);
        } catch (Exception $e) {
            Log::error('Print Error (semua metode gagal): ' . $e->getMessage());
            throw new Exception('Gagal mencetak nota: ' . $e->getMessage());
        }
    }

    /**
     * Print using WindowsPrintConnector
     */
    protected function printWithWindowsConnector(Transaksi $transaksi): bool
    {
        $printerOptions = [
            $this->printerName,
            'smb://localhost/' . $this->printerName,
            'smb://127.0.0.1/' . $this->printerName,
        ];

        $connector = null;
        foreach ($printerOptions as $option) {
            try {
                $connector = new WindowsPrintConnector($option);
                Log::info("Berhasil terkoneksi dengan: $option");
                break;
            } catch (Exception $e) {
                Log::debug("Gagal koneksi $option: " . $e->getMessage());
                continue;
            }
        }

        if ($connector === null) {
            throw new Exception('WindowsPrintConnector tidak dapat terhubung');
        }

        $printer = new Printer($connector);
        $this->printReceiptContent($printer, $transaksi);
        $printer->cut();
        $printer->close();

        Log::info("Nota {$transaksi->nomor_pesanan} dicetak via WindowsConnector");
        return true;
    }

    /**
     * Print using file method (fallback)
     */
    protected function printWithFileMethod(Transaksi $transaksi): bool
    {
        // Buat file temporary
        $tempFile = sys_get_temp_dir() . '/receipt_' . $transaksi->id . '_' . time() . '.prn';

        // Tulis ke file
        $connector = new FilePrintConnector($tempFile);
        $printer = new Printer($connector);
        $this->printReceiptContent($printer, $transaksi);
        $printer->cut();
        $printer->close();

        Log::info("Receipt file dibuat: $tempFile");

        // Kirim ke printer menggunakan Windows command
        $printerName = $this->printerName;
        
        // Coba berbagai metode print
        $methods = [
            "print /D:\"$printerName\" \"$tempFile\"",
            "copy /b \"$tempFile\" \"\\\\localhost\\$printerName\"",
            "copy /b \"$tempFile\" \"\\\\127.0.0.1\\$printerName\"",
        ];

        $success = false;
        foreach ($methods as $cmd) {
            Log::debug("Mencoba: $cmd");
            $output = shell_exec($cmd . ' 2>&1');
            
            if ($output !== null && stripos($output, 'error') === false && stripos($output, 'tidak') === false) {
                Log::info("Berhasil print dengan: $cmd");
                $success = true;
                break;
            }
        }

        // Hapus file temporary
        if (file_exists($tempFile)) {
            @unlink($tempFile);
        }

        if (!$success) {
            throw new Exception('Gagal mengirim ke printer. Pastikan printer POS-58 tershare dan menyala.');
        }

        Log::info("Nota {$transaksi->nomor_pesanan} dicetak via FileMethod");
        return true;
    }

    /**
     * Print the receipt content (shared between methods)
     */
    protected function printReceiptContent(Printer $printer, Transaksi $transaksi): void
    {
        // === HEADER ===
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->setEmphasis(true);
        $printer->setTextSize(2, 2);
        $printer->text("RM RIAK DANAU\n");
        $printer->setTextSize(1, 1);
        $printer->setEmphasis(false);
        $printer->text("Muaro Bulian, Jambi\n");
        $printer->text("--------------------------------\n");

        // === ORDER INFO ===
        $printer->setJustification(Printer::JUSTIFY_LEFT);
        $printer->text("No: " . $transaksi->nomor_pesanan . "\n");
        $printer->text("Meja: " . $transaksi->meja . "\n");
        $printer->text("Waktu: " . $transaksi->created_at->format('d/m/Y H:i') . "\n");
        $printer->text("Bayar: " . ucfirst($transaksi->metode_pembayaran) . "\n");
        $printer->text("--------------------------------\n");

        // === ITEMS ===
        foreach ($transaksi->detailTransaksis as $detail) {
            $menuName = $detail->menu->nama_menu ?? 'Item';
            $qty = $detail->jumlah;
            $subtotal = $detail->subtotal;

            // Truncate menu name if too long (max 16 chars for 58mm)
            $menuName = mb_substr($menuName, 0, 16);

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $line = sprintf("%-16s x%d\n", $menuName, $qty);
            $printer->text($line);

            $printer->setJustification(Printer::JUSTIFY_RIGHT);
            $printer->text('Rp ' . number_format($subtotal, 0, ',', '.') . "\n");
        }

        $printer->setJustification(Printer::JUSTIFY_LEFT);
        $printer->text("--------------------------------\n");

        // === TOTAL ===
        $printer->setEmphasis(true);
        $printer->setJustification(Printer::JUSTIFY_RIGHT);
        $printer->text("TOTAL: Rp " . number_format($transaksi->total, 0, ',', '.') . "\n");
        $printer->setEmphasis(false);

        $printer->text("--------------------------------\n");

        // === FOOTER ===
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("Terima Kasih!\n");
        $printer->text("Selamat Menikmati\n");
        $printer->text("\n");
    }
}
