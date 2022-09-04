import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './ChatInfo.module.scss';
import { Button, FriendList } from '~/components';
import Name from './Name';
import InfoList from './InfoList';
import ListItem from '../ListItem';
import LeaveGroupArea from '../LeaveGroupArea';
import EditGroupArea from '../EditGroupArea';
import ImageMesList from './ImageMesList';
import { ModalContext } from '~/contexts/ModalContext';
import { RoomsContext } from '~/contexts/RoomsContext';
import { AuthContext } from '~/contexts/AuthContext';
import { OffCanvaContext } from '~/contexts/OffCanvaContext';

const cx = className.bind(styles);

function ChatInfo({ currentRoom, fillAll = false }) {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const { setIsShowModal, setModalTitle, setModalContent, setModalOptions } = useContext(ModalContext);
    const { setIsShowOffCanva } = useContext(OffCanvaContext);
    const { imageMessages, limitedImageMessages, members, limitedMembers } = useContext(RoomsContext);
    const navigate = useNavigate();

    const handleSeeMoreMembers = () => {
        setIsShowModal(true);
        setModalTitle(`Thành viên (${members.length})`);
        setModalContent(<FriendList data={members} emptyMessage="Không có bất kì thành viên nào" />);
        setModalOptions({ small: false });
    };

    const handleSeeMoreImages = () => {
        setIsShowModal(true);
        setModalTitle(`Ảnh đã chia sẻ (${imageMessages.length})`);
        setModalContent(<ImageMesList data={imageMessages} />);
        setModalOptions({ small: false });
    };

    // Add group and delete group area are put into a mutal component - LeaveGroupArea

    const handleLeaveGroup = () => {
        setIsShowModal(true);
        setModalTitle('Rời nhóm');
        setModalContent(<LeaveGroupArea />);
        setModalOptions({ small: true });
    };

    const handleDeleteGroup = () => {
        setIsShowModal(true);
        setModalTitle('Xóa cuộc trò chuyện');
        setModalContent(<LeaveGroupArea isDelete />);
        setModalOptions({ small: true });
    };

    const handleEditGroup = () => {
        setIsShowModal(true);
        setModalTitle('Chỉnh sửa');
        setModalContent(<EditGroupArea />);
        setModalOptions({ small: false });
    };

    return (
        <div className={cx('wrapper', { fillAll })}>
            <Name avatar={currentRoom.photoURL} name={currentRoom.displayName} desc={currentRoom.desc} />
            <div className={cx('body')}>
                <InfoList
                    title={`Thành viên (${members.length})`}
                    titleSubText="Chi tiết"
                    onSeeMore={handleSeeMoreMembers}
                >
                    {limitedMembers.map((member) => (
                        <ListItem
                            key={member.uid}
                            avatar={member.profile.photoURL}
                            text={member.profile.displayName}
                            subText={member.profile.status}
                            onClick={() => {
                                navigate(`/${member.uid}`);
                                setIsShowOffCanva(false);
                            }}
                        />
                    ))}
                </InfoList>
                <InfoList
                    title="Ảnh & Video"
                    titleSubText={limitedImageMessages.length > 0 ? 'Chi tiết' : ''}
                    onSeeMore={handleSeeMoreImages}
                >
                    {limitedImageMessages.map((mes) => {
                        let createdAt;

                        if (mes.createdAt?.seconds) {
                            createdAt = format(mes.createdAt.seconds * 1000, 'P');
                        }

                        return (
                            <ListItem
                                key={mes.id}
                                squareAvatar
                                avatar={mes.imageURL}
                                text={mes.sender === uid ? 'Tôi' : mes.displayName}
                                subText={createdAt}
                            />
                        );
                    })}
                </InfoList>
                <InfoList title="Khác">
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPen} />}
                        className={cx('toggle-btn')}
                        onClick={handleEditGroup}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                        className={cx('toggle-btn')}
                        onClick={handleLeaveGroup}
                    >
                        Rời nhóm
                    </Button>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faTrash} />}
                        className={cx('toggle-btn')}
                        onClick={handleDeleteGroup}
                    >
                        Xóa cuộc trò chuyện
                    </Button>
                </InfoList>
            </div>
        </div>
    );
}

export default ChatInfo;
