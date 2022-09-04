import className from 'classnames/bind';

import styles from './SettingItem.module.scss';
import { Button } from '~/components';

const cx = className.bind(styles);

function SettingItem({ title, icon, active, onClick }) {
    return (
        <Button leftIcon={icon} className={cx('wrapper', { active })} onClick={onClick}>
            {title}
        </Button>
    );
}

export default SettingItem;
