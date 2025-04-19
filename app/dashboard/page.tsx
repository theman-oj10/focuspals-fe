"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/ui/dashboard/sidebar';
import Chat from '@/app/ui/dashboard/chat';
import StudioPanel from '@/app/ui/dashboard/studio-panel';
import AddSourceModel from '@/app/ui/dashboard/add-source-model';

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <Sidebar onAddClick={() => setShowModal(true)} />

            {/* Main Content Area */}
            <Chat onUpload={() => setShowModal(true)} />

            {/* Right Studio Panel */}
            <StudioPanel />

            {showModal && <AddSourceModel onClose={() => setShowModal(false)} />}
        </div>
    );
}
