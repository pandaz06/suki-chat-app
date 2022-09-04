import classnames from 'classnames/bind';
import { useContext } from 'react';

import styles from './NoSidebarLayout.module.scss';
import { ModalContext } from '~/contexts/ModalContext';
import { Modal } from '~/components';

const cx = classnames.bind(styles);

function NoSidebarLayout({ children }) {
    const { isShowModal, modalTitle, modalContent } = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            {children}
            {isShowModal && <Modal title={modalTitle} content={modalContent} />}
        </div>
    );
}

export default NoSidebarLayout;
