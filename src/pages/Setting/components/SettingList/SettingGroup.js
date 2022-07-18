import className from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import styles from './SettingList.module.scss';
import SettingItem from './SettingItem';

const cx = className.bind(styles);

function SettingGroup({ title, children }) {
    const location = useLocation();
    return (
        <div className={cx('setting-group')}>
            <h3 className={cx('title')}>{title}</h3>
            <div className={cx('children')}>
                {children.map((item, index) => (
                    <SettingItem
                        key={index}
                        active={location.pathname.includes(item.path)}
                        icon={item.icon}
                        path={item.path}
                        title={item.title}
                        className={cx('setting-item')}
                    />
                ))}
            </div>
        </div>
    );
}

export default SettingGroup;
