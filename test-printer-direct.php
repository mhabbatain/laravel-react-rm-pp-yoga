<?php
/**
 * Test Script untuk Printer Thermal POS-58 - Versi Direct Spool
 * 
 * Jalankan dengan: php test-printer-direct.php
 * 
 * Script ini menggunakan pendekatan langsung ke Windows Print Spooler
 */

require __DIR__ . '/vendor/autoload.php';

use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

echo "===========================================\n";
echo "Test Thermal Printer - Direct File Method\n";
echo "===========================================\n\n";

// Buat file temporary untuk output
$tempFile = sys_get_temp_dir() . '/receipt_' . time() . '.prn';

try {
    echo "[1] Membuat file receipt di: $tempFile\n";
    
    // Gunakan FilePrintConnector untuk menulis ke file
    $connector = new FilePrintConnector($tempFile);
    $printer = new Printer($connector);
    
    echo "[2] Memformat receipt...\n";
    
    // === HEADER ===
    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->setEmphasis(true);
    $printer->setTextSize(2, 2);
    $printer->text("RM RIAK DANAU\n");
    $printer->setTextSize(1, 1);
    $printer->setEmphasis(false);
    $printer->text("Muaro Bulian, Jambi\n");
    $printer->text("--------------------------------\n");
    
    // === TEST INFO ===
    $printer->setJustification(Printer::JUSTIFY_LEFT);
    $printer->text("TEST PRINTER\n");
    $printer->text("Waktu: " . date('d/m/Y H:i:s') . "\n");
    $printer->text("Metode: Direct File\n");
    $printer->text("--------------------------------\n");
    
    // === SAMPLE ITEMS ===
    $printer->text("Nasi Goreng      x2\n");
    $printer->setJustification(Printer::JUSTIFY_RIGHT);
    $printer->text("Rp 30.000\n");
    
    $printer->setJustification(Printer::JUSTIFY_LEFT);
    $printer->text("Es Teh           x2\n");
    $printer->setJustification(Printer::JUSTIFY_RIGHT);
    $printer->text("Rp 10.000\n");
    
    $printer->setJustification(Printer::JUSTIFY_LEFT);
    $printer->text("--------------------------------\n");
    
    // === TOTAL ===
    $printer->setEmphasis(true);
    $printer->setJustification(Printer::JUSTIFY_RIGHT);
    $printer->text("TOTAL: Rp 40.000\n");
    $printer->setEmphasis(false);
    
    $printer->text("--------------------------------\n");
    
    // === FOOTER ===
    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->text("*** TEST BERHASIL ***\n");
    $printer->text("Printer berfungsi dengan baik\n");
    $printer->text("\n\n");
    
    // Cut paper
    $printer->cut();
    
    // Close connection (writes to file)
    $printer->close();
    
    echo "[3] File receipt berhasil dibuat!\n";
    echo "[4] Mengirim ke printer...\n";
    
    // Kirim file ke printer menggunakan Windows print command
    // Coba beberapa metode
    $printerName = 'POS-58';
    
    // Metode 1: Menggunakan print command
    $cmd = "print /D:\"$printerName\" \"$tempFile\" 2>&1";
    echo "    Mencoba: $cmd\n";
    $output = shell_exec($cmd);
    
    if ($output === null || stripos($output, 'error') !== false) {
        echo "    Metode print gagal, mencoba copy...\n";
        
        // Metode 2: Menggunakan copy command
        $cmd2 = "copy /b \"$tempFile\" \"\\\\localhost\\$printerName\" 2>&1";
        echo "    Mencoba: $cmd2\n";
        $output2 = shell_exec($cmd2);
        
        if ($output2 === null || stripos($output2, 'error') !== false) {
            echo "    Metode copy juga gagal.\n";
            echo "\n===========================================\n";
            echo "PRINTING GAGAL - Manual steps:\n";
            echo "===========================================\n";
            echo "File receipt sudah dibuat di: $tempFile\n\n";
            echo "Cara print manual:\n";
            echo "1. Buka file tersebut\n";
            echo "2. Right-click > Print\n";
            echo "3. Pilih printer POS-58\n\n";
            echo "Atau dari CMD:\n";
            echo "copy /b \"$tempFile\" LPT1\n";
            echo "(pastikan printer di-map ke LPT1 terlebih dahulu)\n";
        } else {
            echo "[5] SUKSES! Receipt dikirim ke printer.\n";
        }
    } else {
        echo "[5] SUKSES! Receipt dikirim ke printer.\n";
    }
    
    echo "\n===========================================\n";
    echo "File receipt: $tempFile\n";
    echo "===========================================\n";
    
} catch (Exception $e) {
    echo "\n[ERROR] " . $e->getMessage() . "\n";
}
