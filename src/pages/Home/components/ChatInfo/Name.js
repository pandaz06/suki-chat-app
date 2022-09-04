import className from 'classnames/bind';

import { Avatar } from '~/components';
import styles from './ChatInfo.module.scss';

const cx = className.bind(styles);

function Name({ avatar, name, desc }) {
    return (
        <div className={cx('name')}>
            <Avatar large src={avatar} name={name} isLoading={!avatar} />
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    );
}

export default Name;
