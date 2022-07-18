import { EditAccount, EditNotifications, EditAppearance, EditStatus, LegalPolicies } from './components';

const SETTING_SECTIONS = {
    status: {
        title: 'Trạng thái',
        settingList: <EditStatus />,
    },
    notifications: {
        title: 'Thông báo',
        settingList: <EditNotifications />,
    },
    appearance: {
        title: 'Giao diện',
        settingList: <EditAppearance />,
    },
    account: {
        title: 'Tài khoản',
        settingList: <EditAccount />,
    },
    legalPolicies: {
        title: 'Điều khoản & Chính sách',
        settingList: <LegalPolicies />,
    },
};

export default SETTING_SECTIONS;
