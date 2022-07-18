import classnames from 'classnames/bind';
import { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import logo from '~/assets/images/logos/logo-rounded.png';
import { Button } from '~/components';
import SIDEBAR_ITEMS from './sidebarConfig';
import { NotifyContext } from '~/contexts/NotifyContext';

const cx = classnames.bind(styles);

function Sidebar() {
    const { setShowNotify } = useContext(NotifyContext);
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();
    return (
        <div
            className={cx('wrapper', {
                expanded,
            })}
        >
            <Link to="/" className={cx('logo')} onClick={() => setExpanded(false)}>
                <img src={logo} alt="suki-logo" />
                {expanded && <h1>Suki</h1>}
            </Link>
            <div className={cx('item-list')}>
                <div className={cx('top-items')}>
                    <Button
                        onlyIcon={!expanded}
                        className={cx('sidebar-item')}
                        leftIcon={<FontAwesomeIcon icon={faBars} />}
                        onClick={() => setExpanded(!expanded)}
                    >
                        Menu
                    </Button>
                    {SIDEBAR_ITEMS.top.map((item, index) => (
                        <Button
                            key={index}
                            onlyIcon={!expanded}
                            to={item.path}
                            leftIcon={item.icon}
                            onClick={() => setExpanded(false)}
                            badge={
                                item.noti && (
                                    <span className={cx('badge')}>
                                        <p>{item.noti}</p>
                                    </span>
                                )
                            }
                            className={cx('sidebar-item', {
                                active: item.path === location.pathname,
                            })}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                <div className={cx('bottom-items')}>
                    <Button
                        onlyIcon={!expanded}
                        leftIcon={<FontAwesomeIcon icon={faSignOut} />}
                        className={cx('sidebar-item')}
                        onClick={() => {
                            setExpanded(false);
                            setShowNotify(true);
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </div>
            <div className={cx('cover')} onClick={() => setExpanded(false)}></div>
        </div>
    );
}

export default Sidebar;
