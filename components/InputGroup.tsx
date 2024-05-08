import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Image from 'next/image';
import StringTypography from './StringTypography'; // Asumiendo que tienes un componente StringTypography en un archivo separado

interface InputGroupProps {
  handleClick: () => void;
  colored: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({ handleClick, colored }) => {
  const [textValue, setTextValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleBlur = () => {
    // Puedes agregar lógica adicional aquí si lo necesitas
  };

  return (
    <Card variant="outlined">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ justifyContent: "space-between", width: "99%" }}
      >
        <IconButton onClick={handleClick}>
          <AddCircleOutlineIcon color={"primary"} />
        </IconButton>
        {!colored && (
          <TextField
            id="outlined-basic"
            variant="standard"
            fullWidth
            value={textValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            sx={{ width: "94%" }}
          />
        )}
        {colored && (
          <Box onClick={handleClick} sx={{ width: "94%" }}>
            <StringTypography text={textValue} />
          </Box>
        )}
        <Image
          src="/images/about.jpg"
          alt="Avatar"
          width={42}
          height={36}
          style={{ borderRadius: "50%" }}
        />
      </Stack>
    </Card>
  );
};

export default InputGroup;