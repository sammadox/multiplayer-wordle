import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const AppContextProvider = ({children}) => {

    const [wordGrid, setWordGrid] = useState([
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',]
      ]);

    return <AppContext.Provider value={
            {
                wordGrid, setWordGrid
            }
        }
    >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}