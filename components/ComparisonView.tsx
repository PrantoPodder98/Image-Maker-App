import React from 'react';
import { downloadImage } from '../utils';

interface ComparisonViewProps {
  originalImage: string;
  generatedImage: string | null;
  isLoading: boolean;
  onReset: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ 
  originalImage, 
  generatedImage, 
  isLoading,
  onReset
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Original Image */}
            <div className="relative group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square md:aspect-auto md:h-[500px]">
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white z-10 border border-white/10">
                    Original
                </div>
                <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full h-full object-contain"
                />
                 <button 
                    onClick={onReset}
                    className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                    title="Remove Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
                </button>
            </div>

            {/* Generated Image or Placeholder */}
            <div className={`relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center ${!generatedImage && !isLoading ? 'border-dashed border-zinc-700' : ''}`}>
                <div className="absolute top-4 left-4 bg-yellow-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-zinc-950 z-10 shadow-lg shadow-yellow-500/20">
                    {isLoading ? 'Generating...' : 'Result'}
                </div>

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-sm z-20">
                        <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-yellow-500 font-medium animate-pulse">Consulting the banana...</p>
                    </div>
                )}

                {generatedImage ? (
                    <>
                        <img 
                            src={generatedImage} 
                            alt="Generated" 
                            className="w-full h-full object-contain"
                        />
                        <button 
                            onClick={() => downloadImage(generatedImage, 'nano-banana-art.png')}
                            className="absolute bottom-6 right-6 px-4 py-2 bg-white text-black font-semibold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Download
                        </button>
                    </>
                ) : (
                    !isLoading && (
                        <div className="text-center p-6">
                             <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><image x="4" y="4" width="16" height="16" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzZjNmNDYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcGFya2xlcyI+PHBhdGggZD0ibTEyIDMgLTIuNSAxMExMIDEyIDMgbTIuNSAxMGw3LjUgMi41TDE0LjUgMTggMTIgM2wtMi41IDEwbC03LjUgMi41TDEyIDMyLjUgMTggMTIgMyBsMi41IDEweiIvPjwvc3ZnPg=="/></svg>
                             </div>
                             <p className="text-zinc-500">Enter a prompt to see the magic</p>
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
  );
};
