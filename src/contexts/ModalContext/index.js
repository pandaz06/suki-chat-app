import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalOptions, setModalOptions] = useState({});

    return (
        <ModalContext.Provider
            value={{
                isShowModal,
                setIsShowModal,
                modalTitle,
                setModalTitle,
                modalContent,
                setModalContent,
                modalOptions,
                setModalOptions,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext };
export default ModalProvider;
