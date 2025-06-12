import { useRef, useState } from 'react';
import { LiveAPIProvider } from '../contexts/LiveAPIContext';
import { FridayAssistant } from '../components/plumbing-analyzer/PlumbingAnalyzer';
import ControlTray from '../components/control-tray/ControlTray';
import './knobot-page.css';

const API_KEY = "AIzaSyC2KT5jPkFuPMWv7hZgXs1760vkbuJOrRA";
const host = "generativelanguage.googleapis.com";
const url = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

export function KnoBotPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="knobot-page">
      <div className="knobot-header">
        <h1>Friday - Your AI Voice Assistant</h1>
        <p>Your intelligent companion capable of handling any task through voice and visual interaction</p>
      </div>
      <LiveAPIProvider apiKey={API_KEY} url={url}>
        <div className="analyzer-container">
          <div className="content-area">
            <div className="video-container">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline
                muted
                className={videoStream ? 'active' : ''}
              />
              {!videoStream && (
                <div className="video-placeholder">
                  <span className="material-symbols-outlined">videocam_off</span>
                  <p>Camera is off</p>
                </div>
              )}
            </div>
            <FridayAssistant />
          </div>
          <ControlTray
            videoRef={videoRef}
            supportsVideo={true}
            onVideoStreamChange={setVideoStream}
          />
        </div>
      </LiveAPIProvider>
    </div>
  );
}
