import classnames from 'classnames/bind';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import styles from './UserInfo.module.scss';
import { Button } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import ChangeWallpaperArea from './ChangeWallpaperArea';
import fallbackWallpaper from '~/assets/images/wallpapers/fallback-wallpaper.jpg';

const cx = classnames.bind(styles);

function Wallpaper({ src, isEdit, isLoading }) {
    const { setIsShowModal, setModalTitle, setModalContent, setModalOptions } = useContext(ModalContext);
    const [isShowEdit, setIsShowEdit] = useState(false);

    const handleClickChange = () => {
        setIsShowModal(true);
        setModalTitle('Đổi ảnh bìa');
        setModalContent(<ChangeWallpaperArea />);
        setModalOptions({ small: false });
    };

    return (
        <div
            className={cx('wallpaper')}
            onMouseOver={() => setIsShowEdit(true)}
            onMouseLeave={() => setIsShowEdit(false)}
        >
            {isLoading ? (
                <div className={cx('loading-wallpaper')} />
            ) : (
                <img src={src || fallbackWallpaper} alt="Minh Hoang" />
            )}
            {isEdit && !isLoading && isShowEdit && (
                <Button
                    onlyIcon
                    leftIcon={<FontAwesomeIcon icon={faCamera} />}
                    className={cx('change-btn')}
                    onClick={handleClickChange}
                />
            )}
        </div>
    );
}

export default Wallpaper;
