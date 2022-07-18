import className from 'classnames/bind';
import { useContext } from 'react';

import styles from './ChatInfo.module.scss';
import Name from './Name';
import InfoList from './InfoList';
import ListItem from '../ListItem';
import avatar from '~/assets/images/avatars/default-avatar.jpg';
import { Button, FriendList } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);

function ChatInfo() {
    const { setIsShowModal, setModalTitle, setModalContent } = useContext(ModalContext);

    const handleSeeMore = () => {
        setIsShowModal(true);
        setModalTitle('Participants');
        setModalContent(<FriendList />);
    };

    return (
        <div className={cx('wrapper')}>
            <Name avatar={avatar} name="Group #1" desc="@Odama" />
            <div className={cx('body')}>
                <InfoList title="24 Participants" titleSubText="See all" onSeeMore={handleSeeMore}>
                    <ListItem avatar={avatar} text="Minh Hoang" subText="My username" />
                    <ListItem avatar={avatar} text="Minh Hoang" subText="My username" />
                    <ListItem avatar={avatar} text="Minh Hoang" subText="My username" />
                </InfoList>
                <InfoList title="Share Media" titleSubText="See all">
                    <ListItem squareAvatar avatar={avatar} text="Minh Hoang" subText="My username" />
                    <ListItem squareAvatar avatar={avatar} text="Minh Hoang" subText="My username" />
                    <ListItem squareAvatar avatar={avatar} text="Minh Hoang" subText="My username" />
                </InfoList>
                <InfoList title="Customize Chat">
                    <ListItem squareAvatar avatar={avatar} text="Minh Hoang" subText="My username" />
                    <ListItem squareAvatar avatar={avatar} text="Minh Hoang" subText="My username" />
                    <ListItem squareAvatar avatar={avatar} text="Minh Hoang" subText="My username" />
                </InfoList>
            </div>
            <div className={cx('toggles')}>
                <Button
                    className={cx('toggle-btn')}
                    primary
                    onlyIcon
                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                />
                <Button
                    className={cx('toggle-btn')}
                    primary
                    onlyIcon
                    leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                />
            </div>
        </div>
    );
}

export default ChatInfo;
