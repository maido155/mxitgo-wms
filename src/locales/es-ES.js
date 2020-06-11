import globalHeader from './es-ES/globalHeader';
import menu from './es-ES/menu';
import register from './es-ES/register';
import accountSettings from './es-ES/accountSettings';
import outComming from './es-ES/outComming';
import shippingMaster from './es-ES/shippingMaster';
import dashboard from './es-ES/dashboard';
import generalProgramming from './es-ES/generalProgramming';
import usersModule from './es-ES/usersModule';

export default {
    'navBar.lang': 'Idiomas',
    'layout.user.link.help': 'Ayuda',
    ...globalHeader,
    ...menu,
    ...register,
    ...accountSettings,
    ...outComming,
    ...shippingMaster,
    ...dashboard,
    ...generalProgramming,
    ...usersModule
};