<?php
/**
 * Test Script untuk Printer Thermal POS-58
 * 
 * Jalankan dengan: php test-printer.php
 * 
 */

require __DIR__ . '/vendor/autoload.php';

use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

echo "===========================================\n";
echo "Test Thermal Printer - POS-58 (58mm)\n";
echo "===========================================\n\n";

// Daftar nama printer yang akan dicoba
$printerOptions = [
    'POS-58',                           // Nama printer langsung
    'smb://localhost/POS-58',           // SMB localhost
    'smb://127.0.0.1/POS-58',           // SMB IP
];

$connector = null;
$connectedWith = '';

// Coba setiap opsi koneksi
foreach ($printerOptions as $option) {
    echo "[INFO] Mencoba koneksi: $option\n";
    try {
        $connector = new WindowsPrintConnector($option);
        $connectedWith = $option;
        echo "[OK] Berhasil dengan: $option\n\n";
        break;
    } catch (Exception $e) {
        echo "[GAGAL] " . $e->getMessage() . "\n\n";
        $connector = null;
    }
}

if ($connector === null) {
    echo "===========================================\n";
    echo "SEMUA METODE KONEKSI GAGAL!\n";
    echo "===========================================\n\n";
    echo "TROUBLESHOOTING:\n";
    echo "1. Pastikan printer sudah dinyalakan dan terkoneksi\n";
    echo "2. Buka Control Panel > Devices and Printers\n";
    echo "3. Klik kanan printer POS-58 > Printer Properties\n";
    echo "4. Tab Sharing > Centang 'Share this printer'\n";
    echo "5. Catat nama share (biasanya 'POS-58')\n";
    echo "6. Atau gunakan FilePrintConnector untuk Windows langsung\n\n";
    
    echo "ALTERNATIF - Coba dengan cara manual:\n";
    echo "1. Buka CMD sebagai Administrator\n";
    echo "2. Jalankan: net use LPT1 \\\\localhost\\POS-58\n";
    echo "3. Kemudian jalankan script ini lagi\n";
    exit(1);
}

try {
    echo "[1] Membuat objek printer...\n";
    $printer = new Printer($connector);
    
    echo "[2] Mencetak test receipt...\n";
    
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
    $printer->text("Koneksi: " . $connectedWith . "\n");
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
    
    // Close connection
    $printer->close();
    
    echo "[3] SUKSES! Receipt berhasil dicetak.\n\n";
    echo "===========================================\n";
    echo "Printer berfungsi dengan baik!\n";
    echo "Gunakan koneksi: $connectedWith\n";
    echo "===========================================\n";
    
} catch (Exception $e) {
    echo "\n[ERROR] Gagal mencetak!\n";
    echo "Pesan Error: " . $e->getMessage() . "\n";
}
