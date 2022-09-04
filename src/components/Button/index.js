import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    target,
    rel,
    primary = false,
    outline = false,
    text = false,
    onlyIcon = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    listStyle = false,
    children,
    leftIcon,
    rightIcon,
    badge,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listeners when button is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
        props.target = target;
        props.rel = rel;
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        'only-icon': onlyIcon,
        rounded,
        disabled,
        small,
        large,
        listStyle,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            {badge}
        </Comp>
    );
}

export default Button;
