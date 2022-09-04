import classnames from 'classnames/bind';
import { useContext } from 'react';

import styles from './DefaultLayout.module.scss';
import { Modal, Sidebar, OffCanva } from '~/components';
import { ModalContext } from '~/contexts/ModalContext';
import { ThemeContext } from '~/contexts/ThemeContext';
import { OffCanvaContext } from '~/contexts/OffCanvaContext';

const cx = classnames.bind(styles);

function DefaultLayout({ children }) {
    const { dark } = useContext(ThemeContext);
    const { isShowModal, modalTitle, modalContent } = useContext(ModalContext);
    const { isShowOffCanva } = useContext(OffCanvaContext);

    return (
        <div className={cx('wrapper', `${dark ? 'dark' : ''}`)}>
            <Sidebar />
            {children}
            {isShowModal && <Modal title={modalTitle} content={modalContent} />}
            {isShowOffCanva && <OffCanva />}
        </div>
    );
}

export default DefaultLayout;
