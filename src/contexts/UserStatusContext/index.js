import { createContext } from 'react';

const UserStatusContext = createContext();

function UserStatusProvider({ value, children }) {
    return <UserStatusContext.Provider value={value}>{children}</UserStatusContext.Provider>;
}

export { UserStatusContext };
export default UserStatusProvider;
