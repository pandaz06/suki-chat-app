import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import styles from './Chat.module.scss';
import { ModalContext } from '~/contexts/ModalContext';
import ListItem from '../ListItem';

const cx = classnames.bind(styles);

function SeenListArea({ data }) {
    const { setIsShowModal } = useContext(ModalContext);

    const navigate = useNavigate();

    return (
        <div className={cx('seen-list-area')}>
            {data.map((item) => (
                <ListItem
                    key={item.uid}
                    avatar={item.photoURL}
                    text={item.displayName}
                    subText={item.status}
                    onClick={() => {
                        setIsShowModal(false);
                        navigate(`/${item.uid}`);
                    }}
                    small
                />
            ))}
        </div>
    );
}

export default SeenListArea;
