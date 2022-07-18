import { createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ value, children }) {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
export default ThemeProvider;
