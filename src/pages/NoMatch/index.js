import className from 'classnames/bind';

import styles from './NoMatch.module.scss';
import { Button } from '~/components';
import { routesConfigs } from '~/configs';
import noMatch from '~/assets/images/no-match/no-match.jpg';

const cx = className.bind(styles);

function NoMatch() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('message')}>Địa chỉ không hợp lệ</div>
            <img className={cx('no-match-img')} src={noMatch} alt="No Match" />
            <Button outline to={routesConfigs.home} className={cx('back-home-btn')}>
                Về trang chủ
            </Button>
        </div>
    );
}

export default NoMatch;
