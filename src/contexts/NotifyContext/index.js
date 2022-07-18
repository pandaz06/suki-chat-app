import { createContext } from 'react';

const NotifyContext = createContext();

function NotifyProvider({ value, children }) {
    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
}

export { NotifyContext };
export default NotifyProvider;
