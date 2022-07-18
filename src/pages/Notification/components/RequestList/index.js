import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './RequestList.module.scss';
import RequestItem from './RequestItem';
import { Input } from '~/components';

const cx = classNames.bind(styles);

function RequestList() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Request list (23)</h3>
            <Input
                placeholder="Search"
                leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                className={cx('search-input')}
                isFocusable
            />
            <div className={cx('list')}>
                <RequestItem active />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
            </div>
        </div>
    );
}

export default RequestList;
