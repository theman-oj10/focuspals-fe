'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '@/app/ui/sidebar/sidebar';
import StudioPanel from '@/app/ui/studio-panel/studio-panel';
import UploadSourcesModal from '@/app/ui/modal/upload-source-modal';
import TextViewer from '@/app/ui/sidebar/text-viewer';
import MainDisplay from '@/app/ui/main-display/main-display';

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

  // Function to fetch content based on selected file
  const fetchContent = async () => {
    if (!selectedFile) {
      console.log('No file selected to refresh');
      return;
    }

    setIsLoading(true);

    try {
      // Create form data for the selected file
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make API request to get content
      const response = await fetch('http://127.0.0.1:5001/process-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const result = await response.json();
      console.log('Content fetched:', result);

      // Generate focus score (in a real app, this would come from the API)
      const focusScore = Math.floor(Math.random() * 101);

      // Create the content data structure
      const contentData: ContentData = {
        focusScore: focusScore,
        type: '',
        data: null,
      };

      // Assign type and data based on focus score
      if (focusScore > 80) {
        contentData.type = 'text';
        contentData.data = result.text.data || result.data;
      } else if (focusScore > 60) {
        contentData.type = 'flipcard';
        contentData.data = result.flipcard.data || result.data;
      } else if (focusScore > 40) {
        contentData.type = 'tiktok';
        contentData.data = result.tiktok.data || result.data;
      } else if (focusScore > 20) {
        contentData.type = 'quiz';
        contentData.data = result.quiz.data || result.data;
      } else {
        contentData.type = 'react';
        contentData.data = result.mini.data || result.data;
      }

      console.log('Content data:', contentData);
      setCurrentData(contentData);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadFocusScore = useCallback(() => {
    if (!currentData) return;

    // Generate a new focus score
    const newFocusScore = Math.floor(Math.random() * 101);

    // Create updated content data with new focus score and timestamp
    const updatedContentData: ContentData = {
      ...currentData,
      focusScore: newFocusScore,
      timestamp: Date.now(), // Add timestamp to ensure React detects the change
    };

    // Determine content type based on new focus score
    if (newFocusScore > 80) {
      updatedContentData.type = 'text';
    } else if (newFocusScore > 60) {
      updatedContentData.type = 'flipcard';
    } else if (newFocusScore > 40) {
      updatedContentData.type = 'tiktok';
    } else if (newFocusScore > 20) {
      updatedContentData.type = 'quiz';
    } else {
      updatedContentData.type = 'react';
    }

    console.log('Updated content data:', updatedContentData);
    setCurrentData(updatedContentData);
  }, [currentData]);

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

      {/* Right Studio Panel - Position it properly with transitions */}
      <StudioPanel 
        className={`transition-transform duration-300 ${
          focusMode ? 'transform translate-x-full absolute right-0 z-10' : ''
        }`}
      />

      {/* Upload Source Modal */}
      {showModal && (
        <UploadSourcesModal
          onClose={() => setShowModal(false)}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
}
