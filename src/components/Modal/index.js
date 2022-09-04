import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import styles from './Modal.module.scss';
import { Button } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';

const cx = className.bind(styles);

function Modal({ title, content }) {
    const {
        setIsShowModal,
        modalOptions: { small },
    } = useContext(ModalContext);
    return (
        <div className={cx('wrapper')} onClick={() => setIsShowModal(false)}>
            <div className={cx('container', { small })} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <h3>{title}</h3>
                    <Button
                        onlyIcon
                        leftIcon={<FontAwesomeIcon icon={faTimes} />}
                        className={cx('close-btn')}
                        onClick={() => setIsShowModal(false)}
                    />
                </div>
                <div className={cx('content')}>{content}</div>
            </div>
        </div>
    );
}

export default Modal;
