import classnames from 'classnames/bind';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './CreateGroupArea.module.scss';
import { Button, Input } from '~/components';
import MemberItem from './MemberItem';
import { ModalContext } from '~/contexts/ModalContext';

const cx = classnames.bind(styles);

function CreateGroupArea() {
    const { setIsShowModal } = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <Input isFocusable label="Group Name" placeholder="Enter group name" className={cx('info-input')} />
                    <Input
                        isFocusable
                        label="Group Status"
                        placeholder="Enter group status"
                        className={cx('info-input')}
                    />
                </div>
                <div className={cx('members')}>
                    <h3 className={cx('title')}>Members</h3>
                    <Input
                        isFocusable
                        leftIcons={[<FontAwesomeIcon icon={faMagnifyingGlass} />]}
                        placeholder="Search people"
                        className={cx('info-input')}
                    />
                    <div className={cx('list')}>
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                    </div>
                </div>
            </div>
            <div className={cx('toggles')}>
                <Button className={cx('toggle-btn')} outline onClick={() => setIsShowModal(false)}>
                    Cancel
                </Button>
                <Button className={cx('toggle-btn')} primary>
                    Create
                </Button>
            </div>
        </div>
    );
}

export default CreateGroupArea;
