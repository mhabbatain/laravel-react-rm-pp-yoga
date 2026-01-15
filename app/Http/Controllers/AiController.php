<?php

namespace App\Http\Controllers;

use App\Services\AiClient;
use Illuminate\Http\Request;

class AiController extends Controller
{
    protected AiClient $ai;

    public function __construct(AiClient $ai)
    {
        $this->ai = $ai;
    }

    /**
     * Handle chat request from frontend.
     */
    public function chat(Request $request)
    {
        $data = $request->validate([
            'prompt' => 'required|string',
            'model' => 'nullable|string',
        ]);

        $prompt = $data['prompt'];
        $model = $data['model'] ?? null;

        $result = $this->ai->chat($prompt, ['model' => $model]);

        if (is_null($result)) {
            return response()->json([
                'error' => 'Tidak dapat menghubungi layanan AI. Periksa konfigurasi API key dan base_url.'
            ], 500);
        }

        return response()->json($result);
    }
}
