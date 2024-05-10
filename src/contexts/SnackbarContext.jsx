import React, { createContext, useState } from "react";

export const SnackbarContext = createContext({
  isOpen: false,
  setOpen: () => {}
});

export const SnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = (value) => {
    setIsOpen(value);
  };

  return (
    <SnackbarContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </SnackbarContext.Provider>
  );
};