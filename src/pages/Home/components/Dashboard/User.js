import classnames from 'classnames/bind';

import styles from './Dashboard.module.scss';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import { Avatar } from '~/components';

const cx = classnames.bind(styles);

function User() {
    return (
        <div className={cx('user')}>
            <Avatar src={avatar} name="Rohmad Khoir" />
            <div className={cx('user-info')}>
                <h3>Rohmad Khoir</h3>
                <p>My username</p>
            </div>
        </div>
    );
}

export default User;
