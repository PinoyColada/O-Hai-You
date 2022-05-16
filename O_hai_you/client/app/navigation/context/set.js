import React, { useState, createContext } from "react";

const SetContext = createContext();

const SetProvider = ({ children }) => {
  const [sets, setSets] = useState([]);

  return (
    <SetContext.Provider value={[sets, setSets]}>
      {children}
    </SetContext.Provider>
  );
};

export { SetContext, SetProvider };
