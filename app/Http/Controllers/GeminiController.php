<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeminiController extends Controller
{
    public function askGemini(Request $request)
    {
        // 1. Ambil pertanyaan dari React
        $pertanyaan = $request->input('message'); 

        // 2. Siapkan API Key dan URL
        $apiKey = env('GEMINI_API_KEY');
        // Kita pakai model gemini-1.5-flash yang cepat dan gratis
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}";

        // 3. Kirim request ke Google
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $pertanyaan]
                    ]
                ]
            ]
        ]);

        // 4. Cek jika gagal
        if ($response->failed()) {
            return response()->json(['error' => 'Gagal menghubungi AI'], 500);
        }

        // 5. Ambil jawaban teks-nya saja
        $data = $response->json();
        $jawabanAI = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Tidak ada jawaban';

        // 6. Kirim balik ke React
        return response()->json([
            'answer' => $jawabanAI
        ]);
    }
}