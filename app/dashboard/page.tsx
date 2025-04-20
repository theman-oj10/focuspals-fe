'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/ui/sidebar/sidebar';
import StudioPanel from '@/app/ui/studio-panel/studio-panel';
import UploadSourcesModal from '@/app/ui/modal/upload-source-modal';
import TextViewer from '@/app/ui/sidebar/text-viewer';
import MainDisplay from '@/app/ui/main-display/main-display';
import { sendFile } from '../services/send-file';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [articleContent, setArticleContent] = useState('');
  const [flashcardsContent, setFlashcardsContent] = useState('');
  const [miniGameContent, setMiniGameContent] = useState('');
  const [quizContent, setQuizContent] = useState('');
  const [reactComponentContent, setReactComponentContent] = useState('');
  const [tiktokScriptContent, setTiktokScriptContent] = useState('');

  
  const handleFileUpload = async (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    const latestFile = files[files.length - 1];
    setSelectedFile(latestFile);

    try {
      const formData = new FormData();
      formData.append('file', latestFile);
      
      const response = await fetch('http://127.0.0.1:5001/process-pdf', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      
      // Store different content types from the response
      if (data.status === 'success') {
        const {
          article_content,
          flashcards_content,
          mini_game_content,
          quiz_content,
          react_component_content,
          tiktok_script_content
        } = data.data;
        
        setArticleContent(article_content);
        setFlashcardsContent(flashcards_content);
        setMiniGameContent(mini_game_content);
        setQuizContent(quiz_content);
        setReactComponentContent(react_component_content);
        setTiktokScriptContent(tiktok_script_content);
        console.log(articleContent);
      }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleFileView = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar
        onAddClick={() => setShowModal(true)}
        uploadedFiles={uploadedFiles}
        onFileView={handleFileView}
        selectedFile={selectedFile}
      />

      {/* Main Content Area */}
      {selectedFile ? (
        <TextViewer file={selectedFile} />
      ) : (
        <MainDisplay onUpload={() => setShowModal(true)} />
      )}

      {/* Right Studio Panel */}
      <StudioPanel />

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
