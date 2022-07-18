import className from 'classnames/bind';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';

import styles from './Chat.module.scss';
import { Avatar, Button } from '~/components';
import avatar from '~/assets/images/avatars/default-avatar.jpg';

const cx = className.bind(styles);

function Message({ right, left, sender, content, createdAt }) {
    const classes = cx('message', {
        right,
        left,
    });
    return (
        <div className={classes}>
            <Avatar src={avatar} small name="Minh Hoang" className={cx('avatar')} />
            <div className={cx('message-content')}>
                <h3 className={cx('sender')}>{sender}</h3>
                {content && (
                    <Tippy content={createdAt} placement={left ? 'right' : 'left'}>
                        <p className={cx('content')}>{content}</p>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default Message;
