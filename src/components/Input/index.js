import classnames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classnames.bind(styles);

function Input({ placeholder, label, type = 'text', isFocusable, leftIcons, rightIcons, className, ...passProps }) {
    const classes = cx('wrapper', {
        isFocusable,
        [className]: className,
    });
    return (
        <>
            {label && <label className={cx('title')}>{label}</label>}
            <div className={classes} {...passProps}>
                {leftIcons &&
                    leftIcons.map((icon, index) => (
                        <span key={index} className={cx('icon')}>
                            {icon}
                        </span>
                    ))}
                <input className={cx('inner')} placeholder={placeholder} type={type} />
                {rightIcons &&
                    rightIcons.map((icon, index) => (
                        <span key={index} className={cx('icon')}>
                            {icon}
                        </span>
                    ))}
            </div>
        </>
    );
}

export default Input;
