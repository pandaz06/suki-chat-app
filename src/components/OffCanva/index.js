import classNames from 'classnames/bind';
import { useContext } from 'react';

import styles from './OffCanva.module.scss';
import { OffCanvaContext } from '~/contexts/OffCanvaContext';

const cx = classNames.bind(styles);

function OffCanva() {
    const { setIsShowOffCanva, offCanvaContent } = useContext(OffCanvaContext);

    return (
        <div className={cx('wrapper')} onClick={() => setIsShowOffCanva(false)}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                {offCanvaContent}
            </div>
        </div>
    );
}

export default OffCanva;
