import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { ComparisonView } from './components/ComparisonView';
import { generateEditedImage } from './services/geminiService';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("create a anime style portfolio image");
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = useCallback((base64: string, file: File) => {
    setOriginalImage(base64);
    setGeneratedImage(null);
    setAppState(AppState.IDLE);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!originalImage) return;
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setAppState(AppState.PROCESSING);
    setError(null);

    try {
      const { imageUrl } = await generateEditedImage(originalImage, prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        setAppState(AppState.COMPLETE);
      } else {
        setError("The model did not return an image. It might have refused the request or returned only text.");
        setAppState(AppState.IDLE);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during generation.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setAppState(AppState.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-yellow-500/30">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Intro / Empty State */}
        {!originalImage && (
          <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Reimagine your photos.
            </h2>
            <p className="text-zinc-400 text-center max-w-lg mb-10 text-lg">
              Upload an image and let Gemini 2.5 Flash transform it into anime, cyberpunk, watercolor, or anything you can imagine.
            </p>
            <div className="w-full max-w-md">
              <ImageUpload onImageSelected={handleImageSelected} />
            </div>
            
             {/* Example Badges */}
             <div className="mt-12 flex flex-wrap justify-center gap-3">
                {['Anime Style', 'Cyberpunk City', 'Oil Painting', 'Pixel Art'].map((style) => (
                    <span key={style} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-sm">
                        {style}
                    </span>
                ))}
             </div>
          </div>
        )}

        {/* Workspace */}
        {originalImage && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            
            {/* Controls */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-end md:items-center shadow-2xl">
              <div className="flex-1 w-full">
                <label htmlFor="prompt" className="block text-sm font-medium text-zinc-400 mb-2">
                  Edit Prompt
                </label>
                <div className="relative">
                    <input
                        id="prompt"
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="e.g. Make it look like a 90s anime screenshot"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    />
                     <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {/* Clear button could go here */}
                     </div>
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={appState === AppState.PROCESSING}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-zinc-950 transition-all transform active:scale-95 flex items-center justify-center gap-2
                  ${appState === AppState.PROCESSING 
                    ? 'bg-zinc-700 cursor-not-allowed opacity-50' 
                    : 'bg-yellow-500 hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40'
                  }`}
              >
                {appState === AppState.PROCESSING ? (
                   <>
                     <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     <span>Processing...</span>
                   </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                        <span>Generate</span>
                    </>
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                {error}
              </div>
            )}

            {/* Viewer */}
            <ComparisonView 
                originalImage={originalImage} 
                generatedImage={generatedImage}
                isLoading={appState === AppState.PROCESSING}
                onReset={handleReset}
            />

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-zinc-900 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Nano Banana Artist. Built with React, Tailwind, and Gemini.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
