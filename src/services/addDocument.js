import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '~/firebase/config';

const addDocument = async (collectionName, data, customID) => {
    if (customID) {
        const docRef = doc(db, collectionName, customID);

        const resultRef = await setDoc(docRef, {
            ...data,
            createdAt: serverTimestamp(),
        });

        return resultRef;
    } else {
        const docRef = collection(db, collectionName);

        const resultRef = await addDoc(docRef, {
            ...data,
            createdAt: serverTimestamp(),
        });

        return resultRef;
    }
};

export default addDocument;
