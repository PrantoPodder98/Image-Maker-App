import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Nano Banana Artist</h1>
            <p className="text-xs text-zinc-400">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 font-medium">
                v1.0
            </span>
        </div>
      </div>
    </header>
  );
};
