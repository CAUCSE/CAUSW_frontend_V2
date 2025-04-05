'use client';

import { useState } from 'react';

export const usePopup = (duration = 2000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showPopup = (newMessage: string) => {
    setMessage(newMessage);
    setIsVisible(true);

    // Set timeout to hide popup after `duration`
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  return {
    isVisible,
    message,
    showPopup,
  };
};
