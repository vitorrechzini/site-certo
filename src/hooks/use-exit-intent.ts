"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function useExitIntent(onExit: () => void) {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleExit = useCallback(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('exitIntentPopupSeen');
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem('exitIntentPopupSeen', 'true');
      // Push a state to the history to handle the back button after showing the popup
      window.history.pushState({ popup: true }, '');
    }
  }, []);
  
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      // Desktop exit intent
      if (event.clientY <= 0 && event.relatedTarget == null && event.target) {
        handleExit();
      }
    };

    const handlePopState = (event: PopStateEvent) => {
        // If the popup is open and user hits back, just close it
        if(showPopup) {
            setShowPopup(false);
            event.preventDefault();
        }
    };
    
    // Attempt to handle mobile back button / gestures
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        // This is a last resort and has limited browser support for custom actions
        handleExit();
    };

    window.history.pushState(null, ''); // Initial state
    
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleExit, showPopup]);

  // When popup opens, we add a new history state. 
  // When it closes, we want to go back if the history state was ours.
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && window.history.state?.popup) {
      window.history.back();
    }
    setShowPopup(isOpen);
  }

  return { showPopup, setShowPopup: handleOpenChange };
}
