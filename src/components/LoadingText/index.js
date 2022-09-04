import classnames from 'classnames/bind';

import styles from './LoadingText.module.scss';

const cx = classnames.bind(styles);

function LoadingText() {
    return <div className={cx('wrapper')} />;
}

export default LoadingText;
