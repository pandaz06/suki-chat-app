import React, { createContext, useMemo } from 'react';

import { useFirestore } from '~/hooks';
import { AuthContext } from '~/contexts/AuthContext';

const RoomsContext = createContext();

function RoomsProvider({ children }) {
    const {
        user: { uid },
    } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return { fieldName: 'members', operator: 'array-contains', compareValue: uid };
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition, 100, 'latestMessageDate', true);

    const [currentID, setCurrentID] = React.useState(null);
    const currentRoom = React.useMemo(() => rooms.find((room) => room.id === currentID), [rooms, currentID]);

    const membersCondition = useMemo(
        () => ({ fieldName: 'uid', operator: 'in', compareValue: currentRoom?.members }),
        [currentRoom?.members],
    );
    const members = useFirestore('users', membersCondition);
    const limitedMembers = useFirestore('users', membersCondition, 3);

    const messagesCondition = useMemo(
        () => ({
            fieldName: 'roomID',
            operator: '==',
            compareValue: currentID,
        }),
        [currentID],
    );
    const messages = useFirestore('messages', messagesCondition);

    const imageMessages = messages.filter((mes) => !!mes.imageURL);
    const limitedImageMessages = imageMessages.length > 0 ? imageMessages.slice(0, 3) : [];

    return (
        <RoomsContext.Provider
            value={{
                rooms,
                members,
                limitedMembers,
                messages,
                imageMessages,
                limitedImageMessages,
                currentRoom,
                currentID,
                setCurrentID,
            }}
        >
            {children}
        </RoomsContext.Provider>
    );
}

export { RoomsContext };
export default RoomsProvider;
