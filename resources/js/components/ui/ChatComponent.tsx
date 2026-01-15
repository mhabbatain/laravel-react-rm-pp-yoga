 import React, { useState } from 'react';
import axios from 'axios';

// Definisikan tipe untuk response dari backend (Opsional, tapi Good Practice)
interface GeminiResponse {
  answer: string;
}

const ChatComponent: React.FC = () => {
    // State dengan tipe string
    const [input, setInput] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Function untuk handle kirim data
    const handleSubmit = async () => {
        if (!input.trim()) return; // Jangan kirim kalau kosong

        setLoading(true);
        try {
            // Sesuaikan URL ini dengan alamat Laravel kamu
            // Jika Laravel jalan di port 8000:
            const res = await axios.post<GeminiResponse>('http://localhost:8000/api/analisis-ai', {
                message: input
            });
            
            setResponse(res.data.answer);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResponse("Maaf, terjadi kesalahan saat menghubungi server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Analisis Bisnis AI</h2>
            
            <textarea 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Contoh: Menu apa yang paling laku minggu ini?"
            />
            
            <div className="mt-3 text-right">
                <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Sedang Menganalisis...' : 'Tanya AI'}
                </button>
            </div>
            
            {/* Tampilkan Jawaban jika ada */}
            {response && (
                <div className="mt-6 bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                    <strong className="block mb-2 text-gray-700">Jawaban AI:</strong>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {response}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;