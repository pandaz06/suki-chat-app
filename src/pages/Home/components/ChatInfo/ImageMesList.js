import classnames from 'classnames/bind';
import { useContext } from 'react';
import Tippy from '@tippyjs/react';
import { format } from 'date-fns';

import styles from './ChatInfo.module.scss';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classnames.bind(styles);

function ImageMesList({ data }) {
    const {
        user: { uid },
    } = useContext(AuthContext);

    return (
        <div className={cx('image-mes-list')}>
            {data.map((mes) => {
                let createdAt;

                if (mes.createdAt?.seconds) {
                    createdAt = format(mes.createdAt.seconds * 1000, 'P');
                }

                return (
                    <Tippy
                        key={mes.id}
                        content={`${mes.sender === uid ? 'Tôi' : mes.displayName} - ${createdAt || 'Đang tải'}`}
                        placement="top"
                    >
                        <img src={mes.imageURL} alt={mes.imageURL} className={cx('image-item')} />
                    </Tippy>
                );
            })}
        </div>
    );
}

export default ImageMesList;
