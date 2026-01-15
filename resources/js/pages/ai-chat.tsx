import MainContainer from '@/components/main-container';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AiChat() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponseText(null);

        try {
            const res = await fetch('/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN':
                        (
                            document.querySelector(
                                'meta[name="csrf-token"]',
                            ) as HTMLMetaElement
                        )?.content || '',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                setError(err?.error || 'Terjadi kesalahan pada server');
                setLoading(false);
                return;
            }

            const data = await res.json();
            // Coba ekstrak respons teks dari struktur Chat Completions
            const text =
                data?.choices?.[0]?.message?.content ??
                data?.choices?.[0]?.text ??
                JSON.stringify(data);

            setResponseText(text);
        } catch (e: any) {
            setError(e.message || 'Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <Head title="AI Chat" />
            <MainContainer>
                <h1 className="text-2xl font-semibold">AI Chat (Gemini)</h1>
                <p className="mb-4 text-sm text-muted-foreground">
                    Ketik prompt Anda, backend akan meneruskan ke layanan AI.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full rounded-md border p-3"
                        rows={6}
                        placeholder="Tanyakan sesuatu pada AI..."
                    />

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !prompt.trim()}
                        >
                            {loading ? 'Mengirim...' : 'Kirim'}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    {error && <div className="text-destructive">{error}</div>}

                    {responseText && (
                        <div className="rounded-md border p-4 whitespace-pre-wrap">
                            {responseText}
                        </div>
                    )}
                </div>
            </MainContainer>
        </AppLayout>
    );
}
