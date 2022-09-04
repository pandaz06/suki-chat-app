import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoon, faBell, faFile } from '@fortawesome/free-solid-svg-icons';

import { EditAccount, EditAppearance, EditNotifications, LegalPolicies } from './components';

const SETTING_CONFIG = [
    {
        title: 'Tài khoản',
        icon: <FontAwesomeIcon icon={faUser} />,
        content: <EditAccount />,
    },
    {
        title: 'Giao diện',
        icon: <FontAwesomeIcon icon={faMoon} />,
        content: <EditAppearance />,
    },
    {
        title: 'Thông báo',
        icon: <FontAwesomeIcon icon={faBell} />,
        content: <EditNotifications />,
    },
    {
        title: 'Điều khoản & dịch vụ',
        icon: <FontAwesomeIcon icon={faFile} />,
        content: <LegalPolicies />,
    },
];

export default SETTING_CONFIG;
