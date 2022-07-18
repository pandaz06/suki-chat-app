import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './EditItem.module.scss';
import { Button, Toggle } from '~/components';

const cx = className.bind(styles);

function EditItem({ title, content, isToggle, isEditable, isActive, onToggle }) {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                <p>{title}</p>
                {isToggle ? <Toggle isActive={isActive} onToggle={onToggle} /> : null}
                {isEditable ? (
                    <Button
                        onlyIcon
                        leftIcon={<FontAwesomeIcon icon={isEdit ? faCheck : faPen} />}
                        className={cx('edit-btn')}
                        onClick={() => {
                            setIsEdit(!isEdit);
                        }}
                    />
                ) : null}
            </h3>
            {content && <div className={cx('content')}>{isEdit ? <textarea /> : content}</div>}
        </div>
    );
}

export default EditItem;
