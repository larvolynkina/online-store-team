import React, { useState, useEffect } from 'react';
import './ViewButton.scss';

interface ViewButtonProps {
  url: string;
  alt: string;
  activeButton: boolean;
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ViewButton({
  url, alt, activeButton, onClick, name,
}: ViewButtonProps) {
  const [className, setClassName] = useState<string>('');

  function setClassForButton() {
    if (activeButton) {
      setClassName('viewButton viewButton_active');
    } else {
      setClassName('viewButton');
    }
  }

  useEffect(() => {
    setClassForButton();
  }, [activeButton]);

  return (
    <button
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClick(event)}
      className={className}
      id={name}
      type="button"
      aria-label="change view"
    >
      <img src={url} alt={alt} />
    </button>
  );
}

export default ViewButton;
