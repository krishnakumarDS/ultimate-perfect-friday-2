
import { EventEmitter } from 'eventemitter3';
import { LiveConfig } from '../multimodal-live-types';
import { blobToJSON, base64ToArrayBuffer } from './utils';

export interface MultimodalLiveAPIClientConnection {
  url?: string;
  apiKey: string;
}

export class MultimodalLiveClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private apiKey: string;
  private url: string;

  constructor({ url, apiKey }: MultimodalLiveAPIClientConnection) {
    super();
    this.apiKey = apiKey;
    this.url = url || '';
  }

  async connect(config: LiveConfig): Promise<boolean> {
    if (this.ws) {
      this.disconnect();
    }

    const wsUrl = `${this.url}?key=${this.apiKey}`;
    console.log('Connecting to:', wsUrl);
    
    this.ws = new WebSocket(wsUrl);

    return new Promise<boolean>((resolve, reject) => {
      if (!this.ws) return reject(new Error('WebSocket not initialized'));

      this.ws.onopen = () => {
        console.log('WebSocket connection opened');
        this.emit('open');
        
        // Send initial setup message
        const setupMessage = { setup: config };
        this.sendMessage(setupMessage);
        console.log('Sent setup message:', setupMessage);
        
        resolve(true);
      };

      this.ws.onmessage = async (event) => {
        try {
          let data;
          if (event.data instanceof Blob) {
            data = await blobToJSON(event.data);
          } else {
            data = JSON.parse(event.data);
          }
          
          console.log('Received message:', data);
          
          // Handle different message types
          if (data.setupComplete) {
            console.log('Setup complete received');
            this.emit('setupcomplete');
          } else if (data.serverContent) {
            this.handleServerContent(data.serverContent);
          } else {
            this.emit('content', data);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
          this.emit('error', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed', event.code, event.reason);
        this.emit('close', event);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
        reject(error);
      };
    });
  }

  private handleServerContent(serverContent: any) {
    if (serverContent.interrupted) {
      this.emit('interrupted');
      return;
    }

    if (serverContent.turnComplete) {
      this.emit('turncomplete');
    }

    if (serverContent.modelTurn && serverContent.modelTurn.parts) {
      const parts = serverContent.modelTurn.parts;
      
      // Handle audio parts
      const audioParts = parts.filter((p: any) => 
        p.inlineData && p.inlineData.mimeType && p.inlineData.mimeType.startsWith('audio/pcm')
      );
      
      audioParts.forEach((part: any) => {
        if (part.inlineData && part.inlineData.data) {
          const audioData = base64ToArrayBuffer(part.inlineData.data);
          console.log('Emitting audio data:', audioData.byteLength, 'bytes');
          this.emit('audio', audioData);
        }
      });

      // Handle other content
      const otherParts = parts.filter((p: any) => 
        !p.inlineData || !p.inlineData.mimeType || !p.inlineData.mimeType.startsWith('audio/pcm')
      );

      if (otherParts.length > 0) {
        this.emit('content', { modelTurn: { parts: otherParts } });
      }
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  sendRealtimeInput(data: any[]) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendMessage({ realtimeInput: { mediaChunks: data } });
    }
  }

  send(parts: any[], turnComplete: boolean = true) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        clientContent: {
          turns: [{
            role: 'user',
            parts
          }],
          turnComplete
        }
      };
      this.sendMessage(message);
    }
  }

  private sendMessage(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageStr = JSON.stringify(message);
      console.log('Sending message:', messageStr);
      this.ws.send(messageStr);
    } else {
      console.error('WebSocket not connected');
    }
  }
}
