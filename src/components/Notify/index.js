import classnames from 'classnames/bind';

import styles from './Notify.module.scss';
import Button from '../Button';

const cx = classnames.bind(styles);

function Notify({ img, title, message, confirm, cancel, onConfirm, onCancel }) {
    return (
        <div className={cx('wrapper')} onClick={onCancel}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('content')}>
                    <img className={cx('content-image')} src={img} alt="Minh Hoang" />
                    <h3 className={cx('title')}>{title}</h3>
                    <p className={cx('message')}>{message}</p>
                </div>
                <div className={cx('btn-group')}>
                    <Button primary className={cx('toggle-btn')} onClick={onConfirm}>
                        {confirm}
                    </Button>
                    <Button outline className={cx('toggle-btn')} onClick={onCancel}>
                        {cancel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Notify;
