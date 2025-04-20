'use client';

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Camera, CameraOff, RefreshCw } from 'lucide-react';

declare class ImageCapture {
  constructor(videoTrack: MediaStreamTrack);
  grabFrame(): Promise<ImageBitmap>;
  takePhoto(): Promise<Blob>;
}

const VideoStream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = io('http://localhost:4000'); // Backend WebSocket server URL

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    startCamera();

    return () => {
      stopCamera();
      socketRef.current?.disconnect();
    };
  }, []);

  const startCamera = () => {
    // Request access to the webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        }

        // Capture video frames and send them to the server
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        const captureFrame = () => {
          imageCapture.grabFrame().then(imageBitmap => {
            // Create a canvas to extract image data from the ImageBitmap
            const canvas = document.createElement('canvas');
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;

            // Draw the ImageBitmap on the canvas
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              console.error('Failed to get canvas context');
              return;
            }
            ctx.drawImage(imageBitmap, 0, 0);

            // Convert canvas to a base64 string (remove the "data:image/png;base64," prefix if needed)
            const base64Image = canvas
              .toDataURL('image/jpeg', 0.7)
              .split(',')[1];

            // Send the base64-encoded image to the server
            socketRef.current.emit('sendVideoFrame', base64Image);
            setFrameCount(prev => prev + 1);
          });
        };

        // Capture and send video frames every 100ms
        const frameInterval = setInterval(captureFrame, 100);

        // Store the interval and stream in refs for cleanup
        if (videoRef.current) {
          videoRef.current.dataset.frameInterval = frameInterval.toString();
          videoRef.current.dataset.streamId = stream.id;
        }

        return () => {
          clearInterval(frameInterval);
          videoTrack.stop();
        };
      })
      .catch(error => {
        console.error('Error accessing webcam:', error);
        setIsCameraActive(false);
      });
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const frameInterval = parseInt(
        videoRef.current.dataset.frameInterval || '0'
      );
      if (frameInterval) clearInterval(frameInterval);

      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <div className="relative aspect-video bg-gray-900 flex items-center justify-center rounded-lg overflow-hidden shadow-sm">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-lg"
      />

      {!isCameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white rounded-lg">
          <Camera
            className="w-12 h-12 mb-2 opacity-60 text-white"
            stroke="white"
          />
          <p className="text-sm opacity-80">Camera is turned off</p>
        </div>
      )}

      <div className="absolute top-3 left-3 flex gap-2">
        <Badge
          variant={isConnected ? 'default' : 'destructive'}
          className="animate-pulse"
        >
          {isConnected ? 'Connected' : 'Disconnected'}
        </Badge>
        {isCameraActive && (
          <Badge
            variant="outline"
            className="bg-black/50 text-white border-none"
          >
            <Video
              className="w-3 h-3 mr-1 text-red-500 animate-pulse"
              stroke="white"
            />
            Live
          </Badge>
        )}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
          onClick={toggleCamera}
        >
          {isCameraActive ? (
            <CameraOff size={18} className="text-white" stroke="white" />
          ) : (
            <Camera size={18} className="text-white" stroke="white" />
          )}
        </Button>
        {isCameraActive && (
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            onClick={() => startCamera()}
          >
            <RefreshCw size={18} className="text-white" stroke="white" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoStream;
