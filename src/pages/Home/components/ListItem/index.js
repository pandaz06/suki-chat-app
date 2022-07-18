import classnames from 'classnames/bind';
import { Avatar } from '~/components';

import styles from './ListItem.module.scss';

const cx = classnames.bind(styles);

function ListItem({ avatar, text, subText, squareAvatar, active, isOnline, isSeen = true }) {
    return (
        <div className={cx('wrapper', { active })}>
            <Avatar src={avatar} name={text} square={squareAvatar} isOnline={isOnline} />
            <div className={cx('info')}>
                <h3 className={cx('name')}>{text}</h3>
                {subText && <p className={cx('message')}>{subText}</p>}
                {!isSeen && <div className={cx('seen-circle')}></div>}
            </div>
        </div>
    );
}

export default ListItem;
