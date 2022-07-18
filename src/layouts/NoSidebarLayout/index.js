import classnames from 'classnames/bind';

import styles from './NoSidebarLayout.module.scss';

const cx = classnames.bind(styles);

function NoSidebarLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default NoSidebarLayout;
