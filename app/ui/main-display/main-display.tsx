'use client';

import { ContentUpdate } from '@/app/lib/definitions';
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import TextContent from './content/text-content';
import DefaultDisplay from './default-display';
// import TextContent from './content/text-content';
// import DiagramContent from './content/diagram-content';
// import FlipCardContent from './content/flip-card-content';
// import VideoContent from './content/video-content';
// import AudioContent from './content/audio-content';
// import QuizContent from './content/quiz-content';
// import MiniGameContent from './content/mini-game-content';

interface MainDisplayProps {
  onUpload: () => void;
}

const MainDisplay: React.FC<MainDisplayProps> = ({ onUpload }) => {
  const [currentContent, setCurrentContent] = useState<ContentUpdate>();
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Get the WebSocket server URL from environment variable
    const socketServerUrl =
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:4000';

    // Create WebSocket connection
    socketRef.current = io(socketServerUrl);

    // Listen for content updates
    socketRef.current.on('contentUpdate', (update: ContentUpdate) => {
      console.log('Content update received:', update);
      setCurrentContent(update);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Render the appropriate component based on content type
  const renderContent = () => {
    if (!currentContent) {
      return <DefaultDisplay onUpload={onUpload} />;
    }

    switch (currentContent.type) {
      case 'text':
        return <TextContent data={currentContent.data} />;
      // case 'Diagram':
      //     return <DiagramContent data={currentContent.data} />;
      // case 'FlipCard':
      //     return <FlipCardContent data={currentContent.data} />;
      // case 'Video':
      //     return <VideoContent data={currentContent.data} />;
      // case 'Audio':
      //     return <AudioContent data={currentContent.data} />;
      // case 'Quiz':
      //     return <QuizContent data={currentContent.data} />;
      // case 'MiniGame':
      //     return <MiniGameContent data={currentContent.data} />;
      // default:
      //     return <TextContent data="Unsupported content type" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Learning Session</h1>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-blue-50 border-blue-500 flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainDisplay;
