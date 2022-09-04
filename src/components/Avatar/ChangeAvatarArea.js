import classnames from 'classnames/bind';
import { deleteObject, ref } from 'firebase/storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import styles from './Avatar.module.scss';
import { storage } from '~/firebase/config';
import { addPhoto, updateDocument } from '~/services';
import Button from '../Button';
import NoData from '../NoData';
import Loading from '../Loading';
import { AuthContext } from '~/contexts/AuthContext';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classnames.bind(styles);

function ChangeAvatarArea() {
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
        // Delete previous avatar
        if (user.profile.photoName) {
            const previousRef = ref(storage, `avatars/${user.profile.photoName}`);

            await deleteObject(previousRef);
        }

        // Add a new avatar
        const photoName = image.name + v4();
        const imageRef = ref(storage, `avatars/${photoName}`);

        const url = await addPhoto(imageRef, image);

        user.profile.photoURL = url;
        user.profile.photoName = photoName;
        await updateDocument('users', user.uid, user);

        setIsLoading(false);
        setIsShowModal(false);
    };

    return (
        <div className={cx('change-avatar-area')}>
            {isLoading ? (
                <Loading onlySpinner />
            ) : (
                <>
                    {previewURL ? (
                        <img src={previewURL} alt={previewURL} className={cx('preview-avatar')} />
                    ) : (
                        <NoData message="Hãy chọn ảnh đại diện mới" isLogo={false} className={cx('no-data')} />
                    )}
                    <div className={cx('toggles')}>
                        <Button
                            outline
                            className={cx('toggle-btn')}
                            onClick={() => {
                                inputFileRef.current.click();
                            }}
                        >
                            Đổi ảnh đại diện
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
                accept="image/png, image/jpg, image/jpeg"
                className={cx('change-input')}
                onChange={(e) => setImage(e.target.files[0])}
            />
        </div>
    );
}

export default ChangeAvatarArea;
