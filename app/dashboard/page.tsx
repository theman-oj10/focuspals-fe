import React from 'react';
import Sidebar from '@/app/ui/dashboard/sidebar';
import Chat from '@/app/ui/dashboard/chat';
import StudioPanel from '@/app/ui/dashboard/studio-panel';

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <Chat />

            {/* Right Studio Panel */}
            <StudioPanel />
        </div>
    );
}
