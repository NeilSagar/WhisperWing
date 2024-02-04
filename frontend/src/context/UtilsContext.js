import { createContext, useContext, useState } from "react";

const utilsContext = createContext();

function UtilsProvider(props){
    const [clearFunctions,setClearFunctions] = useState(null);
    async function clearAllUserDetatils(){
        if (!clearFunctions) return;

        for(let i=0;i<clearFunctions.length;i++){
            clearFunctions[i](null);
        }
    }
    return(
    <utilsContext.Provider
        value={{
            clearFunctions,setClearFunctions,
            clearAllUserDetatils
        }}
    >
        {props.children}
    </utilsContext.Provider>)
}

function useUtils(){
    return useContext(utilsContext);
}

export {useUtils,UtilsProvider};