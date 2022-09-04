import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './EditGroupArea.module.scss';
import { Avatar, Button, Input, Loading, UserItem } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import { RoomsContext } from '~/contexts/RoomsContext';
import { AuthContext } from '~/contexts/AuthContext';
import { OffCanvaContext } from '~/contexts/OffCanvaContext';
import { addPhoto, generateKeywords, updateDocument } from '~/services';
import { useDebounce } from '~/hooks';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '~/firebase/config';
import { v4 } from 'uuid';

const cx = classnames.bind(styles);

function EditGroupArea() {
    const {
        user: { uid },
        friendList,
    } = useContext(AuthContext);
    const { setIsShowModal } = useContext(ModalContext);
    const { setIsShowOffCanva } = useContext(OffCanvaContext);
    const { currentRoom, members, currentID } = useContext(RoomsContext);

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [image, setImage] = useState('');
    const [photoURL, setPhotoURL] = useState(currentRoom.photoURL);
    const [displayName, setDisplayName] = useState(currentRoom.displayName);
    const [desc, setDesc] = useState(currentRoom.desc);
    const [displayMembers, setDisplayMembers] = useState(members);
    const [membersID, setMembersID] = useState(currentRoom.members);
    const [isLoading, setIsLoading] = useState(false);

    const imageInputRef = useRef();

    const debounce = useDebounce(searchText, 500).trim();

    useEffect(() => {
        if (debounce) {
            const result = friendList.filter(
                (item) => item.keywords.includes(debounce.toLowerCase()) && !membersID.includes(item.uid),
            );

            setSearchResults(result);
        } else {
            setSearchResults([]);
        }
    }, [debounce, friendList, membersID]);

    useEffect(() => {
        if (!image) return;

        setPhotoURL(URL.createObjectURL(image));

        return URL.revokeObjectURL(image);
    }, [image]);

    const handleDeleteMember = (id) => {
        // Delete in UI
        const newDisplayMembers = displayMembers.filter((displayMem) => displayMem.uid !== id);
        setDisplayMembers(newDisplayMembers);

        // Delete the ID
        const newMembersID = membersID.filter((memID) => memID !== id);
        setMembersID(newMembersID);
    };

    const handleAddMember = (id, newMember) => {
        // Add in UI
        setDisplayMembers((prev) => [...prev, newMember]);

        // Add the ID
        setMembersID((prev) => [...prev, id]);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        // Delete previous photo
        const previousRef = ref(storage, `group-photo/${currentRoom.photoName}`);

        await deleteObject(previousRef);

        // Set a new photo and room details
        const photoName = image.name + v4();

        const imageRef = ref(storage, `group-photo/${photoName}`);

        currentRoom.photoURL = await addPhoto(imageRef, image);
        currentRoom.photoName = photoName;
        currentRoom.displayName = displayName;
        currentRoom.desc = desc;
        currentRoom.members = membersID;
        currentRoom.keywords = generateKeywords(displayName.toLowerCase());

        await updateDocument('rooms', currentID, currentRoom);

        setIsLoading(false);
        setIsShowModal(false);
        setIsShowOffCanva(false);
    };

    const handleEnter = (e) => {
        const key = e.key || e.code;
        if (key === 'Enter' && displayName && desc && membersID.length > 1) {
            handleSubmit();
        }
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <Loading onlySpinner />
            ) : (
                <>
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        multiple={false}
                        className={cx('image-input')}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <Button outline className={cx('change-btn')} onClick={() => imageInputRef.current.click()}>
                        Thay đổi ảnh nhóm
                    </Button>
                    <Avatar src={photoURL} giant className={cx('group-photo')} isLoading={!currentRoom} />
                    <div className={cx('info')}>
                        <div className={cx('left-items')}>
                            <Input
                                label="Tên nhóm"
                                placeholder="Chỉnh sửa tên nhóm"
                                isFocusable
                                className={cx('info-input')}
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                            <Input
                                label="Mô tả"
                                placeholder="Chỉnh sửa mô tả"
                                isFocusable
                                className={cx('info-input')}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                            <label className={cx('title')}>Thành viên</label>
                            <div className={cx('member-list')}>
                                {displayMembers.map((member) => (
                                    <UserItem
                                        key={member.uid}
                                        displayName={member.profile.displayName}
                                        avatar={member.profile.photoURL}
                                        status={member.profile.status}
                                        isRemove={member.uid !== uid}
                                        large
                                        onRemove={() => handleDeleteMember(member.uid)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={cx('right-items')}>
                            <Input
                                label="Thêm thành viên"
                                isFocusable
                                leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                                placeholder="Tìm kiếm"
                                className={cx('info-input')}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <div className={cx('new-member-list')}>
                                {searchResults.map((result) => (
                                    <UserItem
                                        key={result.uid}
                                        displayName={result.profile.displayName}
                                        avatar={result.profile.photoURL}
                                        status={result.profile.status}
                                        large
                                        isChoosable
                                        onChoose={() => handleAddMember(result.uid, result)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('toggles')}>
                        <Button outline className={cx('toggle-btn')} onClick={() => setIsShowModal(false)}>
                            Hủy
                        </Button>
                        <Button
                            primary
                            className={cx('toggle-btn')}
                            disabled={!displayName || !desc || membersID.length < 2}
                            onClick={handleSubmit}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditGroupArea;
