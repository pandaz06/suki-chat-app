import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import styles from './FriendList.module.scss';
import Input from '../Input';
import FriendItem from './FriendItem';
import { NoData } from '~/components';
import { useDebounce } from '~/hooks';

const cx = classnames.bind(styles);

function FriendList({ data = [], isScroll, emptyMessage = 'Không có bất kì bạn bè nào', isDelete, ...passProps }) {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(data);
    const debounce = useDebounce(searchText, 500).trim();

    useEffect(() => {
        if (debounce) {
            const result = data.filter((item) => item.keywords.includes(debounce.toLowerCase()));

            setList(result);
        } else {
            setList(data);
        }
    }, [debounce, data]);

    return (
        <div className={cx('wrapper', { scroll: isScroll })} {...passProps}>
            <div className={cx('header')}>
                <Input
                    placeholder="Tìm kiếm"
                    leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                    className={cx('search-input')}
                    isFocusable
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            {list.length > 0 ? (
                list.map((item) => (
                    <FriendItem
                        key={item.uid}
                        uid={item.uid}
                        avatar={item.profile.photoURL}
                        displayName={item.profile.displayName}
                        status={item.profile.status}
                    />
                ))
            ) : (
                <NoData message={emptyMessage} />
            )}
        </div>
    );
}

export default FriendList;
