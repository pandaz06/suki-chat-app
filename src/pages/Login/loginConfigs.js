import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '~/firebase/config';

const loginConfigs = [
    {
        title: 'Đăng nhập vào Suki',
        options: [
            {
                title: 'Tiếp tục với Email',
                icon: <FontAwesomeIcon icon={faEnvelope} />,
                onClick: () => {},
            },
            {
                title: 'Tiếp tục với Google',
                icon: <FontAwesomeIcon icon={faGoogle} />,
                onClick: async () => {
                    try {
                        const provider = new GoogleAuthProvider();
                        const user = await signInWithPopup(auth, provider).user;

                        console.log(user);
                    } catch (error) {
                        console.log(error);
                    }
                },
            },
            {
                title: 'Tiếp tục với Facebook',
                icon: <FontAwesomeIcon icon={faFacebook} />,
                onClick: () => {},
            },
            {
                title: 'Tiếp tục với Github',
                icon: <FontAwesomeIcon icon={faGithub} />,
                onClick: () => {},
            },
            {
                title: 'Tiếp tục với Twitter',
                icon: <FontAwesomeIcon icon={faTwitter} />,
                onClick: () => {},
            },
        ],
        bottomText: 'Bạn chưa có tài khoản ?',
        changeTab: 'Đăng kí',
    },
    {
        title: 'Đăng kí vào Suki',
        options: [
            {
                title: 'Tiếp tục với Email',
                icon: <FontAwesomeIcon icon={faEnvelope} />,
                onClick: () => {},
            },
        ],
        bottomText: 'Bạn đã có tài khoản ?',
        changeTab: 'Đăng nhập',
    },
];

export default loginConfigs;
