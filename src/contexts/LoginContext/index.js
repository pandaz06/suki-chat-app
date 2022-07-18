import { createContext } from 'react';

const LoginContext = createContext();

function LoginProvider({ value, children }) {
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export { LoginContext };
export default LoginProvider;
