import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '~/firebase/config';
import { addDocument, generateKeywords } from '~/services';

const createUserDoc = async (user) => {
    const { displayName, uid, email, photoURL } = user;

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        addDocument(
            'users',
            {
                uid,
                keywords: generateKeywords(displayName.toLowerCase()),
                profile: {
                    displayName,
                    bio: '',
                    status: 'Thành viên của Suki',
                    email,
                    photoURL,
                    photoName: '',
                    wallpaperURL: '',
                    wallpaperName: '',
                    facebookRef: '',
                    githubRef: '',
                    youtubeRef: '',
                    twitterRef: '',
                    tiktokRef: '',
                },
                friendList: [],
                requestList: [],
                sendRequestList: [],
            },
            uid,
        );
    }
};
const signInWithSocialMedia = async (provider) => {
    try {
        const data = await signInWithPopup(auth, provider);

        createUserDoc(data.user);
    } catch (error) {
        console.log(error);
    }
};

const loginConfigs = {
    title: 'Đăng nhập vào Suki',
    options: [
        {
            title: 'Đăng nhập với Google',
            icon: <FontAwesomeIcon icon={faGoogle} />,
            onClick: () => {
                const provider = new GoogleAuthProvider();
                signInWithSocialMedia(provider);
            },
        },
        {
            title: 'Đăng nhập với Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} />,
            onClick: () => {
                const provider = new FacebookAuthProvider();
                signInWithSocialMedia(provider);
            },
        },
    ],
};

export default loginConfigs;
