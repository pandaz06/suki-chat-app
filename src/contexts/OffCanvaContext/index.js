import { createContext, useState } from 'react';

const OffCanvaContext = createContext();

function OffCanvaProvider({ children }) {
    const [isShowOffCanva, setIsShowOffCanva] = useState(false);
    const [offCanvaContent, setOffCanvaContent] = useState(null);

    return (
        <OffCanvaContext.Provider value={{ isShowOffCanva, setIsShowOffCanva, offCanvaContent, setOffCanvaContent }}>
            {children}
        </OffCanvaContext.Provider>
    );
}

export { OffCanvaContext };
export default OffCanvaProvider;
