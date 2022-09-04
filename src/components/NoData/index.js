import classNames from 'classnames/bind';

import styles from './NoData.module.scss';
import logo from '~/assets/images/logos/logo-rounded.png';

const cx = classNames.bind(styles);

function NoData({ message, isLogo = true, className }) {
    return (
        <div className={cx('wrapper', { [className]: className })}>
            {isLogo && <img src={logo} alt="Suki logo" className={cx('logo')} />}
            {message && <h3 className={cx('message')}>{message}</h3>}
        </div>
    );
}

export default NoData;
