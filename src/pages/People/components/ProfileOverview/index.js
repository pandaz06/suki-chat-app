import classNames from 'classnames/bind';

import styles from './ProfileOverview.module.scss';
import { UserInfo, NoData } from '~/components';

const cx = classNames.bind(styles);

function ProfileOverview({ currentID }) {
    return (
        <div className={cx('wrapper')}>
            {currentID ? (
                <>
                    <UserInfo id={currentID} small />
                </>
            ) : (
                <NoData message="Chọn 1 người dùng để xem trước trang cá nhân của họ" />
            )}
        </div>
    );
}

export default ProfileOverview;
