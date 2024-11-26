import { createContext, useState, useContext } from 'react';

const LetterContext = createContext();

export const useLetter = () => {
  return useContext(LetterContext);
};

export const LetterProvider = ({ children }) => {
  const [selectedLetter, setSelectedLetter] = useState('A');

  return (
    <LetterContext.Provider value={{ selectedLetter, setSelectedLetter }}>
      {children}
    </LetterContext.Provider>
  );
};
