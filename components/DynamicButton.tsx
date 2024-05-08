import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DynamicButtonProps } from '@/interfaces/interfaces';

const DynamicButton: React.FC<DynamicButtonProps> = ({ icon, text, disabled = false, filled = false, url = null, primary = false, disabledAll = false }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonVariant: 'contained' | 'outlined' = filled ? 'contained' : 'outlined';
  const buttonSx: React.CSSProperties = filled
    ? { backgroundColor: '#f0f0f0', color: '#001f3f', borderColor: '#f0f0f0' }
    : { color: '#666666', borderColor: '#666666'};

  if (typeof window !== 'undefined') { // Verificar si window está disponible
    if (windowWidth < 1230) {
      buttonSx.paddingRight = 0;
    }
  }

  if (primary) {
    buttonSx.backgroundColor = '#0D55CE';
    buttonSx.color = 'white';
  }

  if (text === 'Cancel' && windowWidth < 1230) {
    buttonSx.visibility = 'hidden';
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const finalUrl = url ?? '#';

  icon = icon ?? '';
  if (primary){
    icon = '';
    if (disabledAll){
    } else {
      text = 'Add'
    }
  }

  return (
    <div>
      <Button variant={buttonVariant} startIcon={icon} href={finalUrl} disabled={disabled} sx={buttonSx} onClick={handleClick}>
        {windowWidth >= 1230 && text}
      </Button>
    </div>
  );
};

export default DynamicButton;