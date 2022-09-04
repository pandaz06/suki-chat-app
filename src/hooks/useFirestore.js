import React from 'react';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';

import { db } from '~/firebase/config';

const useFirestore = (collectionName, condition, valueLimit, orderField = 'createdAt', isReverse) => {
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        let collectionRef = collection(db, collectionName);
        if (condition) {
            if (!condition.fieldName || !condition.operator || !condition.compareValue) {
                return;
            }

            collectionRef = query(
                collection(db, collectionName),
                where(condition.fieldName, condition.operator, condition.compareValue),
                limit(valueLimit),
                orderBy(orderField),
            );
        }
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            if (isReverse) {
                setDocuments(documents.reverse());
            } else {
                setDocuments(documents);
            }
        });

        return unsub;
    }, [collectionName, condition, valueLimit, orderField, isReverse]);

    return documents;
};

export default useFirestore;
