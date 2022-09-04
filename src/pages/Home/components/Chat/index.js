import className from 'classnames/bind';

import styles from './Chat.module.scss';
import ChatZone from './ChatZone';
import Header from './Header';

const cx = className.bind(styles);

function Chat({ currentRoom, dataIndex }) {
    return (
        <div className={cx('wrapper')}>
            <Header
                name={currentRoom.isDual ? currentRoom.displayName[dataIndex] : currentRoom.displayName}
                desc={currentRoom.isDual ? currentRoom.desc[dataIndex] : currentRoom.desc}
            />
            <ChatZone />
        </div>
    );
}

export default Chat;
