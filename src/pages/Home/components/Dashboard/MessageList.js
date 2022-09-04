import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';

import styles from './Dashboard.module.scss';
import { Input, NoData } from '~/components';
import Title from '../Title';
import ListItem from '../ListItem';
import CreateGroupArea from '../CreateGroupArea';
import { ModalContext } from '~/contexts/ModalContext';
import { RoomsContext } from '~/contexts/RoomsContext';
import { AuthContext } from '~/contexts/AuthContext';
import { useDebounce } from '~/hooks';

const cx = classnames.bind(styles);

function MessageList() {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const { setIsShowModal, setModalTitle, setModalContent, setModalOptions } = useContext(ModalContext);
    const { rooms, currentID, setCurrentID } = useContext(RoomsContext);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(rooms.reverse());

    const debounce = useDebounce(searchText, 500).trim();

    useEffect(() => {
        if (debounce) {
            const result = rooms.reverse().filter((item) => item.keywords.includes(debounce.toLowerCase()));

            setData(result);
        } else {
            setData(rooms.reverse());
        }
    }, [debounce, rooms]);

    const handleSeeMore = () => {
        setIsShowModal(true);
        setModalTitle('Tạo nhóm mới');
        setModalContent(<CreateGroupArea />);
        setModalOptions({ small: false });
    };

    const handleScroll = (e) => {
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
            console.log('Scroll to bottom');
        }
    };

    return (
        <div className={cx('message-list')}>
            <Title
                content="Tin nhắn"
                subText={uid && <FontAwesomeIcon icon={faPlus} />}
                underlineSubText={false}
                onSeeMore={uid && handleSeeMore}
            />
            <Input
                placeholder="Tìm kiếm"
                isFocusable
                leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                className={cx('search-input')}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {data.length > 0 ? (
                <div className={cx('list')} onScroll={handleScroll}>
                    {data.map((room) => {
                        const sender = room.latestMessage.sender === uid ? 'Tôi' : room.latestMessage.displayName;
                        const subText =
                            Object.keys(room.latestMessage).length > 0 &&
                            sender + ': ' + (room.latestMessage.text || 'Hình ảnh');

                        let isSeen = false;

                        if (
                            Object.keys(room.latestMessage).length > 0 &&
                            (room.latestMessage.seenList.find((item) => item.uid === uid) ||
                                room.latestMessage.sender === uid)
                        ) {
                            isSeen = true;
                        }

                        return (
                            <ListItem
                                key={room.id}
                                active={room.id === currentID}
                                avatar={room.photoURL}
                                text={room.displayName}
                                subText={subText}
                                isMessage
                                isSeen={isSeen}
                                onClick={() => setCurrentID(room.id)}
                            />
                        );
                    })}
                </div>
            ) : (
                <NoData isLogo={false} />
            )}
        </div>
    );
}

export default MessageList;
