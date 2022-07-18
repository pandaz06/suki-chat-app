import classnames from 'classnames/bind';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import styles from './UserInfo.module.scss';
import { Button } from '~/components';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import fallbackWallpaper from '~/assets/images/wallpapers/fallback-wallpaper.jpg';

const cx = classnames.bind(styles);

function Wallpaper({ username, isEdit }) {
    const [isShowEdit, setIsShowEdit] = useState(false);

    const inputFileRef = useRef();
    const handleClickChange = () => {
        inputFileRef.current.click();
    };

    return (
        <div
            className={cx('wallpaper')}
            onMouseOver={() => setIsShowEdit(true)}
            onMouseLeave={() => setIsShowEdit(false)}
        >
            <img src={username ? avatar : fallbackWallpaper} alt="Minh Hoang" />
            {isEdit && isShowEdit && (
                <Button
                    onlyIcon
                    leftIcon={<FontAwesomeIcon icon={faCamera} />}
                    className={cx('change-btn')}
                    onClick={handleClickChange}
                />
            )}
            {isEdit && (
                <input
                    ref={inputFileRef}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className={cx('change-input')}
                />
            )}
        </div>
    );
}

export default Wallpaper;
