import classNames from 'classnames/bind';

import styles from './ProfileOverview.module.scss';
import { UserInfo, InfoList } from '~/components';

const cx = classNames.bind(styles);

function ProfileOverview({ username }) {
    return (
        <div className={cx('wrapper')}>
            <UserInfo username={username} isEdit={false} />
            <InfoList username={username} small />
        </div>
    );
}

export default ProfileOverview;
