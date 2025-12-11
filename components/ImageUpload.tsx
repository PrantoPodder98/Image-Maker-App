import React, { useCallback, useState } from 'react';
import { fileToBase64 } from '../utils';

interface ImageUploadProps {
  onImageSelected: (base64: string, file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) return;
      const base64 = await fileToBase64(file);
      onImageSelected(base64, file);
    }
  }, [onImageSelected]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      onImageSelected(base64, file);
    }
  }, [onImageSelected]);

  return (
    <div 
      className={`relative group w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden
        ${isDragging 
          ? 'border-yellow-500 bg-yellow-500/10' 
          : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-800/50'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      
      <div className="flex flex-col items-center gap-4 text-center p-6 transition-transform duration-300 group-hover:scale-105">
        <div className={`p-4 rounded-full ${isDragging ? 'bg-yellow-500/20 text-yellow-500' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" x2="12" y1="3" y2="15"/>
          </svg>
        </div>
        <div>
            <p className="text-lg font-medium text-white mb-1">
                {isDragging ? 'Drop it like it\'s hot' : 'Upload an image'}
            </p>
            <p className="text-sm text-zinc-400">
                Drag & drop or click to browse
            </p>
        </div>
      </div>
    </div>
  );
};
