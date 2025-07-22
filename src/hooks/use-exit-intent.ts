"use client";

import { useState, useEffect } from 'react';

export default function useExitIntent() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Only run on the client
    if (typeof window === 'undefined') {
      return;
    }

    const handleMouseOut = (event: MouseEvent) => {
      // If the mouse is going out of the top of the window, show the popup
      if (
        event.clientY <= 0 &&
        event.relatedTarget == null &&
        event.target
      ) {
        // Check if the user has already seen the popup in this session
        const hasSeenPopup = sessionStorage.getItem('exitIntentPopupSeen');
        if (!hasSeenPopup) {
          setShowPopup(true);
          sessionStorage.setItem('exitIntentPopupSeen', 'true');
        }
      }
    };
    
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return { showPopup, setShowPopup };
}
