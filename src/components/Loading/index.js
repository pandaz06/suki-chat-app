import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Loading.module.scss';
import logo from '~/assets/images/logos/logo-rounded.png';

const cx = classnames.bind(styles);

function Loading({ onlySpinner }) {
    return (
        <div className={cx('wrapper', { onlySpinner })}>
            {!onlySpinner && <img src={logo} alt="Suki logo" className={cx('logo')} />}
            <FontAwesomeIcon icon={faSpinner} className={cx('loading-icon')} />
        </div>
    );
}

export default Loading;
