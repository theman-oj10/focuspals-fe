'use client';

import {
  SAMPLE_FLIP_CARD_DATA,
  SAMPLE_QUIZ_DATA,
  SAMPLE_TEXT_DATA,
} from '@/app/lib/sample-data';
import { useEffect, useState } from 'react';
import { Spinner } from '../dashboard/redirect';
import ReactEmbedViewer from '../react-embed-component/react-embed-viewer';
import FlipCardContent from './content/flip-card-content';
import QuizContent from './content/quiz-content';
import TextContent from './content/text-content';
import VideoContent from './content/video-content';
import DefaultDisplay from './default-display';

interface MainDisplayProps {
  isLoading?: boolean;
  contentData?: {
    focusScore: number;
    type: string;
    data: any;
  } | null;
  onUpload?: () => void;
  focusMode?: boolean;
}

type ContentType =
  | 'default'
  | 'text'
  | 'flipcard'
  | 'quiz'
  | 'react'
  | 'tiktok';

export default function MainDisplay({
  isLoading = false,
  contentData = null,
  onUpload,
  focusMode = false,
}: MainDisplayProps) {
  const [demoMode, setDemoMode] = useState(false);
  const [selectedContentType, setSelectedContentType] =
    useState<ContentType>('default');

  // Update selected content type when contentData changes
  useEffect(() => {
    if (contentData && contentData.type) {
      setSelectedContentType(contentData.type as ContentType);
    }
  }, [contentData]);

  const handleContentTypeChange = (type: ContentType) => {
    setSelectedContentType(type);
  };

  // Render the appropriate component based on content type
  const renderContent = () => {
    // If in demo mode, use the sample data based on selected type
    if (demoMode) {
      switch (selectedContentType) {
        case 'text':
          return <TextContent data={SAMPLE_TEXT_DATA.data} />;
        case 'flipcard':
          return <FlipCardContent data={SAMPLE_FLIP_CARD_DATA.data} />;
        case 'tiktok':
          return <VideoContent />;
        case 'quiz':
          return <QuizContent data={SAMPLE_QUIZ_DATA.data} />;
        case 'react':
          return (
            <ReactEmbedViewer jsonPath="./app/ui/react-embed-component/SAMPLE_VISUALIZER_DATA.json" />
          );
        default:
          return <DefaultDisplay onUpload={onUpload} />;
      }
    }

    // If not demo mode, use the contentData provided by the API
    if (!contentData) {
      return <DefaultDisplay onUpload={onUpload} />;
    }

    function parseTextData(data: any) {
      let textData;
      if (data.data && typeof data.data === 'string') {
        try {
          textData = JSON.parse(data.data);
        } catch (e) {
          // If it's not valid JSON, treat it as plain text content
          textData = { content: data.data };
        }
      } else {
        // Already an object or null/undefined
        textData = data.data || SAMPLE_TEXT_DATA.data;
      }

      return textData;
    }

    switch (contentData.type) {
      case 'text':
        const textData = parseTextData(contentData.data);
        return <TextContent data={textData} />;
      case 'flipcard':
        return (
          <FlipCardContent
            data={SAMPLE_FLIP_CARD_DATA.data}
          />
        );
      case 'tiktok':
        return <VideoContent />;
      case 'quiz':
        return <QuizContent data={SAMPLE_QUIZ_DATA.data} />;
      case 'react':
        return (
          <ReactEmbedViewer jsonPath="./app/ui/react-embed-component/SAMPLE_VISUALIZER_DATA.json" />
        );
      default:
        return <TextContent data={{ content: 'Unsupported content type' }} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col h-full bg-white p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto border rounded-lg p-8 bg-blue-50 border-blue-200 flex flex-col items-center justify-center">
          <Spinner />
          <h1 className="text-2xl font-bold text-gray-800">
            Processing your learning material
          </h1>
          <p className="text-gray-600 mb-4">Generating content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-grow flex flex-col h-full p-6 ${focusMode ? 'max-w-4xl mx-auto' : ''}`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
        <h2 className="font-bold text-xl">Learning Session</h2>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-700">Demo Mode</span>
            <div
              className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                demoMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <input
                type="checkbox"
                className="opacity-0 absolute w-full h-full"
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
          {focusMode && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Focus Mode Active
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 h-full">
        {/* Content area */}
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <p>Loading content...</p>
          </div>
        ) : contentData || demoMode ? (
          // Render your content here based on contentData
          <div className="h-full overflow-y-auto">
            {renderContent()}
          </div>
        ) : (
          // Empty state when no content
          <div className="flex flex-col items-center justify-center h-full bg-blue-50">
            <h3 className="text-xl font-semibold mb-2">Ready to get focused?</h3>
            <p className="text-gray-600 mb-4 text-center">
              Upload your learning materials to start a personalized learning experience
            </p>
            <button
              onClick={onUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upload Materials
            </button>
          </div>
        )}
      </div>
      
      {/* Demo mode pill buttons - moved to bottom and marked as shrink-0 */}
      {demoMode && (
        <div className="p-4 border-t border-gray-200 shrink-0">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleContentTypeChange('text')}
              className={`flex items-center px-4 py-2 rounded-full border transition ${
                selectedContentType === 'text'
                  ? 'bg-blue-100 border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <span className="mr-2">📄</span> Text
            </button>

            <button
              onClick={() => handleContentTypeChange('flipcard')}
              className={`flex items-center px-4 py-2 rounded-full border transition ${
                selectedContentType === 'flipcard'
                  ? 'bg-blue-100 border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <span className="mr-2">🗂️</span> Flip Card
            </button>

            <button
              onClick={() => handleContentTypeChange('quiz')}
              className={`flex items-center px-4 py-2 rounded-full border transition ${
                selectedContentType === 'quiz'
                  ? 'bg-blue-100 border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <span className="mr-2">❓</span> Quiz
            </button>

            <button
              onClick={() => handleContentTypeChange('tiktok')}
              className={`flex items-center px-4 py-2 rounded-full border transition ${
                selectedContentType === 'tiktok'
                  ? 'bg-blue-100 border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <span className="mr-2">📷</span> Video
            </button>

            <button
              onClick={() => handleContentTypeChange('react')}
              className={`flex items-center px-4 py-2 rounded-full border transition ${
                selectedContentType === 'react'
                  ? 'bg-blue-100 border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <span className="mr-2">🗺️</span> Interactive Diagram
            </button>
          </div>
        </div>
      )}
      
      {/* When in focus mode, show a small exit button at the bottom */}
      {focusMode && (
        <div className="text-center p-4 text-sm text-gray-500 shrink-0">
          Press ESC or click the button in the top-right to exit focus mode
        </div>
      )}
    </div>
  );
}
