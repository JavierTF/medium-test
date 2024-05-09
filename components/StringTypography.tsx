import React from 'react';
import Typography from '@mui/material/Typography';
import { changeColor } from '../utils/utils.js';
import { StringTypographyProps } from '@/interfaces/interfaces.js';

const StringTypography: React.FC<StringTypographyProps> = ({ text, sx }) => {
  const words = text.split(' ');

  return (
    <div>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Typography variant="caption" sx={{ color: changeColor(word), py: 5, fontSize: 16, ...sx }}>{word}</Typography>
          {index !== words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StringTypography;