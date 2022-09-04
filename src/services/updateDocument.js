import { doc, updateDoc } from 'firebase/firestore';

import { db } from '~/firebase/config';

const updateDocument = async (collection, docID, newData) => {
    const docRef = doc(db, collection, docID);

    await updateDoc(docRef, newData);
};

export default updateDocument;
