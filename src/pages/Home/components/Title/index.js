import classnames from 'classnames/bind';

import styles from './Title.module.scss';
import Button from '~/components/Button';

const cx = classnames.bind(styles);

function Title({ content, subText, onSeeMore, isInvisibleBtn }) {
    return (
        <div className={cx('wrapper')}>
            {content}
            {subText && (
                <Button text className={cx('sub-text', { isInvisibleBtn })} onClick={onSeeMore}>
                    {subText}
                </Button>
            )}
        </div>
    );
}

export default Title;
