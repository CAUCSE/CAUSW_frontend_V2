import React, { useState, useEffect } from 'react';
import Image from "next/image";

interface PopupMenuProps {
  message: string,
}

export const PopupMenu: React.FC<PopupMenuProps> = ({ message }) => {
  return (
    <div className="absolute top-4 right-10 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        {message}
      </button>
    </div>
  );
};
