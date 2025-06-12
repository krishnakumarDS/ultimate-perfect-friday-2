
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function audioContext({ id }: { id: string }): Promise<AudioContext> {
  const context = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  if (context.state === 'suspended') {
    await context.resume();
  }
  
  return context;
}

export async function blobToJSON(blob: Blob): Promise<any> {
  const text = await blob.text();
  return JSON.parse(text);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
