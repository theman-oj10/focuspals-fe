"use client";

import React from "react";

export default function Sidebar({ onAddClick }: { onAddClick?: () => void }) {
    return (
        <div className="w-1/5 p-4 border-r bg-white">
            <h1 className="text-xl font-semibold mb-4">Sources</h1>
            <div className="space-y-2">
                <button 
                    className="w-full py-2 px-3 bg-gray-100 rounded"
                    onClick={onAddClick}
                >+ Add</button>
                <button className="w-full py-2 px-3 bg-gray-100 rounded">Discover</button>
            </div>
            <div className="mt-10 text-center text-gray-400 text-sm">
                <p>Saved sources will appear here</p>
                <p className="mt-2">Add PDFs, websites, text, videos, or audio files</p>
            </div>
        </div>
    );
}