"use client";

import { X } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs">
            <span className="bg-green-500 text-white text-[10px] px-1 rounded">Plus</span>
          </div>
          <span className="font-medium">NotebookLM</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X size={20} />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    </>
  );
} 