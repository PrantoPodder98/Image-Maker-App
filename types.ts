export interface ProcessedImage {
  original: string; // Base64 or URL
  generated: string | null; // Base64 or URL
  prompt: string;
}

export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface GenerationConfig {
  aspectRatio: string;
}
