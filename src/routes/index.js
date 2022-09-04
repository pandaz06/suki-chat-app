import { routesConfigs } from '~/configs';
import { Home, Profile, People, Setting, Login, NoMatch } from '~/pages';
import { DefaultLayout, NoSidebarLayout } from '~/layouts';

export const publicRoutes = [
    { path: routesConfigs.login, component: Login, layout: NoSidebarLayout },
    { path: routesConfigs.home, component: Home, layout: DefaultLayout },
    { path: routesConfigs.profile, component: Profile, layout: DefaultLayout },
    { path: routesConfigs.notification, component: People, layout: DefaultLayout },
    { path: routesConfigs.setting, component: Setting, layout: DefaultLayout },
    { path: routesConfigs.noMatch, component: NoMatch, layout: NoSidebarLayout },
];

export const privateRoutes = [];
