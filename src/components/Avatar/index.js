import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

import styles from './Avatar.module.scss';
import Button from '../Button';

const cx = classnames.bind(styles);

function Avatar({
    large = false,
    small = false,
    giant = false,
    square,
    src,
    name,
    isOnline,
    isChangable,
    to,
    className,
    ...passProps
}) {
    let Comp = 'div';
    const props = {
        className: cx('wrapper', {
            [className]: className,
            small,
            large,
            giant,
            square,
        }),
        ...passProps,
    };
    if (to) {
        Comp = Link;
        props.to = to;
    }

    const inputFileRef = useRef();
    const handleClickChange = () => {
        inputFileRef.current.click();
    };

    return (
        <Comp {...props}>
            <img src={src} alt={name} />
            {isChangable && (
                <div className={cx('change-overlay')}>
                    <Button
                        onlyIcon
                        leftIcon={<FontAwesomeIcon icon={faCamera} />}
                        className={cx('change-btn')}
                        onClick={handleClickChange}
                    />
                    <input
                        ref={inputFileRef}
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className={cx('change-input')}
                    />
                </div>
            )}
            {isOnline && <div className={cx('online-circle')}></div>}
        </Comp>
    );
}

export default Avatar;
