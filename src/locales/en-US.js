import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import register from './en-US/register';
import accountSettings from './en-US/accountSettings';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import outComming from './en-US/outComming';
import request from './en-US/request';
import shippingMaster from './en-US/shippingMaster';
import dashboard from './en-US/dashboard';
import usersModule from './en-US/usersModule';
import generalProgramming from './en-US/generalProgramming';
export default {
    'navBar.lang': 'Languages',
    'layout.user.link.help': 'Help',
    'layout.user.link.privacy': 'Privacy',
    'layout.user.link.terms': 'Terms',
    'app.preview.down.block': 'Download this page to your local project',
    'app.welcome.link.fetch-blocks': 'Get all block',
    'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
    ...globalHeader,
    ...menu,
    ...settingDrawer,
    ...settings,
    ...pwa,
    ...component,
    ...register,
    ...request,
    ...accountSettings,
    ...outComming,
    ...shippingMaster,
    ...dashboard,
    ...generalProgramming,
    ...usersModule
};
