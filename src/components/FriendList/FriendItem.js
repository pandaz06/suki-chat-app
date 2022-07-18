import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './FriendList.module.scss';
import Avatar from '../Avatar';
import Button from '../Button';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classnames.bind(styles);

function FriendItem({ avatar, name, username, isToggle }) {
    const { setIsShowModal } = useContext(ModalContext);
    return (
        <Link className={cx('friend-item')} to={`/@${username}`} onClick={() => setIsShowModal(false)}>
            <div className={cx('info')}>
                <Avatar src={avatar} small className={cx('avatar')} />
                <div>
                    <h3 className={cx('name')}>{name}</h3>
                    <p className={cx('username')}>{username}</p>
                </div>
            </div>
            {isToggle && (
                <div className={cx('toggle-btns')}>
                    <Button className={cx('toggle-btn')} onlyIcon leftIcon={<FontAwesomeIcon icon={faUserMinus} />} />
                </div>
            )}
        </Link>
    );
}

export default FriendItem;
