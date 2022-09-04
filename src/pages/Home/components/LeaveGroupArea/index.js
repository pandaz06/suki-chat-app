import className from 'classnames/bind';
import { useContext } from 'react';

import styles from './LeaveGroupArea.module.scss';
import { Avatar, Button } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import { RoomsContext } from '~/contexts/RoomsContext';
import { AuthContext } from '~/contexts/AuthContext';
import { OffCanvaContext } from '~/contexts/OffCanvaContext';
import { deleteDocument, updateDocument } from '~/services';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '~/firebase/config';

const cx = className.bind(styles);

function LeaveGroupArea({ isDelete }) {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const { setIsShowModal } = useContext(ModalContext);
    const { setIsShowOffCanva } = useContext(OffCanvaContext);
    const { currentRoom, currentID, messages } = useContext(RoomsContext);

    const handleDelete = () => {
        deleteDocument('rooms', currentID);

        messages.forEach((mes) => {
            const imageRef = ref(storage, `images/${mes.imageName}`);

            deleteDocument('messages', mes.id).then(() => {
                deleteObject(imageRef);
            });
        });
    };

    const handleLeave = () => {
        currentRoom.members.forEach((element, index) => {
            if (element === uid) {
                currentRoom.members.splice(index, 1);
                return;
            }
        });

        if (currentRoom.members.length === 0) {
            handleDelete();
        } else {
            updateDocument('rooms', currentID, currentRoom);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Avatar src={currentRoom.photoURL} large square className={cx('group-photo')} isLoading={!currentRoom} />
            <p className={cx('message')}>Bạn có muốn {isDelete ? 'xóa bỏ' : 'rời khỏi'} cuộc trò chuyện này không ?</p>
            <Button
                primary
                className={cx('toggle-btn')}
                onClick={() => {
                    if (isDelete) {
                        handleDelete();
                    } else {
                        handleLeave();
                    }
                    setIsShowModal(false);
                    setIsShowOffCanva(false);
                }}
            >
                Xác nhận
            </Button>
            <Button outline className={cx('toggle-btn')} onClick={() => setIsShowModal(false)}>
                Hủy
            </Button>
        </div>
    );
}

export default LeaveGroupArea;
