import classNames from 'classnames/bind';

import styles from './PeopleList.module.scss';
import { Avatar } from '~/components';

const cx = classNames.bind(styles);

function PeopleItem({ avatar, displayName, status, active, onClick }) {
    return (
        <div className={cx('people-item', { active })} onClick={onClick}>
            <Avatar src={avatar} name={displayName} />
            <div className={cx('info')}>
                <h3 className={cx('name')}>{displayName}</h3>
                <p className={cx('status')}>{status}</p>
            </div>
        </div>
    );
}

export default PeopleItem;
