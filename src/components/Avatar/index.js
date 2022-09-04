import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import styles from './Avatar.module.scss';
import Button from '../Button';
import fallbackAvatar from '~/assets/images/avatars/fallback-avatar.jpg';
import { ModalContext } from '~/contexts/ModalContext';
import ChangeAvatarArea from './ChangeAvatarArea';

const cx = classnames.bind(styles);

function Avatar({
    large = false,
    small = false,
    tiny = false,
    giant = false,
    square,
    src,
    name,
    isOnline,
    isChangable,
    isLoading,
    to,
    className,
    ...passProps
}) {
    const { setIsShowModal, setModalTitle, setModalContent, setModalOptions } = useContext(ModalContext);

    let Comp = 'div';
    const props = {
        className: cx('wrapper', {
            [className]: className,
            small,
            tiny,
            large,
            giant,
            square,
        }),
        ...passProps,
    };
    if (to) {
        Comp = Link;
        props.to = to;
    }

    const handleClickChange = () => {
        setIsShowModal(true);
        setModalTitle('Đổi ảnh đại diện');
        setModalContent(<ChangeAvatarArea />);
        setModalOptions({ small: true });
    };

    return (
        <Comp {...props}>
            {isLoading ? <div className={cx('loading-avatar')} /> : <img src={src || fallbackAvatar} alt={name} />}
            {isOnline && !isLoading && <div className={cx('online-circle')}></div>}
            {isChangable && !isLoading && (
                <Button
                    onlyIcon
                    leftIcon={<FontAwesomeIcon icon={faCamera} />}
                    className={cx('change-btn')}
                    onClick={handleClickChange}
                />
            )}
        </Comp>
    );
}

export default Avatar;
