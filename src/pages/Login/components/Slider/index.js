import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import styles from './Slider.module.scss';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function Slider() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <h3 className={cx('response')}>
                        "We've been using Unitiled to kick start every new project and can't imagine working without it"
                    </h3>
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('user-info')}>
                        <h1>Andi Lane</h1>
                        <p>Founder, Catalog, Web Design Agency</p>
                    </div>
                    <div className={cx('user-rate')}>
                        <div className={cx('stars')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />
                            <FontAwesomeIcon icon={faStarRegular} />
                        </div>
                        <div className={cx('toggles')}>
                            <Button
                                outline
                                onlyIcon
                                leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                                className={cx('toggle-btn')}
                            />
                            <Button
                                outline
                                onlyIcon
                                leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                className={cx('toggle-btn')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
