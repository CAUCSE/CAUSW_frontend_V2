import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PopupMenuProps {
  PopupMenuChildren: PopupMenuChild[];
}

interface PopupMenuChild {
  message: string;
  handleBtn: () => void;
}

export const PopupMenu: React.FC<PopupMenuProps> = ({ PopupMenuChildren }) => {
  return (
    <div className="absolute right-10 top-4 z-10 flex w-32 flex-col divide-y-[1px] rounded-lg border border-gray-300 bg-white shadow-lg">
      {PopupMenuChildren.map((child: PopupMenuChild, idx: number) => (
        <>
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            onClick={child.handleBtn}
          >
            {child.message}
          </button>
        </>
      ))}
    </div>
  );
};
