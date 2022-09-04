import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import styles from './Login.module.scss';
import { LoginArea, Slider } from './components';
import loginConfigs from './loginConfigs';
import { routesConfigs } from '~/configs';
import { auth } from '~/firebase/config';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate(routesConfigs.home);
            }
        });

        return () => {
            unsubcribe();
        };
    }, [navigate]);

    return (
        <div className={cx('wrapper')}>
            <LoginArea data={loginConfigs} />
            <Slider />
        </div>
    );
}

export default Login;
