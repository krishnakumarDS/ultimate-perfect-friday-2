
import { EventEmitter } from 'eventemitter3';

export class AudioRecorder extends EventEmitter {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private isRecording = false;

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            this.emit('data', base64);
          };
          reader.readAsDataURL(event.data);
        }
      };

      this.mediaRecorder.start(100); // Capture audio every 100ms
      this.isRecording = true;
      
      // Simulate volume detection
      this.simulateVolumeDetection();
    } catch (error) {
      console.error('Error starting audio recording:', error);
    }
  }

  stop() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  private simulateVolumeDetection() {
    if (!this.isRecording) return;
    
    // Simple random volume simulation
    const volume = Math.random() * 0.5;
    this.emit('volume', volume);
    
    setTimeout(() => this.simulateVolumeDetection(), 100);
  }
}
