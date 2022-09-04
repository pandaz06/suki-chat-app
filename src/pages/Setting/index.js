import className from 'classnames/bind';
import { useState } from 'react';

import styles from './Setting.module.scss';
import SETTING_CONFIG from '~/pages/Setting/settingConfig';
import { SettingItem } from './components';

const cx = className.bind(styles);

function Setting() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={'container ' + cx('wrapper')}>
            <div className={cx('setting-list')}>
                {SETTING_CONFIG.map((item, index) => (
                    <SettingItem
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        active={currentIndex === index}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
            <div className={cx('setting-area')}>
                <h3 className={cx('title')}>{SETTING_CONFIG[currentIndex].title}</h3>
                {SETTING_CONFIG[currentIndex].content}
            </div>
        </div>
    );
}

export default Setting;
