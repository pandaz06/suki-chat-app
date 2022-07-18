import { createContext } from 'react';

const ModalContext = createContext();

function ModalProvider({ value, children }) {
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalContext };
export default ModalProvider;
