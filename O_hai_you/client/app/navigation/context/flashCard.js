import React, { useState, createContext } from "react";

const FlashCardContext = createContext();

const FlashCardProvider = ({ children }) => {
  const [flashCards, setFlashCards] = useState([]);

  return (
    <FlashCardContext.Provider value={[flashCards, setFlashCards]}>
      {children}
    </FlashCardContext.Provider>
  );
};

export { FlashCardContext, FlashCardProvider };
