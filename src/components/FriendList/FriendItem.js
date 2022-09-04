import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './FriendList.module.scss';
import Avatar from '../Avatar';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classnames.bind(styles);

function FriendItem({ uid, avatar, displayName, status }) {
    const { setIsShowModal } = useContext(ModalContext);

    return (
        <Link className={cx('friend-item')} to={`/${uid}`} onClick={() => setIsShowModal(false)}>
            <Avatar src={avatar} small className={cx('avatar')} />
            <div className={cx('info')}>
                <h3 className={cx('name')}>{displayName}</h3>
                <p className={cx('status')}>{status}</p>
            </div>
        </Link>
    );
}

export default FriendItem;
