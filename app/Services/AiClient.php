<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;

class AiClient
{
    protected string $base;
    protected ?string $key;

    public function __construct()
    {
        $this->base = config('services.gemini.base_url');
        $this->key = config('services.gemini.key');
    }

    /**
     * Kirim prompt ke model chat dan kembalikan respons JSON.
     * Saat ini payload mengikuti pola OpenAI Chat Completions endpoint.
     * Sesuaikan endpoint/payload jika Anda menggunakan endpoint Gemini berbeda.
     *
     * @param string $prompt
     * @param array $opts
     * @return array|null
     */
    public function chat(string $prompt, array $opts = []): ?array
    {
        if (empty($this->key) || empty($this->base)) {
            return null;
        }

        $model = $opts['model'] ?? ($opts['model'] = 'gpt-4o-mini');

        $payload = [
            'model' => $model,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
        ];

        $url = rtrim($this->base, '/') . '/chat/completions';

        $response = Http::withToken($this->key)
            ->timeout(30)
            ->post($url, $payload);

        if ($response->ok()) {
            return $response->json();
        }

        return null;
    }
}
