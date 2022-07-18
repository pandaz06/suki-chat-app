import className from 'classnames/bind';
import { Outlet } from 'react-router-dom';

import styles from './Setting.module.scss';
import { SettingList } from './components';

const cx = className.bind(styles);

function Setting() {
    return (
        <div className={'container ' + cx('wrapper')}>
            <SettingList />
            <Outlet />
        </div>
    );
}

export default Setting;
