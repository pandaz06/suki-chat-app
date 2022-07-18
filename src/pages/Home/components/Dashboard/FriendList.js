import classnames from 'classnames/bind';
import { useContext } from 'react';

import styles from './Dashboard.module.scss';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import Title from '../Title';
import { Avatar, FriendList as FriendContent } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classnames.bind(styles);

function FriendList() {
    const { setIsShowModal, setModalTitle, setModalContent } = useContext(ModalContext);
    const handleSeeMore = () => {
        setIsShowModal(true);
        setModalTitle('Friends');
        setModalContent(<FriendContent />);
    };
    return (
        <div className={cx('friend-list')}>
            <Title content="Friends" subText="10" onSeeMore={handleSeeMore} />
            <div className={cx('list')}>
                <Avatar src={avatar} name="Minh Hoang" isOnline to="/@minhdepzai" />
                <Avatar src={avatar} name="Minh Hoang" isOnline to="/@minhdepzai" />
                <Avatar src={avatar} name="Minh Hoang" isOnline to="/@minhdepzai" />
                <Avatar src={avatar} name="Minh Hoang" isOnline to="/@minhdepzai" />
                <Avatar src={avatar} name="Minh Hoang" isOnline to="/@minhdepzai" />
            </div>
        </div>
    );
}

export default FriendList;
