import { useState, useEffect } from 'react';

interface UseRefOrWaitReturn {
  isWaiting: boolean;
  progress: number;
  handleRefresh: () => void;
}

function useRefOrWait(waitForNewUpdate: number): UseRefOrWaitReturn {
  const [progress, setProgress] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (waitForNewUpdate > 0) {
      setIsWaiting(true);
      setProgress(((15 - waitForNewUpdate) / 15) * 100);
    } else {
      setIsWaiting(false);
    }
  }, [waitForNewUpdate]);

  return { isWaiting, progress, handleRefresh };
}

export default useRefOrWait;