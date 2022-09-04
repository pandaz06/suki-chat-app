import classnames from 'classnames/bind';
import { useContext } from 'react';

import styles from './Dashboard.module.scss';
import Title from '../Title';
import { Avatar, FriendList as FriendContent, NoData } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classnames.bind(styles);

function FriendList() {
    const { setIsShowModal, setModalTitle, setModalContent, setModalOptions } = useContext(ModalContext);
    const { user, friendList } = useContext(AuthContext);

    const handleSeeMore = () => {
        setIsShowModal(true);
        setModalTitle(`Danh sách bạn bè (${friendList.length})`);
        setModalContent(<FriendContent data={friendList} />);
        setModalOptions({ small: false });
    };

    return (
        <div className={cx('friend-list')}>
            <Title
                content="Bạn bè"
                subText={user && (friendList.length > 99 ? '99+' : friendList.length || '0')}
                underlineSubText={false}
                onSeeMore={user && handleSeeMore}
            />
            <div className={cx('list')}>
                {friendList.length > 0 ? (
                    friendList.map((item) => {
                        return (
                            <Avatar
                                key={item.uid}
                                to={item.uid}
                                src={item.profile.photoURL}
                                name={item.profile.displayName}
                                className={cx('user-avatar')}
                                isLoading={!item}
                            />
                        );
                    })
                ) : (
                    <NoData isLogo={false} />
                )}
            </div>
        </div>
    );
}

export default FriendList;
