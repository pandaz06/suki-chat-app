import classnames from 'classnames/bind';
import { forwardRef, useEffect, useRef } from 'react';

import styles from './Input.module.scss';

const cx = classnames.bind(styles);

const Input = forwardRef(
    (
        {
            value,
            placeholder,
            label,
            warning,
            type = 'text',
            isFocusable,
            leftIcons,
            rightIcons,
            className,
            isFocusing,
            onChange,
            onFocus,
            ...passProps
        },
        ref,
    ) => {
        const classes = cx('wrapper', {
            isFocusable,
            [className]: className,
        });

        const inputRef = useRef();

        useEffect(() => {
            if (isFocusing) {
                inputRef.current.focus();
            }
        }, [isFocusing]);

        return (
            // Interactive tippy element may not be accessible via keyboard navigation
            // because it is not directly after the reference element in the DOM source order.
            // Using a wrapper <div> or <span> tag around the reference element solves
            // this by creating a new parentNode context.
            <div style={{ width: '100%' }}>
                <div ref={ref}>
                    {label && <label className={cx('title')}>{label}</label>}
                    <div className={classes} {...passProps}>
                        {leftIcons &&
                            leftIcons.map((icon, index) => (
                                <span key={index} className={cx('icon')}>
                                    {icon}
                                </span>
                            ))}
                        <input
                            className={cx('inner')}
                            placeholder={placeholder}
                            type={type}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            ref={inputRef}
                        />
                        {rightIcons &&
                            rightIcons.map((icon, index) => (
                                <span key={index} className={cx('icon')}>
                                    {icon}
                                </span>
                            ))}
                    </div>
                    {warning && <div className={cx('warning')}>{warning}</div>}
                </div>
            </div>
        );
    },
);

export default Input;
