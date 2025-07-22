"use client";

import { useEffect, useCallback, useRef } from 'react';

export default function useExitIntent(onExit: () => void) {
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  const handlePopState = useCallback(() => {
    const hasSeenOffer = sessionStorage.getItem('exitIntentOfferSeen');
    if (!hasSeenOffer) {
      sessionStorage.setItem('exitIntentOfferSeen', 'true');
      onExitRef.current();
    } else {
      // If they've seen the offer, let them go back normally.
      window.history.back();
    }
  }, []);

  useEffect(() => {
    // Push a new state to the history stack. When the user clicks 'back', 
    // we'll intercept the 'popstate' event instead of them leaving the page.
    window.history.pushState(null, '');

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // For desktop or cases where popstate isn't triggered
        const hasSeenOffer = sessionStorage.getItem('exitIntentOfferSeen');
        if (!hasSeenOffer) {
             // Standard way to show a confirmation dialog
            event.preventDefault();
            event.returnValue = '';
            onExitRef.current();
        }
    }
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handlePopState]);
}
