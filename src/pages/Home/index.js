import className from 'classnames/bind';
import { useContext } from 'react';

import styles from './Home.module.scss';
import { Dashboard, Chat, ChatInfo } from './components';
import { NoData } from '~/components';
import { RoomsContext } from '~/contexts/RoomsContext';
import { AuthContext } from '~/contexts/AuthContext';

const cx = className.bind(styles);

function Home() {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const { currentRoom } = useContext(RoomsContext);

    const dataIndex = currentRoom?.isDual && (uid === currentRoom.members[0] ? 1 : 0);

    return (
        <div className={'container ' + cx('wrapper')}>
            <Dashboard />
            {currentRoom ? (
                <>
                    <Chat currentRoom={currentRoom} dataIndex={dataIndex} />
                    <ChatInfo currentRoom={currentRoom} dataIndex={dataIndex} />
                </>
            ) : (
                <NoData message="Chọn 1 phòng để bắt đầu nhắn tin" />
            )}
        </div>
    );
}

export default Home;
