
export interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp?: number;
}

export interface AnalysisResult {
  id: string;
  analysis: string;
  timestamp: number;
  imageUrl?: string;
}
