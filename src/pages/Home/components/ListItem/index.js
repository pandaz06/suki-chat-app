import classnames from 'classnames/bind';
import { Avatar } from '~/components';

import styles from './ListItem.module.scss';

const cx = classnames.bind(styles);

function ListItem({ avatar, text, subText, squareAvatar, active, onClick, isOnline, isMessage, isSeen = true, small }) {
    return (
        <div className={cx('wrapper', { active, isMessage, isSeen })} onClick={onClick}>
            <Avatar src={avatar} name={text} square={squareAvatar} isOnline={isOnline} small={small} />
            <div className={cx('info', { small })}>
                <h3 className={cx('text')}>{text}</h3>
                {subText && <p className={cx('sub-text')}>{subText}</p>}
            </div>
        </div>
    );
}

export default ListItem;
