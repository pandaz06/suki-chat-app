import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Chat.module.scss';
import { Button } from '~/components';
import ChatInfo from '../ChatInfo';
import { useContext } from 'react';
import { OffCanvaContext } from '~/contexts/OffCanvaContext';
import { RoomsContext } from '~/contexts/RoomsContext';

const cx = className.bind(styles);

function Header({ name, desc }) {
    const { currentRoom } = useContext(RoomsContext);
    const { setIsShowOffCanva, setOffCanvaContent } = useContext(OffCanvaContext);

    const handleToggleChatInfo = () => {
        setIsShowOffCanva(true);
        setOffCanvaContent(<ChatInfo currentRoom={currentRoom} fillAll />);
    };

    return (
        <div className={cx('header')}>
            <div className={cx('info')}>
                <h3>{name}</h3>
                <p>{desc}</p>
            </div>
            <Button
                outline
                className={cx('toggle-chat-info')}
                onlyIcon
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                onClick={handleToggleChatInfo}
            />
        </div>
    );
}

export default Header;
