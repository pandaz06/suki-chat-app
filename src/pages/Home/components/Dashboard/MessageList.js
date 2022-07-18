import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import styles from './Dashboard.module.scss';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import { Input } from '~/components';
import Title from '../Title';
import ListItem from '../ListItem';
import CreateGroupArea from '../CreateGroupArea';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classnames.bind(styles);

function MessageList() {
    const { setIsShowModal, setModalTitle, setModalContent } = useContext(ModalContext);
    return (
        <div className={cx('message-list')}>
            <Title
                content="Messages"
                subText={<FontAwesomeIcon icon={faPlus} />}
                onSeeMore={() => {
                    setIsShowModal(true);
                    setModalTitle('Create a new group');
                    setModalContent(<CreateGroupArea />);
                }}
            />
            <Input
                placeholder="Search"
                isFocusable
                leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                className={cx('search-input')}
            />
            <div className={cx('list')}>
                <ListItem
                    active
                    avatar={avatar}
                    text="Minh Hoang"
                    isOnline
                    subText="minh real: Xin chào mọi người nhé hihi"
                    isSeen={false}
                />
                <ListItem
                    avatar={avatar}
                    text="Minh Hoang"
                    isOnline
                    subText="minh real: =))))))))))))))))))))))))))))))))"
                    isSeen={false}
                />
                <ListItem
                    avatar={avatar}
                    text="Minh Hoang"
                    isOnline
                    subText="minh real: Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                    isSeen
                />
            </div>
        </div>
    );
}

export default MessageList;
