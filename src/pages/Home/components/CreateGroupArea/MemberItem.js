import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './CreateGroupArea.module.scss';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import { Avatar, Button } from '~/components';

const cx = classnames.bind(styles);

function MemberItem({ username }) {
    return (
        <div className={cx('member-item')}>
            <Avatar src={avatar} name="Minh Hoang" />
            <div className={cx('info')}>
                <h3 className={cx('name')}>Minh Hoang</h3>
                <p className={cx('username')}>@minhhoang</p>
            </div>
            <Button onlyIcon leftIcon={<FontAwesomeIcon icon={faTimes} />} className={cx('remove-btn')} />
        </div>
    );
}

export default MemberItem;
