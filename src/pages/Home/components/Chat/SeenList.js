import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import styles from './Chat.module.scss';
import { Avatar } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import SeenListArea from './SeenListArea';

const cx = classnames.bind(styles);

function SeenList({ data }) {
    const { setIsShowModal, setModalTitle, setModalContent, setModalOptions } = useContext(ModalContext);
    const handleSeeMore = () => {
        setIsShowModal(true);
        setModalTitle('Những người đã xem');
        setModalContent(<SeenListArea data={data} />);
        setModalOptions({ small: true });
    };

    return (
        data.length > 0 && (
            <div className={cx('seen-list')}>
                {data.length > 0 && <Avatar tiny src={data[0].photoURL} className={cx('seen-avatar')} />}
                {data.length > 1 && <Avatar tiny src={data[1].photoURL} className={cx('seen-avatar')} />}
                {data.length > 2 && (
                    <div className={cx('more-seen-people')} onClick={handleSeeMore}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                )}
            </div>
        )
    );
}

export default SeenList;
