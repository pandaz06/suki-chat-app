import classnames from 'classnames/bind';

import styles from './Dashboard.module.scss';
import User from './User';
import FriendList from './FriendList';
import MessageList from './MessageList';

const cx = classnames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <User />
            <div className={cx('body')}>
                <FriendList />
                <MessageList />
            </div>
        </div>
    );
}

export default Dashboard;
