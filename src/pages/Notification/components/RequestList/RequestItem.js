import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './RequestList.module.scss';
import { Avatar } from '~/components';
import avatar from '~/assets/images/avatars/default-avatar.jpg';

const cx = classNames.bind(styles);

function RequestItem({ active }) {
    return (
        <Link to="@minhhoang" className={cx('request-item', { active })}>
            <Avatar src={avatar} name="Minh Hoang" />
            <div className={cx('names')}>
                <h3 className={cx('name')}>Minh Hoang</h3>
                <p className={cx('username')}>@minhhoang</p>
            </div>
        </Link>
    );
}

export default RequestItem;
