'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '@/app/ui/sidebar/sidebar';
import StudioPanel from '@/app/ui/studio-panel/studio-panel';
import UploadSourcesModal from '@/app/ui/modal/upload-source-modal';
import MainDisplay from '@/app/ui/main-display/main-display';
import {
  SAMPLE_FLIP_CARD_DATA,
  SAMPLE_QUIZ_DATA,
  SAMPLE_TEXT_DATA,
} from '../lib/sample-data';

interface ContentData {
  focusScore: number;
  type: string;
  data: any;
  timestamp?: number;
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [currentData, setCurrentData] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false); // New state to track if content is loaded
  const [attentionData, setAttentionData] = useState({
    attentionLevel: 75,
    shouldSwitchContent: false,
  });
  const [showBreakModal, setShowBreakModal] = useState(false); // New state for break modal

  // Function to fetch content based on selected file
  const fetchContent = async () => {
    if (!selectedFile) {
      console.log('No file selected to refresh');
      return;
    }

    setIsLoading(true);
    setContentLoaded(false); // Reset content loaded state

    try {
      // Create form data for the selected file
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('Processing file, please wait...');
      await new Promise(resolve => setTimeout(resolve, 20_000));
      console.log('Processing complete!');

      // Make API request to get content
      // const response = await fetch('http://127.0.0.1:5001/process-pdf', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to process PDF');
      // }

      // const result = await response.json();
      // console.log('Content fetched:', result);

      // Use attentionData.attentionLevel instead of random score
      const focusScore = attentionData.attentionLevel;

      // Create the content data structure
      const contentData: ContentData = {
        focusScore: focusScore,
        type: '',
        data: null,
      };

      // Assign type and data based on focus score
      // if (focusScore > 80) {
      //   contentData.type = 'text';
      //   contentData.data = SAMPLE_TEXT_DATA.data;
      // } else if (focusScore > 60) {
      //   contentData.type = 'flipcard';
      //   contentData.data = SAMPLE_FLIP_CARD_DATA.data;
      // } else if (focusScore > 40) {
      //   contentData.type = 'tiktok';
      // } else if (focusScore > 20) {
      //   contentData.type = 'quiz';
      //   contentData.data = SAMPLE_QUIZ_DATA.data;
      // } else {
      //   contentData.type = 'react';
      // }

      contentData.type = 'text';
      contentData.data = SAMPLE_TEXT_DATA.data;

      console.log('Content data:', contentData);
      setCurrentData(contentData);
      setContentLoaded(true); // Mark content as loaded
    } catch (error) {
      console.error('Error fetching content:', error);
      setContentLoaded(false); // Reset if there was an error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle attention level changes from AttentionLevelTracker
  const handleAttentionChange = useCallback(
    (data: {
      attentionLevel: number;
      shouldSwitchContent: boolean;
      suggestBreak?: boolean;
      suggestedContentType?: string;
    }) => {
      setAttentionData(data);

      // If there's content and we should switch, update content type
      if (currentData && data.shouldSwitchContent) {
        // Handle break suggestion
        if (data.suggestBreak) {
          // Show a break modal instead of switching content
          setShowBreakModal(true);
          // Optionally set a timer to remind the user when the break should end
          const breakTimer = setTimeout(() => {
            setShowBreakModal(false);
          }, 5 * 60 * 1000); // 5 minutes

          // Clean up timer on component unmount or if user dismisses early
          return () => clearTimeout(breakTimer);
        } else {
          // Use the specifically suggested content type if available
          if (data.suggestedContentType) {
            updateContentToType(data.suggestedContentType);
          } else {
            // Fall back to determining by attention level
            updateContentType(data.attentionLevel);
          }
        }
      }
    },
    [currentData]
  );

  // New function to update content to a specific type
  const updateContentToType = useCallback(
    (newType: string) => {
      if (!currentData) return;

      // Only update if type is different
      if (newType !== currentData.type) {
        console.log(
          `Switching content type from ${currentData.type} to ${newType} based on suggestion`
        );

        // Update the currentData with the new type
        setCurrentData(prevData => {
          if (!prevData) return null;

          // Keep same data but change the type
          return {
            ...prevData,
            type: newType,
            timestamp: Date.now(),
          };
        });
      }
    },
    [currentData]
  );

  // Update content type based on attention level
  const updateContentType = useCallback(
    (attentionLevel: number) => {
      if (!currentData) return;

      // Determine new content type based on attention level
      let newType = 'text';
      if (attentionLevel > 80) {
        newType = 'text';
      } else if (attentionLevel > 60) {
        newType = 'flipcard';
      } else if (attentionLevel > 40) {
        newType = 'tiktok';
      } else if (attentionLevel > 20) {
        newType = 'quiz';
      } else {
        newType = 'react';
      }

      // Only update if type is different
      if (newType !== currentData.type) {
        console.log(
          `Switching content type from ${currentData.type} to ${newType} based on attention level ${attentionLevel}`
        );

        // Update content data with new type
        setCurrentData(prevData => {
          if (!prevData) return null;
          return {
            ...prevData,
            type: newType,
            focusScore: attentionLevel,
            timestamp: Date.now(),
          };
        });
      }
    },
    [currentData]
  );

  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    const newFiles = [...files];
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Select the latest file
    const latestFile = newFiles[newFiles.length - 1];
    setSelectedFile(latestFile);
  };

  // Process newly uploaded files
  useEffect(() => {
    if (selectedFile) {
      fetchContent();
    }
  }, [selectedFile]);

  // Effect to handle attention data changes
  useEffect(() => {
    if (attentionData.shouldSwitchContent && currentData) {
      updateContentType(attentionData.attentionLevel);
    }
  }, [attentionData, currentData, updateContentType]);

  // Handle file selection from sidebar
  const handleFileView = (file: File) => {
    setSelectedFile(file);
  };
  // useEffect(() => {
  //   // Only start the interval if we have content data
  //   if (!currentData) return;

  //   const intervalId = setInterval(() => {
  //     console.log('Auto-reloading focus score...');
  //     reloadFocusScore();
  //   }, 10000); // 10 seconds

  //   // Clean up interval on unmount
  //   return () => clearInterval(intervalId);
  // }, [currentData, reloadFocusScore]);

  // Add keyboard shortcut for focus mode (Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusMode) {
        setFocusMode(false);
      } else if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        setFocusMode(!focusMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusMode]);

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Focus Mode Toggle Button */}
      <button 
        onClick={() => setFocusMode(!focusMode)}
        className="absolute top-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
      >
        {focusMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Left Sidebar - Position it properly with transitions */}
      <Sidebar
        onAddClick={() => setShowModal(true)}
        uploadedFiles={uploadedFiles}
        onFileView={handleFileView}
        selectedFile={selectedFile}
        className={`transition-transform duration-300 ${
          focusMode ? 'transform -translate-x-full absolute left-0 z-10' : ''
        }`}
      />

      {/* Main Content Area - Expand in Focus Mode */}
      <div className={`flex-grow transition-all duration-300 ${focusMode ? 'px-8' : ''}`}>
        <MainDisplay
          isLoading={isLoading}
          contentData={currentData}
          onUpload={() => setShowModal(true)}
          focusMode={focusMode}
        />
      </div>

      {/* Right Studio Panel - Hide completely when in focus mode */}
      {!focusMode && (
        <StudioPanel
          onAttentionChange={handleAttentionChange}
          isContentLoaded={contentLoaded}
          currentContentType={currentData?.type || ''}
        />
      )}

      {/* Upload Source Modal */}
      {showModal && (
        <UploadSourcesModal
          onClose={() => setShowModal(false)}
          handleFileUpload={handleFileUpload}
        />
      )}

      {/* Break Modal */}
      {showBreakModal && (
        <div className="break-modal">
          <p>Take a break! We'll remind you when it's time to return.</p>
          <button onClick={() => setShowBreakModal(false)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
