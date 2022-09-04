import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Loading } from '~/components';
import { auth } from '~/firebase/config';
import { routesConfigs } from '~/configs';
import { useFirestore } from '~/hooks';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [UID, setUID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { uid } = currentUser;
                setUID(uid);
            } else {
                navigate(routesConfigs.login);
            }

            setIsLoading(false);
        });

        return () => {
            unsubcribe();
        };
    }, [navigate]);

    // Get current user
    const userCondition = React.useMemo(
        () => ({
            fieldName: 'uid',
            operator: '==',
            compareValue: UID,
        }),
        [UID],
    );
    const userArray = useFirestore('users', userCondition);
    const currentUser = userArray.length > 0 && userArray[0];

    // 'in' operator requires at least 1 element in the array, so put '0' in the array
    // Get current user's friend list
    const friendsCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: currentUser.friendList?.length > 0 ? currentUser.friendList : [0],
        };
    }, [currentUser.friendList]);
    const friendList = useFirestore('users', friendsCondition);

    // Get current user's request list
    const requestsCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: currentUser.requestList?.length > 0 ? currentUser.requestList : [0],
        };
    }, [currentUser.requestList]);
    const requestList = useFirestore('users', requestsCondition);

    // Get all users in database
    const usersList = useFirestore('users');

    return (
        <AuthContext.Provider value={{ user: currentUser, friendList, requestList, usersList }}>
            {isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
export default AuthProvider;
