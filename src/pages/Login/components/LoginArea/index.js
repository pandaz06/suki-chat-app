import classNames from 'classnames/bind';
import { useContext } from 'react';

import styles from './LoginArea.module.scss';
import { Avatar, Button } from '~/components';
import logo from '~/assets/images/logos/logo-rounded.png';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classNames.bind(styles);

function LoginArea({ data }) {
    const { setIsShowModal, setModalTitle, setModalContent } = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Avatar square large src={logo} name="Suki - The chat app" className={cx('logo')} />
                <h3 className={cx('title')}>{data.title}</h3>
                <p className={cx('sub-title')}>Vui lòng chọn 1 trong các lựa chọn sau</p>
            </div>
            <div className={cx('options')}>
                {data.options.map((item, index) => (
                    <Button
                        key={index}
                        className={cx('option-btn')}
                        outline
                        listStyle
                        leftIcon={item.icon}
                        onClick={() => item.onClick(setIsShowModal, setModalTitle, setModalContent)}
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default LoginArea;
