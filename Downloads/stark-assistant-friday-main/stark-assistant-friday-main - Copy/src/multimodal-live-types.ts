
export interface LiveConfig {
  model: string;
  generationConfig?: {
    responseModalities?: string;
    speechConfig?: {
      voiceConfig?: {
        prebuiltVoiceConfig?: {
          voiceName?: string;
        };
      };
    };
  };
  systemInstruction?: {
    parts: Array<{
      text: string;
    }>;
  };
  tools?: Array<{ googleSearch: {} }>;
}

export interface ServerContent {
  modelTurn?: {
    parts?: Array<any>;
  };
}

export interface MultimodalLiveAPIClientConnection {
  url?: string;
  apiKey: string;
}
