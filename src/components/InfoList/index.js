import classnames from 'classnames/bind';

import styles from './InfoList.module.scss';
import InfoItem from './InfoItem';
import ContactList from './ContactList';
import { FriendList } from '~/components';

const cx = classnames.bind(styles);

function InfoList({ username, small }) {
    const jsx = username ? (
        <div className={cx('wrapper', { small })}>
            <div className={cx('left-items')}>
                <InfoItem label="Ngày sinh" content="10/02/2006" />
                <InfoItem
                    label="Tiểu sử"
                    content="Gia nhập Suki từ ngày 23/08/2022 - một thành viên của các tổ chức Illuminanties, Avengers, TVA, Shield. Ông hoàng tài chính, chúa tể code dạo, chuyên gia tỉa nến, fan cứng anh Ma Gêm minh, anh Nờ tờ nờ"
                />
            </div>
            <div className={cx('mid-items')}>
                <InfoItem label="Bạn bè" content={<FriendList />} />
            </div>
            <div className={cx('right-items')}>
                <InfoItem label="Liên lạc với tôi" content={<ContactList />} />
            </div>
        </div>
    ) : (
        <div className={cx('fallback-info')}>Chọn một người dùng để xem trước trang cá nhân của họ</div>
    );

    return jsx;
}

export default InfoList;
