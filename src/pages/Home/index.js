import className from 'classnames/bind';

import styles from './Home.module.scss';
import { Dashboard, Chat, ChatInfo } from './components';

const cx = className.bind(styles);

function Home() {
    return (
        <div className={'container ' + cx('wrapper')}>
            <Dashboard />
            <Chat />
            <ChatInfo />
        </div>
    );
}

export default Home;
