import { useContext, useState } from 'react';
import classnames from 'classnames/bind';

import styles from './EditAccount.module.scss';
import EditItem from '../EditItem';
import { AuthContext } from '~/contexts/AuthContext';
import { Button, Loading } from '~/components';
import { updateDocument } from '~/services';

const cx = classnames.bind(styles);

function EditAccount() {
    const { user } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(user?.profile?.status);
    const [bio, setBio] = useState(user?.profile?.bio);
    const [facebookRef, setFacebookRef] = useState(user?.profile?.facebookRef);
    const [githubRef, setGithubRef] = useState(user?.profile?.githubRef);
    const [youtubeRef, setYoutubeRef] = useState(user?.profile?.youtubeRef);
    const [twitterRef, setTwitterRef] = useState(user?.profile?.twitterRef);
    const [tiktokRef, setTiktokRef] = useState(user?.profile?.tiktokRef);

    const [isLoading, setisLoading] = useState(false);

    const isChange =
        status !== user?.profile?.status ||
        bio !== user?.profile?.bio ||
        facebookRef !== user?.profile?.facebookRef ||
        githubRef !== user?.profile?.githubRef ||
        youtubeRef !== user?.profile?.youtubeRef ||
        twitterRef !== user?.profile?.twitterRef ||
        tiktokRef !== user?.profile?.tiktokRef;

    const handleToggleEdit = () => {
        if (isEditing) {
            setStatus(user.profile.status);
            setBio(user.profile.bio);
            setFacebookRef(user.profile.facebookRef);
            setGithubRef(user.profile.githubRef);
            setYoutubeRef(user.profile.youtubeRef);
            setTwitterRef(user.profile.twitterRef);
            setTiktokRef(user.profile.tiktokRef);
        }

        const newIsEditting = !isEditing;

        setIsEditing(newIsEditting);
    };

    const handleSocialRef = (socialRef) => {
        if (socialRef.startsWith('https://')) {
            return socialRef.slice(8, socialRef.length - 1);
        } else if (socialRef.startsWith('http://')) {
            return socialRef.slice(7, socialRef.length - 1);
        } else {
            return socialRef;
        }
    };

    const handleSave = async () => {
        setisLoading(true);
        if (isChange) {
            user.profile.status = status;
            user.profile.bio = bio;
            user.profile.facebookRef = facebookRef;
            user.profile.githubRef = githubRef;
            user.profile.youtubeRef = youtubeRef;
            user.profile.twitterRef = twitterRef;
            user.profile.tiktokRef = tiktokRef;

            await updateDocument('users', user.uid, user);
        }
        setisLoading(false);
        setIsEditing(false);
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <Loading onlySpinner />
            ) : (
                <>
                    <EditItem title="Tên" value={user?.profile?.displayName} />
                    <EditItem
                        title="Trạng thái"
                        value={status}
                        isEditing={isEditing}
                        onChange={(e) => setStatus(e.target.value)}
                        isFocus
                    />
                    <EditItem
                        title="Tiểu sử"
                        value={bio}
                        isEditing={isEditing}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <EditItem
                        title="Facebook"
                        value={facebookRef}
                        isEditing={isEditing}
                        onChange={(e) => setFacebookRef(handleSocialRef(e.target.value))}
                    />
                    <EditItem
                        title="Github"
                        value={githubRef}
                        isEditing={isEditing}
                        onChange={(e) => setGithubRef(handleSocialRef(e.target.value))}
                    />
                    <EditItem
                        title="Youtube"
                        value={youtubeRef}
                        isEditing={isEditing}
                        onChange={(e) => setYoutubeRef(handleSocialRef(e.target.value))}
                    />
                    <EditItem
                        title="Twitter"
                        value={twitterRef}
                        isEditing={isEditing}
                        onChange={(e) => setTwitterRef(handleSocialRef(e.target.value))}
                    />
                    <EditItem
                        title="Tiktok"
                        value={tiktokRef}
                        isEditing={isEditing}
                        onChange={(e) => setTiktokRef(handleSocialRef(e.target.value))}
                    />
                    <div className={cx('toggles')}>
                        <Button outline className={cx('toggle-btn')} onClick={handleToggleEdit}>
                            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                        </Button>
                        <Button
                            outline
                            disabled={!isEditing || !isChange}
                            className={cx('toggle-btn')}
                            onClick={handleSave}
                        >
                            Lưu thông tin
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditAccount;
