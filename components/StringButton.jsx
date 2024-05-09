import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { colors, changeColor, lightenColor } from '../utils/utils.js';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NumbersIcon from '@mui/icons-material/Numbers';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AnimationIcon from '@mui/icons-material/Animation';

const StringButton = ({ text }) => {
  const words = text.split(' ');

  const emailCountRef = useRef(0);
  const linkCountRef = useRef(0);

  const updateCounter = (color) => {
    if (color === colors['email']) {
      emailCountRef.current += 1;
    } else if (color === colors['link']) {
      linkCountRef.current += 1;
    }
  };

  return (
    <div style={{ width: '93%' }}>
      {words.map((word, index) => {
        const color = changeColor(word);
        updateCounter(color);
        return (
          <React.Fragment key={index}>
            {color === colors['default'] ? (
              <Typography variant="caption" sx={{ fontSize: 14 }}>{word}</Typography>
            ) : (
                <Button
                key={index}
                variant="text"
                sx={{
                  backgroundColor: lightenColor(color),
                  borderRadius: '25px',
                  color: color,
                  py: 0.2,
                  fontSize: 12,
                }}
                startIcon={
                    color === colors['link']
                    ? <AnimationIcon />
                    : color === colors['email']
                    ? <MailOutlineIcon />
                    : color === colors['#']
                    ? <NumbersIcon />
                    : color === colors['@']
                    ? <AlternateEmailIcon />
                    : null
                }
              >
                {
                    color === colors['link']
                    ? `Link ${linkCountRef.current}`
                    : color === colors['email']
                    ? `Mail ${emailCountRef.current}`
                    : word.slice(1)
                }
              </Button>
            )}
            {index !== words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StringButton;