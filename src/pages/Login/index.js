import classNames from 'classnames/bind';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { LoginArea, Slider } from './components';
import { UserStatusContext } from '~/contexts/UserStatusContext';
import { routesConfigs } from '~/configs';
import loginConfigs from './loginConfigs';
import { LoginProvider } from '~/contexts';

const cx = classNames.bind(styles);

function Login() {
    const [loginTab, setLoginTab] = useState(0);
    const { isLogin } = useContext(UserStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate(routesConfigs.home);
        }
    }, [isLogin, navigate]);

    return (
        <LoginProvider value={{ loginTab, setLoginTab }}>
            <div className={cx('wrapper')}>
                <LoginArea data={loginConfigs[loginTab]} />
                <Slider />
            </div>
        </LoginProvider>
    );
}

export default Login;
