import classnames from 'classnames/bind';

import styles from './Profile.module.scss';
import { UserInfo, InfoList } from '~/components';

const cx = classnames.bind(styles);

function Profile() {
    return (
        <div className={'container ' + cx('wrapper')}>
            <UserInfo username="dawda" />
            <InfoList username="dawda" />
        </div>
    );
}

export default Profile;
