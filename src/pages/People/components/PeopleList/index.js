import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';

import styles from './PeopleList.module.scss';
import PeopleItem from './PeopleItem';
import { Input, Loading, NoData } from '~/components';
import { AuthContext } from '~/contexts/AuthContext';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function PeopleList({ isLoading, currentID, setCurrentID }) {
    const {
        user: { uid },
        friendList,
        requestList,
        usersList,
    } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const debounce = useDebounce(searchText, 500).trim();

    useEffect(() => {
        switch (currentIndex) {
            case 0:
                if (debounce) {
                    const result = requestList.filter(
                        (item) => item.keywords.includes(debounce.toLowerCase()) && item.uid !== uid,
                    );

                    setSearchResult(result);
                } else {
                    setSearchResult(requestList);
                }
                break;
            case 1:
                if (debounce) {
                    const result = friendList.filter(
                        (item) => item.keywords.includes(debounce.toLowerCase()) && item.uid !== uid,
                    );

                    setSearchResult(result);
                } else {
                    setSearchResult(friendList);
                }
                break;
            case 2:
                if (debounce) {
                    const result = usersList.filter(
                        (item) => item.keywords.includes(debounce.toLowerCase()) && item.uid !== uid,
                    );

                    setSearchResult(result);
                } else {
                    setSearchResult([]);
                }
                break;
            default:
                break;
        }
    }, [debounce, usersList, friendList, requestList, uid, currentIndex]);

    const LIST_CONFIGS = [
        {
            title: 'Yêu cầu kết bạn',
            data: searchResult,
            isCount: true,
            noData: 'Không có ai gửi lời mời kết bạn cho bạn',
        },
        {
            title: 'Bạn bè',
            data: searchResult,
            isCount: true,
            noData: 'Chưa có bất cứ bạn bè nào',
        },
        {
            title: 'Mọi người',
            data: searchResult,
            isCount: false,
            noData: 'Hãy tìm kiếm người mà bạn muốn kết bạn',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tab-list')}>
                {LIST_CONFIGS.map((item, index) => (
                    <div
                        key={index}
                        className={cx('tab-item', { active: currentIndex === index })}
                        onClick={() => {
                            setSearchText('');
                            setCurrentIndex(index);
                            setCurrentID(null);
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <h3 className={cx('title')}>
                {LIST_CONFIGS[currentIndex].title}
                {LIST_CONFIGS[currentIndex].isCount &&
                    (LIST_CONFIGS[currentIndex].data ? ` (${LIST_CONFIGS[currentIndex].data.length})` : ' (0)')}
            </h3>
            <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tìm kiếm"
                leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                className={cx('search-input')}
                isFocusable
            />
            {isLoading ? (
                <Loading onlySpinner />
            ) : (
                <div className={cx('list')}>
                    {LIST_CONFIGS[currentIndex].data.length > 0 ? (
                        LIST_CONFIGS[currentIndex].data.map((item) => {
                            return (
                                <PeopleItem
                                    key={item.uid}
                                    avatar={item.profile.photoURL}
                                    displayName={item.profile.displayName}
                                    status={item.profile.status}
                                    active={item.uid === currentID}
                                    onClick={() => setCurrentID(item.uid)}
                                />
                            );
                        })
                    ) : (
                        <NoData message={LIST_CONFIGS[currentIndex].noData} />
                    )}
                </div>
            )}
        </div>
    );
}

export default PeopleList;
