import classnames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { serverTimestamp } from 'firebase/firestore';
import Tippy from '@tippyjs/react/headless';
import { ref } from 'firebase/storage';
import { v4 } from 'uuid';

import styles from './CreateGroupArea.module.scss';
import { Button, Input, NoData, Popper, UserItem } from '~/components';
import { addDocument, addPhoto, generateKeywords } from '~/services';
import { ModalContext } from '~/contexts/ModalContext';
import { AuthContext } from '~/contexts/AuthContext';
import { RoomsContext } from '~/contexts/RoomsContext';
import { useDebounce } from '~/hooks';
import { storage } from '~/firebase/config';

const cx = classnames.bind(styles);

function CreateGroupArea() {
    const {
        user: { uid },
        friendList,
    } = useContext(AuthContext);
    const { setIsShowModal } = useContext(ModalContext);
    const { setCurrentID } = useContext(RoomsContext);

    const imageInputRef = useRef();

    const [displayName, setDisplayName] = useState('');
    const [desc, setDesc] = useState('');
    const [members, setMembers] = useState([uid]);
    const [displayMembers, setDisplayMembers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [image, setImage] = useState('');
    const [previewURL, setPreviewURL] = useState('');

    const debounce = useDebounce(searchText, 500).trim();

    useEffect(() => {
        if (debounce) {
            const result = friendList.filter(
                (item) => item.keywords.includes(debounce.toLowerCase()) && !members.includes(item.uid),
            );

            setSearchResults(result);
        } else {
            setSearchResults([]);
        }
    }, [debounce, friendList, members]);

    useEffect(() => {
        if (!image) return;

        setPreviewURL(URL.createObjectURL(image));

        return URL.revokeObjectURL(image);
    }, [image]);

    const handleSubmit = async () => {
        setIsShowModal(false);
        setDisplayName('');
        setDesc('');
        setMembers('');

        // Add a new file to storage
        const photoName = image.name + v4();

        const imageRef = ref(storage, `group-photo/${photoName}`);
        const url = await addPhoto(imageRef, image);

        const resultRef = await addDocument('rooms', {
            displayName,
            photoURL: url,
            photoName,
            desc,
            members,
            latestMessage: {},
            latestMessageDate: serverTimestamp(),
            keywords: generateKeywords(displayName.toLowerCase()),
        });

        setCurrentID(resultRef.id);
    };

    const submitByEnter = (e) => {
        if ((e.key || e.code) === 'Enter' && members.length > 1) {
            handleSubmit();
        }
    };

    const handleAddMember = (id, newMember) => {
        setShowResults(false);

        setMembers((prev) => [...prev, id]);
        setDisplayMembers((prev) => [...prev, newMember]);
    };
    const handleRemoveMember = (id) => {
        // Delete in UI
        setDisplayMembers(displayMembers.filter((member) => member.uid !== id));

        // Delete id
        setMembers(members.filter((memberID) => memberID !== id));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('members')}>
                    <h3 className={cx('title')}>Thành viên</h3>
                    <Tippy
                        interactive
                        placement="bottom"
                        visible={showResults && searchResults.length > 0}
                        render={(attrs) => (
                            <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                                <Popper>
                                    {searchResults.map((item) => (
                                        <UserItem
                                            key={item.uid}
                                            displayName={item.profile.displayName}
                                            avatar={item.profile.photoURL}
                                            status={item.profile.status}
                                            isChoosable
                                            large
                                            onChoose={() => handleAddMember(item.uid, item)}
                                        />
                                    ))}
                                </Popper>
                            </div>
                        )}
                        onClickOutside={() => setShowResults(false)}
                    >
                        <Input
                            isFocusable
                            leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                            placeholder="Tìm kiếm"
                            className={cx('info-input')}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onFocus={() => setShowResults(true)}
                        />
                    </Tippy>
                    {displayMembers.length > 0 && (
                        <div className={cx('list')}>
                            {displayMembers.map((member) => (
                                <UserItem
                                    key={member.uid}
                                    displayName={member.profile.displayName}
                                    avatar={member.profile.photoURL}
                                    status={member.profile.status}
                                    isRemove
                                    onRemove={() => handleRemoveMember(member.uid)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className={cx('group-image')}>
                    <h3 className={cx('title')}>Ảnh nhóm</h3>
                    <Button
                        outline
                        onClick={() => {
                            imageInputRef.current.click();
                        }}
                        className={cx('change-btn')}
                    >
                        Chọn ảnh
                    </Button>
                    {previewURL ? (
                        <img src={previewURL} alt={previewURL} className={cx('preview-image')} />
                    ) : (
                        <NoData message="Hãy chọn ảnh nhóm" isLogo={false} className={cx('no-data')} />
                    )}
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        multiple={false}
                        className={cx('image-input')}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <Input
                    isFocusable
                    label="Tên nhóm"
                    placeholder="Nhập tên nhóm"
                    className={cx('info-input')}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onKeyDown={submitByEnter}
                />
                <Input
                    isFocusable
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    className={cx('info-input')}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    onKeyDown={submitByEnter}
                />
            </div>
            <div className={cx('toggles')}>
                <Button className={cx('toggle-btn')} outline onClick={() => setIsShowModal(false)}>
                    Hủy
                </Button>
                <Button
                    className={cx('toggle-btn')}
                    primary
                    onClick={handleSubmit}
                    disabled={!displayName || !desc || !image || members.length < 2}
                >
                    Tạo nhóm
                </Button>
            </div>
        </div>
    );
}

export default CreateGroupArea;
