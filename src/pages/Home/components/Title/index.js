import classnames from 'classnames/bind';

import styles from './Title.module.scss';
import Button from '~/components/Button';

const cx = classnames.bind(styles);

function Title({ underlineSubText = true, content, subText, onSeeMore, isInvisibleBtn, isLoading }) {
    return (
        <div className={cx('wrapper')}>
            {content}
            {subText &&
                (isLoading ? (
                    <div className={cx('loading-sub-text')} />
                ) : (
                    <Button text={underlineSubText} className={cx('sub-text', { isInvisibleBtn })} onClick={onSeeMore}>
                        {subText}
                    </Button>
                ))}
        </div>
    );
}

export default Title;
