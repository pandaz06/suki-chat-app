import className from 'classnames/bind';

import styles from './SettingArea.module.scss';

const cx = className.bind(styles);

function SettingArea({ title, content }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>{title}</h3>
            {content}
        </div>
    );
}

export default SettingArea;
