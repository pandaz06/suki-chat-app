import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './FriendList.module.scss';
import FriendItem from './FriendItem';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import Input from '../Input';

const cx = classnames.bind(styles);

const FAKE_LIST = [
    {
        id: 1,
        name: 'Minh Hoang',
        username: 'minhhoang2006',
        avatar: avatar,
    },
    {
        id: 2,
        name: 'Hoang Minh',
        username: 'pandaz06',
        avatar: avatar,
    },
    {
        id: 3,
        name: 'Shi Oh Yu',
        username: 'shiohyutft',
        avatar: avatar,
    },
    {
        id: 1,
        name: 'Minh Hoang',
        username: 'minhhoang2006',
        avatar: avatar,
    },
    {
        id: 2,
        name: 'Hoang Minh',
        username: 'pandaz06',
        avatar: avatar,
    },
    {
        id: 3,
        name: 'Shi Oh Yu',
        username: 'shiohyutft',
        avatar: avatar,
    },
    {
        id: 1,
        name: 'Minh Hoang',
        username: 'minhhoang2006',
        avatar: avatar,
    },
    {
        id: 2,
        name: 'Hoang Minh',
        username: 'pandaz06',
        avatar: avatar,
    },
    {
        id: 3,
        name: 'Shi Oh Yu',
        username: 'shiohyutft',
        avatar: avatar,
    },
    {
        id: 1,
        name: 'Minh Hoang',
        username: 'minhhoang2006',
        avatar: avatar,
    },
    {
        id: 2,
        name: 'Hoang Minh',
        username: 'pandaz06',
        avatar: avatar,
    },
    {
        id: 3,
        name: 'Shi Oh Yu',
        username: 'shiohyutft',
        avatar: avatar,
    },
    {
        id: 1,
        name: 'Minh Hoang',
        username: 'minhhoang2006',
        avatar: avatar,
    },
    {
        id: 2,
        name: 'Hoang Minh',
        username: 'pandaz06',
        avatar: avatar,
    },
    {
        id: 3,
        name: 'Shi Oh Yu',
        username: 'shiohyutft',
        avatar: avatar,
    },
];

function FriendList({ id, isToggle = true, ...passProps }) {
    return (
        <div className={cx('wrapper')} {...passProps}>
            <Input
                placeholder="Search"
                leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                className={cx('search-input')}
                isFocusable
            />
            {FAKE_LIST.map((item, index) => (
                <FriendItem
                    key={index}
                    avatar={item.avatar}
                    name={item.name}
                    username={item.username}
                    isToggle={isToggle}
                />
            ))}
        </div>
    );
}

export default FriendList;
