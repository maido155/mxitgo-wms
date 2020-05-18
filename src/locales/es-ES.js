import globalHeader from './es-ES/globalHeader';
import menu from './es-ES/menu';
import register from './es-ES/register';
import accountSettings from './es-ES/accountSettings';
import outWard from './es-ES/outWard';
import shippingMaster from './es-ES/shippingMaster';
import dashboard from './es-ES/dashboard';
import generalProgramming from './es-ES/generalProgramming';

export default {
    'navBar.lang': 'Idiomas',
    'layout.user.link.help': 'Ayuda',
    ...globalHeader,
    ...menu,
    ...register,
    ...accountSettings,
    ...outWard,
    ...shippingMaster,
    ...dashboard,
    ...generalProgramming
};