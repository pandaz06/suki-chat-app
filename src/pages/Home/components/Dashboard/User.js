import classnames from 'classnames/bind';
import { useContext } from 'react';

import styles from './Dashboard.module.scss';
import { Avatar, LoadingText } from '~/components';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classnames.bind(styles);

function User() {
    const { user } = useContext(AuthContext);

    return (
        <div className={cx('user')}>
            <Avatar src={user?.profile?.photoURL} name={user?.profile?.displayName} isLoading={!user} />
            {user ? (
                <div className={cx('user-info')}>
                    <h3>{user.profile.displayName}</h3>
                    <p>{user.profile.status}</p>
                </div>
            ) : (
                <div>
                    <LoadingText />
                    <LoadingText />
                </div>
            )}
        </div>
    );
}

export default User;
