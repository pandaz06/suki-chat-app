import className from 'classnames/bind';

import styles from './Chat.module.scss';
import ChatZone from './ChatZone';
import Header from './Header';

const cx = className.bind(styles);

function Chat() {
    return (
        <div className={cx('wrapper')}>
            <Header name="Group #1" username="@Odama" />
            <ChatZone />
        </div>
    );
}

export default Chat;
