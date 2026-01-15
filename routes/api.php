use App\Http\Controllers\GeminiController;

Route::post('/ask-gemini', [GeminiController::class, 'askGemini']);
