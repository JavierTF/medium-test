import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const DynamicButton = ({ icon, text, disabled, filled = false, url = null, primary = false }) => {
    const [windowWidth, setWindowWidth] = useState(null);

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

  const buttonVariant = filled ? 'contained' : 'outlined';
  const buttonSx = filled
    ? { backgroundColor: '#f0f0f0', color: '#001f3f', borderColor: '#f0f0f0' }
    : { color: '#666666', borderColor: '#666666'};

    if (windowWidth < 1230){
        buttonSx.paddingRight = 0;
    }

    if (primary) {
        buttonSx.backgroundColor = '#0D55CE';
        buttonSx.color = 'white';
      }

    if (text === 'Cancel' && windowWidth < 1230) {
        buttonSx.visibility = 'hidden';
      }

    icon = icon ?? '';

    url = url ?? 'javascript:void(0);'

  return (
    <div>
        <Button variant={buttonVariant} startIcon={icon} href={url} disabled={disabled} sx={buttonSx}>
        {windowWidth >= 1230 && text}
        </Button>
    </div>
  );
};

export default DynamicButton;