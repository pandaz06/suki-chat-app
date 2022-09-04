import className from 'classnames/bind';
import { useEffect, useRef } from 'react';

import styles from './EditItem.module.scss';
import { Toggle } from '~/components';

const cx = className.bind(styles);

function EditItem({ title, value, noText, isToggle, isEditing, isActive, onToggle, onChange, isFocus }) {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocus && isEditing) {
            inputRef.current.focus();
        }
    }, [isFocus, isEditing]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <p>{title}</p>
                {isToggle && <Toggle isActive={isActive} onToggle={onToggle} />}
            </h3>
            {!noText &&
                (isEditing ? (
                    <input value={value} onChange={onChange} ref={inputRef} />
                ) : (
                    <div className={cx('content')}>{value}</div>
                ))}
        </div>
    );
}

export default EditItem;
