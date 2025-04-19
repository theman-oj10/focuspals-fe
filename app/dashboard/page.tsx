"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/ui/dashboard/sidebar';
import Chat from '@/app/ui/dashboard/chat';
import StudioPanel from '@/app/ui/dashboard/studio-panel';
import AddSourceModel from '@/app/ui/modal/add-source-model';

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileUpload = (files: File[]) => {
        setUploadedFiles(prev => [...prev, ...files]);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <Sidebar onAddClick={() => setShowModal(true)} uploadedFiles={uploadedFiles} />

            {/* Main Content Area */}
            <Chat onUpload={() => setShowModal(true)} />

            {/* Right Studio Panel */}
            <StudioPanel />

            {showModal && (
                <AddSourceModel 
                    onClose={() => setShowModal(false)} 
                    onFilesUploaded={handleFileUpload}
                />
            )}
        </div>
    );
}
