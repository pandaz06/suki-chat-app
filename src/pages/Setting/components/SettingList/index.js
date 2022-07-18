import className from 'classnames/bind';

import styles from './SettingList.module.scss';
import SETTING_ITEMS from './settingConfigs';
import SettingGroup from './SettingGroup';

const cx = className.bind(styles);

function SettingList() {
    return (
        <div className={cx('wrapper')}>
            <SettingGroup title="Cài đặt" children={SETTING_ITEMS.preferences} />
            <SettingGroup title="Hỗ trợ" children={SETTING_ITEMS.support} />
        </div>
    );
}

export default SettingList;
