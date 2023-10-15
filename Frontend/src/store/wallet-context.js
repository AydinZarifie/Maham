import React from "react";

const WalletContext = React.createContext({
  //data that will be stored
});

export const WalletContextProvider = (props) => {
  
  return (
    <WalletContext.Provider value={{}}>{props.children}</WalletContext.Provider>
  );
};
