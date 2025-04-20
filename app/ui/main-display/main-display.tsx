'use client';

import { ContentUpdate } from '@/app/lib/definitions';
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import TextContent from './content/text-content';
import DefaultDisplay from './default-display';
import FlipCardContent from './content/flip-card-content';
// Import other content components as you develop them
// import DiagramContent from './content/diagram-content';
// import VideoContent from './content/video-content';
// import AudioContent from './content/audio-content';
// import QuizContent from './content/quiz-content';
// import MiniGameContent from './content/mini-game-content';

import { SAMPLE_FLIP_CARD_DATA, SAMPLE_QUIZ_DATA } from '@/app/lib/sample-data';
import QuizContent from './content/quiz-content';

// Sample text content
const SAMPLE_TEXT_DATA = {
  id: 'sample-text',
  type: 'text',
  data: {
    title: 'Sample Text Content',
    content: 'This is sample text content for demonstration purposes.',
  },
};

interface MainDisplayProps {
  onUpload: () => void;
}

type ContentType =
  | 'default'
  | 'text'
  | 'flipcard'
  | 'diagram'
  | 'video'
  | 'audio'
  | 'quiz'
  | 'minigame';

export default function MainDisplay({ onUpload }: MainDisplayProps) {
  const [currentContent, setCurrentContent] = useState<ContentUpdate>();
  const [demoMode, setDemoMode] = useState(false);
  const [selectedContentType, setSelectedContentType] =
    useState<ContentType>('default');
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (demoMode) return; // Don't connect to socket in demo mode

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
  }, [demoMode]);

  const handleContentTypeChange = (type: ContentType) => {
    setSelectedContentType(type);

    // Set sample data based on the selected content type
    if (type === 'default') {
      setCurrentContent(undefined);
    } else if (type === 'text') {
      setCurrentContent(SAMPLE_TEXT_DATA as ContentUpdate);
    } else if (type === 'flipcard') {
      setCurrentContent(SAMPLE_FLIP_CARD_DATA as ContentUpdate);
    }
    // Add more content types as you develop them
  };

  // Render the appropriate component based on content type
  const renderContent = () => {
    // In demo mode, use selectedContentType, otherwise use the content from WebSocket
    const contentToRender = demoMode
      ? { type: selectedContentType }
      : currentContent;

    if (!contentToRender || contentToRender.type === 'default') {
      return <DefaultDisplay onUpload={onUpload} />;
    }

    switch (contentToRender.type) {
      case 'text':
        return <TextContent data={SAMPLE_TEXT_DATA.data} />;
      case 'flipcard':
        return <FlipCardContent data={SAMPLE_FLIP_CARD_DATA.data} />;
      // Add other cases as you develop more components
      // case 'diagram':
      //   return <DiagramContent data={contentToRender.data} />;
      // case 'video':
      //   return <VideoContent data={contentToRender.data} />;
      // case 'audio':
      //   return <AudioContent data={contentToRender.data} />;
      case 'quiz':
        return <QuizContent data={SAMPLE_QUIZ_DATA.data} />;
      // case 'minigame':
      //   return <MiniGameContent data={contentToRender.data} />;
      default:
        return <TextContent data={'Unsupported content type'} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Learning Session</h1>

        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-700">Demo Mode</span>
            <div
              className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                demoMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <input
                type="checkbox"
                className="opacity-0 absolute"
                checked={demoMode}
                onChange={() => setDemoMode(!demoMode)}
              />
              <div
                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  demoMode ? 'transform translate-x-4' : ''
                }`}
              ></div>
            </div>
          </label>

          {demoMode && (
            <select
              className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700"
              value={selectedContentType}
              onChange={e =>
                handleContentTypeChange(e.target.value as ContentType)
              }
            >
              <option value="default">Default</option>
              <option value="text">Text</option>
              <option value="flipcard">Flip Cards</option>
              {/* <option value="diagram">Diagram</option> */}
              {/* <option value="video">Video</option> */}
              {/* <option value="audio">Audio</option> */}
              <option value="quiz">Quiz</option>
              {/* <option value="minigame">Mini Game</option> */}
            </select>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-blue-50 border-blue-500 flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
