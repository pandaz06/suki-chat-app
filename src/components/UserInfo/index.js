import classnames from 'classnames/bind';
import { useContext, useMemo } from 'react';

import styles from './UserInfo.module.scss';
import { Avatar, Button, FriendList, LoadingText } from '~/components';
import { updateDocument } from '~/services';
import InfoItem from './InfoItem';
import Wallpaper from './Wallpaper';
import ContactList from './ContactList';
import { useFirestore } from '~/hooks';
import { routesConfigs } from '~/configs';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classnames.bind(styles);

function UserInfo({ id, small }) {
    // id: sellected user's id
    // uid: current user's id
    const {
        user,
        user: { uid, friendList, requestList, sendRequestList },
    } = useContext(AuthContext);
    const isFriend = friendList?.some((item) => item === id);
    const isRequest = requestList?.some((item) => item === id);
    const isSendingRequest = sendRequestList?.some((item) => item === id);

    // Get sellected user
    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: id,
        };
    }, [id]);
    const [sellectedUser] = useFirestore('users', userCondition);

    // 'in' operator requires at least 1 element in the array, so put '0' in the array
    // Get user's friendList
    const friendsID = sellectedUser?.friendList;
    const friendsCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: friendsID?.length > 0 ? friendsID : [0],
        };
    }, [friendsID]);
    const friends = useFirestore('users', friendsCondition);

    const handleAddFriend = () => {
        sendRequestList.push(id);
        updateDocument('users', uid, user);

        sellectedUser.requestList.push(uid);
        updateDocument('users', id, sellectedUser);
    };
    const handleUnsendRequest = () => {
        user.sendRequestList = sendRequestList.filter((item) => item !== id);
        updateDocument('users', uid, user);

        sellectedUser.requestList = sellectedUser.requestList.filter((item) => item !== uid);
        updateDocument('users', id, sellectedUser);
    };
    const handleUnFriend = () => {
        user.friendList = friendList.filter((item) => item !== id);
        updateDocument('users', uid, user);

        sellectedUser.friendList = sellectedUser.friendList.filter((item) => item !== uid);
        updateDocument('users', id, sellectedUser);
    };
    const handleAccept = async () => {
        friendList.push(id);
        updateDocument('users', uid, user);

        user.requestList = requestList.filter((item) => item !== id);
        updateDocument('users', uid, user);

        sellectedUser.friendList.push(uid);
        updateDocument('users', id, sellectedUser);

        sellectedUser.sendRequestList = sellectedUser.sendRequestList.filter((item) => item !== uid);
        updateDocument('users', id, sellectedUser);
    };
    const handleRefuse = () => {
        user.requestList = requestList.filter((item) => item !== id);
        updateDocument('users', uid, user);

        sellectedUser.sendRequestList = sellectedUser.sendRequestList.filter((item) => item !== uid);
        updateDocument('users', id, sellectedUser);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <Wallpaper src={sellectedUser?.profile.wallpaperURL} isEdit={id === uid} isLoading={!sellectedUser} />
                <div className={cx('body')}>
                    <div className={cx('info')}>
                        <Avatar
                            giant
                            className={cx('avatar')}
                            src={sellectedUser?.profile.photoURL}
                            name={sellectedUser?.profile.displayName}
                            isChangable={id === uid}
                            isLoading={!sellectedUser}
                        />
                        {sellectedUser ? (
                            <div className={cx('info-text')}>
                                <h3 className={cx('name')}>{sellectedUser.profile.displayName}</h3>
                                <p className={cx('status')}>{sellectedUser.profile.status}</p>
                            </div>
                        ) : (
                            <div>
                                <LoadingText />
                                <LoadingText />
                            </div>
                        )}
                    </div>
                    {uid !== id ? (
                        <div className={cx('toggles')}>
                            {isSendingRequest && (
                                <Button className={cx('toggle-btn')} outline onClick={handleUnsendRequest}>
                                    Hủy yêu cầu
                                </Button>
                            )}
                            {isRequest && (
                                <>
                                    <Button className={cx('toggle-btn')} outline onClick={handleAccept}>
                                        Đồng ý
                                    </Button>
                                    <Button className={cx('toggle-btn')} outline onClick={handleRefuse}>
                                        Từ chối
                                    </Button>
                                </>
                            )}
                            {isFriend && (
                                <Button className={cx('toggle-btn')} outline onClick={handleUnFriend}>
                                    Hủy kết bạn
                                </Button>
                            )}
                            {!isRequest && !isFriend && !isSendingRequest && (
                                <Button className={cx('toggle-btn')} outline onClick={handleAddFriend}>
                                    Kết bạn
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Button className={cx('toggle-btn')} outline to={routesConfigs.setting}>
                            Chỉnh sửa
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('bottom', { small })}>
                {sellectedUser ? (
                    <>
                        <div className={cx('left-items')}>
                            <InfoItem label="Tiểu sử" content={sellectedUser.profile.bio} />
                            <InfoItem label="Liên lạc với tôi" content={<ContactList />} />
                        </div>
                        <div className={cx('right-items')}>
                            <InfoItem
                                label={`Bạn bè (${friends.length})`}
                                content={<FriendList isScroll data={friends} />}
                            />
                        </div>
                    </>
                ) : (
                    <div className={cx('loading-info')} />
                )}
            </div>
        </div>
    );
}

export default UserInfo;
