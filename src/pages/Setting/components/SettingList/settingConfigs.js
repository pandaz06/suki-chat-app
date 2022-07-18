import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faMoon, faFile } from '@fortawesome/free-solid-svg-icons';

import { routesConfigs } from '~/configs';

const SETTING_ITEMS = {
    preferences: [
        {
            title: 'Trạng thái',
            icon: <FontAwesomeIcon icon={faUser} />,
            path: routesConfigs.status,
        },
        {
            title: 'Thông báo',
            icon: <FontAwesomeIcon icon={faBell} />,
            path: routesConfigs.notifications,
        },
        {
            title: 'Giao diện',
            icon: <FontAwesomeIcon icon={faMoon} />,
            path: routesConfigs.appearance,
        },
    ],
    support: [
        {
            title: 'Tài khoản',
            icon: <FontAwesomeIcon icon={faUser} />,
            path: routesConfigs.account,
        },
        {
            title: 'Điều khoản & Chính sách',
            icon: <FontAwesomeIcon icon={faFile} />,
            path: routesConfigs.legalPolicies,
        },
    ],
};

export default SETTING_ITEMS;
