'use client';

import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black -mt-[30px]">
          <X size={20} />
        </button>
      </div>
    </>
  );
}
