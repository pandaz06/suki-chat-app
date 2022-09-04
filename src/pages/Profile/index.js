import classnames from 'classnames/bind';

import styles from './Profile.module.scss';
import { UserInfo } from '~/components';
import { useLocation } from 'react-router-dom';

const cx = classnames.bind(styles);

function Profile() {
    const location = useLocation();
    const pathname = location.pathname;

    const id = pathname.slice(1, pathname.length);

    return (
        <div className={'container ' + cx('wrapper')}>
            <UserInfo id={id} />
        </div>
    );
}

export default Profile;
