import className from 'classnames/bind';

import styles from './ChatInfo.module.scss';
import Title from '../Title';

const cx = className.bind(styles);

function InfoList({ title, titleSubText, children, onSeeMore }) {
    return (
        <div className={cx('info')}>
            <Title content={title} subText={titleSubText} onSeeMore={onSeeMore} isInvisibleBtn />
            <div className={cx('info-list')}>{children}</div>
        </div>
    );
}

export default InfoList;
