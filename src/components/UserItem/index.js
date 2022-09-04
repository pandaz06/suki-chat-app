import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './UserItem.module.scss';
import { Avatar, Button } from '~/components';

const cx = classnames.bind(styles);

function UserItem({
    displayName,
    avatar,
    status,
    large,
    isRemove,
    isChoosable,
    onRemove = () => {},
    onChoose = () => {},
}) {
    return (
        <div className={cx('wrapper', { large, isChoosable })} onClick={onChoose}>
            <Avatar src={avatar} name={displayName} isLoading={!avatar} />
            <div className={cx('info')}>
                <h3 className={cx('name')}>{displayName}</h3>
                {status && <p className={cx('status')}>{status}</p>}
            </div>
            {isRemove && (
                <Button
                    onlyIcon
                    leftIcon={<FontAwesomeIcon icon={faTimes} />}
                    className={cx('remove-btn')}
                    onClick={onRemove}
                />
            )}
        </div>
    );
}

export default UserItem;
