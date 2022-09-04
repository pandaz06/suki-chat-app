import classNames from 'classnames/bind';

import styles from './UserInfo.module.scss';

const cx = classNames.bind(styles);

function InfoItem({ label, content }) {
    return (
        <div className={cx('info-item')}>
            <h3 className={cx('title')}>{label}</h3>
            <div className={cx('content')}>{content}</div>
        </div>
    );
}

export default InfoItem;
