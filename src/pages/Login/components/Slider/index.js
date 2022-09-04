import classNames from 'classnames/bind';

import styles from './Slider.module.scss';
import pandaz06 from '~/assets/images/judges/Pandaz06.jpg';

const cx = classNames.bind(styles);

const SLIDER_CONFIGS = {
    name: 'Pandaz06',
    avatar: pandaz06,
    job: 'Người sáng lập Suki',
    message: 'Tôi chỉ là một con gấu trúc với sở thích code dạo',
};

function Slider() {
    return (
        <div className={cx('wrapper')}>
            <img src={SLIDER_CONFIGS.avatar} alt={SLIDER_CONFIGS.name} className={cx('user-img')} />
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <h3 className={cx('message')}>"{SLIDER_CONFIGS.message}"</h3>
                </div>
                <div className={cx('bottom')}>
                    <h1>{SLIDER_CONFIGS.name}</h1>
                    <p>{SLIDER_CONFIGS.job}</p>
                </div>
            </div>
        </div>
    );
}

export default Slider;
