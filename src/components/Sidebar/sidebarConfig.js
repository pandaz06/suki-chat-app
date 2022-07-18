import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser, faGear, faBell } from '@fortawesome/free-solid-svg-icons';

import { routesConfigs } from '~/configs';

const SIDEBAR_ITEMS = {
    top: [
        {
            title: 'Tin nhắn',
            noti: '99+',
            path: routesConfigs.home,
            icon: <FontAwesomeIcon icon={faMessage} />,
        },
        {
            title: 'Hồ sơ',
            path: routesConfigs.profile,
            icon: <FontAwesomeIcon icon={faUser} />,
        },
        {
            title: 'Thông báo',
            noti: '23',
            path: routesConfigs.notification,
            icon: <FontAwesomeIcon icon={faBell} />,
        },
        {
            title: 'Cài đặt',
            path: routesConfigs.setting + '/' + routesConfigs.status,
            icon: <FontAwesomeIcon icon={faGear} />,
        },
    ],
};

export default SIDEBAR_ITEMS;
