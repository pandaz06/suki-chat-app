import className from 'classnames/bind';
import { useState } from 'react';

import styles from './Toggle.module.scss';

const cx = className.bind(styles);

function Toggle({ isActive, onToggle = () => {} }) {
    const [isOn, setIsOn] = useState(isActive);
    const handleClick = () => {
        setIsOn(!isOn);
        onToggle();
    };
    return (
        <div className={cx('wrapper', { isOn })} onClick={handleClick}>
            <div className={cx('inner')}></div>
        </div>
    );
}

export default Toggle;
