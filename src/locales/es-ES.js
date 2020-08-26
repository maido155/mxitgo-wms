import component from './es-ES/component';
import globalHeader from './es-ES/globalHeader';
import menu from './es-ES/menu';
import pwa from './es-ES/pwa';
import register from './es-ES/register';
import accountSettings from './es-ES/accountSettings';
import settingDrawer from './es-Es/settingDrawer';
import settings from './es-ES/settings';
import outComming from './es-ES/outComming';
import shippingMaster from './es-ES/shippingMaster';
import dashboard from './es-ES/dashboard';
import generalProgramming from './es-ES/generalProgramming';
import usersModule from './es-ES/usersModule';
import request from './es-ES/request'

export default {
    'navBar.lang': 'Idiomas',
    'layout.user.link.help': 'Ayuda',
    'navBar.lang': 'Languajes',
    'layout.user.link.help': 'Ayuda',
    'layout.user.link.privacy': 'Privacidad',
    'layout.user.link.terms': 'Terminos',
    'app.preview.down.block': 'Descarga esta página a tu proyecto local',
    'app.welcome.link.fetch-blocks': 'Bloquear todl',
    'app.welcome.link.block-list': 'Construye páginas rápidamente basados en desarrollo de bloque',
  
    ...globalHeader,
    ...menu,
    ...settingDrawer,
    ...settings,
    ...pwa,
    ...component,
    ...register,
    ...accountSettings,
    ...outComming,
    ...shippingMaster,
    ...dashboard,
    ...generalProgramming,
    ...usersModule,
    ...request
};