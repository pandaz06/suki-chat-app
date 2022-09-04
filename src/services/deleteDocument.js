import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '~/firebase/config';

const deleteDocument = async (collection, docID) => {
    const docRef = doc(db, collection, docID);

    await deleteDoc(docRef);
};

export default deleteDocument;
