import classnames from 'classnames/bind';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';

import styles from './LogoutArea.module.scss';
import Button from '../Button';
import { auth } from '~/firebase/config';
import logo from '~/assets/images/logos/logo-rounded.png';
import { ModalContext } from '~/contexts/ModalContext';
import { AuthContext } from '~/contexts/AuthContext';
import { RoomsContext } from '~/contexts/RoomsContext';

const cx = classnames.bind(styles);

function LogoutArea() {
    const { setIsShowModal } = useContext(ModalContext);
    const authData = useContext(AuthContext);
    const roomData = useContext(RoomsContext);
    const handleSignOut = async () => {
        try {
            await signOut(auth);

            // Reset data in context
            authData.user = {};
            authData.friendList = [];
            authData.requestList = [];

            roomData.rooms = [];
            roomData.currentRoom = {};
            roomData.setCurrentID(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('content')}>
                <img className={cx('content-image')} src={logo} alt="Suki's logo" />
                <p className={cx('message')}>Bạn có muốn đăng xuất khỏi Suki không ?</p>
            </div>
            <div className={cx('btn-group')}>
                <Button
                    primary
                    className={cx('toggle-btn')}
                    onClick={async () => {
                        await handleSignOut();
                        setIsShowModal(false);
                    }}
                >
                    Xác nhận
                </Button>
                <Button outline className={cx('toggle-btn')} onClick={() => setIsShowModal(false)}>
                    Hủy
                </Button>
            </div>
        </div>
    );
}

export default LogoutArea;
