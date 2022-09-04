import className from 'classnames/bind';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';

import styles from './Chat.module.scss';
import { Avatar } from '~/components';

const cx = className.bind(styles);

function Message({ right, left, sender, avatar, text, imageURL, createdAt, isHideSender, isSending }) {
    const classes = cx('message', {
        isHideSender,
        isSending,
        right,
        left,
    });
    return (
        <div className={classes}>
            {left && <h3 className={cx('sender')}>{sender}</h3>}
            <Tippy content={createdAt} placement={left ? 'right' : 'left'}>
                <div className={cx('bottom')}>
                    {left && (
                        <Avatar src={avatar} small name="Minh Hoang" className={cx('avatar')} isLoading={!avatar} />
                    )}
                    {text && <p className={cx('text')}>{text}</p>}
                    {imageURL && <img src={imageURL} alt={imageURL} className={cx('image')} />}
                </div>
            </Tippy>
        </div>
    );
}

export default Message;
