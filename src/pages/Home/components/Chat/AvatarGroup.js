import className from 'classnames/bind';

import styles from './Chat.module.scss';
import { Avatar } from '~/components';
import avatar from '~/assets/images/avatars/default-avatar.jpg';

const cx = className.bind(styles);

function AvatarGroup({ people }) {
    return (
        <div className={cx('avatar-group')}>
            <Avatar small src={avatar} name="Minh Hoang" className={cx('people-avatar')} />
            <Avatar small src={avatar} name="Minh Hoang" className={cx('people-avatar')} />
            <div className={cx('more-people')}>10+</div>
        </div>
    );
}

export default AvatarGroup;
