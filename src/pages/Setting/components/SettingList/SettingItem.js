import className from 'classnames/bind';

import styles from './SettingList.module.scss';
import { Button } from '~/components';

const cx = className.bind(styles);

function SettingItem({ title, icon, path, active }) {
    return (
        <Button leftIcon={icon} to={path} className={cx('setting-item', { active })}>
            {title}
        </Button>
    );
}

export default SettingItem;
