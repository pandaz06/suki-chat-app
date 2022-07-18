import { routesConfigs } from '~/configs';
import { Home, Profile, Notification, Setting, Login, NoMatch } from '~/pages';
import { DefaultLayout, NoSidebarLayout } from '~/layouts';
import { SettingArea } from '~/pages/Setting/components';
import SETTING_SECTIONS from '~/pages/Setting/settingConfigs';
import { ProfileOverview } from '~/pages/Notification/components';

export const publicRoutes = [
    { path: routesConfigs.login, component: Login, layout: NoSidebarLayout },
    { path: routesConfigs.home, component: Home, layout: DefaultLayout },
    { path: routesConfigs.profile, component: Profile, layout: DefaultLayout },
    {
        path: routesConfigs.notification,
        component: Notification,
        layout: DefaultLayout,
        children: [
            {
                path: '@:nickname',
                component: ProfileOverview,
                props: {
                    username: 'heheboi',
                },
            },
            { path: routesConfigs.noMatch, component: NoMatch },
        ],
    },
    {
        path: routesConfigs.setting,
        component: Setting,
        layout: DefaultLayout,
        children: [
            {
                path: routesConfigs.status,
                component: SettingArea,
                props: {
                    title: SETTING_SECTIONS.status.title,
                    content: SETTING_SECTIONS.status.settingList,
                },
            },
            {
                path: routesConfigs.notifications,
                component: SettingArea,
                props: {
                    title: SETTING_SECTIONS.notifications.title,
                    content: SETTING_SECTIONS.notifications.settingList,
                },
            },
            {
                path: routesConfigs.appearance,
                component: SettingArea,
                props: {
                    title: SETTING_SECTIONS.appearance.title,
                    content: SETTING_SECTIONS.appearance.settingList,
                },
            },
            {
                path: routesConfigs.account,
                component: SettingArea,
                props: {
                    title: SETTING_SECTIONS.account.title,
                    content: SETTING_SECTIONS.account.settingList,
                },
            },
            {
                path: routesConfigs.legalPolicies,
                component: SettingArea,
                props: {
                    title: SETTING_SECTIONS.legalPolicies.title,
                    content: SETTING_SECTIONS.legalPolicies.settingList,
                },
            },
            { path: routesConfigs.noMatch, component: NoMatch },
        ],
    },
    { path: routesConfigs.noMatch, component: NoMatch, layout: NoSidebarLayout },
];

export const privateRoutes = [];
