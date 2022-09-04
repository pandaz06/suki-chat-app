import { getDownloadURL, uploadBytes } from 'firebase/storage';

const changePhoto = async (imageRef, imageFile) => {
    await uploadBytes(imageRef, imageFile);
    const url = await getDownloadURL(imageRef);

    return url;
};

export default changePhoto;
