import className from 'classnames/bind';

import styles from './Chat.module.scss';
import AvatarGroup from './AvatarGroup';

const cx = className.bind(styles);

function Header({ name, username }) {
    return (
        <div className={cx('header')}>
            <div className={cx('title')}>
                <h3>{name}</h3>
                <p>{username}</p>
            </div>
            <AvatarGroup />
        </div>
    );
}

export default Header;
