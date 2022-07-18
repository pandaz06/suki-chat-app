import classNames from 'classnames/bind';
import { Outlet, useLocation } from 'react-router-dom';

import { routesConfigs } from '~/configs';
import { ProfileOverview, RequestList } from './components';

import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification() {
    const location = useLocation();
    return (
        <div className={'container ' + cx('wrapper')}>
            <RequestList />
            {location.pathname === routesConfigs.notification ? <ProfileOverview /> : <Outlet />}
        </div>
    );
}

export default Notification;
