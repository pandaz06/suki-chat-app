import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';

import styles from './DefaultLayout.module.scss';
import { Notify, Sidebar } from '~/components';
import { UserStatusContext } from '~/contexts/UserStatusContext';
import { NotifyProvider } from '~/contexts';
import { routesConfigs } from '~/configs';
import avatar from '~/assets/images/avatars/default-avatar.jpg';

const cx = classnames.bind(styles);

function DefaultLayout({ children }) {
    const [showNotify, setShowNotify] = useState(false);
    const { isLogin, setIsLogin } = useContext(UserStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate(routesConfigs.login);
        }
    }, [isLogin, navigate]);

    return (
        <NotifyProvider value={{ showNotify, setShowNotify }}>
            <div className={cx('wrapper')}>
                <Sidebar />
                {children}
                {showNotify && (
                    <Notify
                        img={avatar}
                        title="Đăng xuất"
                        message="Bạn có chắc muốn đăng xuất khỏi Suki hay không ?"
                        confirm="Xác nhận"
                        cancel="Hủy"
                        onConfirm={() => setIsLogin(false)}
                        onCancel={() => setShowNotify(false)}
                    />
                )}
            </div>
        </NotifyProvider>
    );
}

export default DefaultLayout;
