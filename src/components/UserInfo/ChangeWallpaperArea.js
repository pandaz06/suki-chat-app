import classnames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { v4 } from 'uuid';

import styles from './UserInfo.module.scss';
import Button from '../Button';
import NoData from '../NoData';
import { storage } from '~/firebase/config';
import { addPhoto, updateDocument } from '~/services';
import { AuthContext } from '~/contexts/AuthContext';
import { ModalContext } from '~/contexts/ModalContext';
import Loading from '../Loading';

const cx = classnames.bind(styles);

function ChangeWallpaperArea() {
    const { user } = useContext(AuthContext);
    const { setIsShowModal } = useContext(ModalContext);

    const [image, setImage] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputFileRef = useRef();

    useEffect(() => {
        if (!image) return;

        setPreviewURL(URL.createObjectURL(image));

        return URL.revokeObjectURL(image);
    }, [image]);

    const handleSubmit = async () => {
        setIsLoading(true);
        // Delete previous wallpaper
        if (user.profile.wallpaperName) {
            const previousRef = ref(storage, `wallpapers/${user.profile.wallpaperName}`);

            await deleteObject(previousRef);
        }

        // Add a new wallpaper
        const wallpaperName = image.name + v4();
        const imageRef = ref(storage, `wallpapers/${wallpaperName}`);

        const url = await addPhoto(imageRef, image);

        user.profile.wallpaperURL = url;
        user.profile.wallpaperName = wallpaperName;
        await updateDocument('users', user.uid, user);

        setIsLoading(false);
        setIsShowModal(false);
    };

    return (
        <div className={cx('change-wallpaper-area')}>
            {isLoading ? (
                <Loading onlySpinner />
            ) : (
                <>
                    {previewURL ? (
                        <img className={cx('wallpaper-review')} src={previewURL} alt={previewURL} />
                    ) : (
                        <NoData message="Hãy chọn ảnh bìa mới" isLogo={false} className={cx('no-data')} />
                    )}
                    <div className={cx('toggles')}>
                        <Button outline className={cx('toggle-btn')} onClick={() => inputFileRef.current.click()}>
                            Đổi ảnh bìa
                        </Button>
                        <Button primary className={cx('toggle-btn')} onClick={handleSubmit}>
                            Lưu ảnh
                        </Button>
                    </div>
                </>
            )}
            <input
                ref={inputFileRef}
                type="file"
                multiple={false}
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className={cx('change-input')}
                onChange={(e) => setImage(e.target.files[0])}
            />
        </div>
    );
}

export default ChangeWallpaperArea;
