import React from 'react';

const useOutsideClickDetect = (
  ref: React.RefObject<HTMLElement>,
  setFunc: React.Dispatch<React.SetStateAction<boolean>>,
): ((e: MouseEvent) => void) => {
  const outsideClickDetect = (e: MouseEvent) => {
    if (!ref?.current?.contains(e.target as Node)) {
      setFunc(false);
    }
  };

  document.addEventListener('mousedown', outsideClickDetect);

  return outsideClickDetect;
};

export default useOutsideClickDetect;
