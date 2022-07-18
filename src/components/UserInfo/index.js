import classnames from 'classnames/bind';

import styles from './UserInfo.module.scss';
import { Avatar, Button } from '~/components';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import fallbackAvatar from '~/assets/images/avatars/fallback-avatar.jpg';
import Wallpaper from './Wallpaper';

const cx = classnames.bind(styles);

function UserInfo({ username, isEdit = true }) {
    return (
        <div className={cx('wrapper')}>
            <Wallpaper username={username} isEdit={isEdit} />
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <Avatar
                        className={cx('avatar')}
                        src={username ? avatar : fallbackAvatar}
                        name="Minh Hoang"
                        giant
                        isChangable={isEdit}
                    />
                    {username && (
                        <div>
                            <h3 className={cx('name')}>Minh Hoang</h3>
                            <p className={cx('username')}>@minhhoang</p>
                        </div>
                    )}
                </div>
                {username && (
                    <div className={cx('toggles')}>
                        <Button className={cx('toggle-btn')} outline>
                            Accept
                        </Button>
                        <Button className={cx('toggle-btn')} outline>
                            Refuse
                        </Button>
                        <Button className={cx('toggle-btn')} outline>
                            Chat
                        </Button>
                        <Button className={cx('toggle-btn')} outline>
                            Add friend
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInfo;
