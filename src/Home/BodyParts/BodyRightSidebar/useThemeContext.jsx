import React, { createContext, useContext, useState } from 'react'


const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {

    const [theme ,setTheme] =useState("dark");

    const toggleTheme =(mode)=>{
setTheme(mode)
        document.body.style.backgroundColor = mode ==="light"?"white":"black"
    }
  return (
<ThemeContext.Provider value ={{theme, toggleTheme}}>
{children}
</ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);
