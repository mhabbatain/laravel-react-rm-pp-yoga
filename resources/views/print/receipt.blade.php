<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=58mm">
    <title>Nota - {{ $transaksi->nomor_pesanan }}</title>
    <style>
        /* Reset dan base styling untuk 58mm printer */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: 58mm auto;
            margin: 0;
        }

        @media print {
            body {
                width: 58mm;
                margin: 0;
                padding: 0;
            }
            .no-print {
                display: none !important;
            }
        }

        body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            width: 58mm;
            padding: 5mm;
            background: white;
            color: black;
        }

        .receipt {
            width: 100%;
        }

        .header {
            text-align: center;
            margin-bottom: 10px;
        }

        .header h1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2px;
        }

        .header p {
            font-size: 10px;
        }

        .divider {
            border-top: 1px dashed #000;
            margin: 8px 0;
        }

        .info {
            font-size: 11px;
            margin-bottom: 5px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
        }

        .items {
            margin: 10px 0;
        }

        .item {
            margin-bottom: 5px;
        }

        .item-name {
            font-size: 11px;
        }

        .item-detail {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            padding-left: 10px;
        }

        .total-section {
            margin-top: 10px;
        }

        .total {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: bold;
        }

        .footer {
            text-align: center;
            margin-top: 15px;
            font-size: 10px;
        }

        .footer p {
            margin: 2px 0;
        }

        /* Preview button (hidden when printing) */
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
        }

        .print-button:hover {
            background: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <!-- Header -->
        <div class="header">
            <h1>RM RIAK DANAU</h1>
            <p>Muaro Bulian, Jambi</p>
        </div>

        <div class="divider"></div>

        <!-- Order Info -->
        <div class="info">
            <div class="info-row">
                <span>No:</span>
                <span>{{ $transaksi->nomor_pesanan }}</span>
            </div>
            <div class="info-row">
                <span>Kasir:</span>
                <span>{{ $transaksi->karyawan->nama ?? $transaksi->user->name ?? '-' }}</span>
            </div>
            <div class="info-row">
                <span>Meja:</span>
                <span>{{ $transaksi->meja }}</span>
            </div>
            <div class="info-row">
                <span>Waktu:</span>
                <span>{{ $transaksi->created_at->format('d/m/Y H:i') }}</span>
            </div>
            <div class="info-row">
                <span>Bayar:</span>
                <span>{{ ucfirst($transaksi->metode_pembayaran) }}</span>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Items -->
        <div class="items">
            @foreach($transaksi->detailTransaksis ?? [] as $detail)
            <div class="item">
                <div class="item-name">{{ $detail->menu->nama_menu ?? 'Item' }}</div>
                <div class="item-detail">
                    <span>{{ $detail->jumlah }} x Rp {{ number_format($detail->menu->harga ?? 0, 0, ',', '.') }}</span>
                    <span>Rp {{ number_format($detail->subtotal, 0, ',', '.') }}</span>
                </div>
            </div>
            @endforeach
        </div>

        <div class="divider"></div>

        <!-- Total -->
        <div class="total-section">
            <div class="total">
                <span>TOTAL</span>
                <span>Rp {{ number_format($transaksi->total, 0, ',', '.') }}</span>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Footer -->
        <div class="footer">
            <p>Terima Kasih!</p>
            <p>Selamat Datang Kembali</p>
            <!-- <p style="margin-top: 10px; font-size: 8px;">{{ now()->format('d/m/Y H:i:s') }}</p> -->
        </div>
    </div>

    <!-- Print Button (hidden when printing) -->
    <button class="print-button no-print" onclick="window.print()">
        🖨️ Cetak Nota
    </button>

    <script>
        // Auto-print when page loads
        window.onload = function() {
            // Small delay to ensure page is fully rendered
            setTimeout(function() {
                window.print();
            }, 500);
        };

        // Close window after print (optional)
        window.onafterprint = function() {
            // window.close(); // Uncomment if you want to auto-close after print
        };
    </script>
</body>
</html>
