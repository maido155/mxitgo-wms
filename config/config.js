import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
// const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
// const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
    [
        'umi-plugin-react',
        {
            antd: true,
            dva: {
                hmr: true,
            },
            locale: {
                // default false
                enable: true,
                // default zh-CN
                default: 'es-ES',
                // default true, when it is true, will use `navigator.language` overwrite default
                // baseNavigator: true,
            },
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
                webpackChunkName: true,
                level: 3,
            },
            pwa: pwa ? {
                workboxPluginMode: 'InjectManifest',
                workboxOptions: {
                    importWorkboxFrom: 'local',
                },
            } : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
            // dll features https://webpack.js.org/plugins/dll-plugin/
            // dll: {
            //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
            //   exclude: ['@babel/runtime', 'netlify-lambda'],
            // },
        },
    ],
    [
        'umi-plugin-pro-block',
        {
            moveMock: false,
            moveService: false,
            modifyRequest: true,
            autoAddMenu: true,
        },
    ],
];

// if (isAntDesignProPreview) {
//     // 针对 preview.pro.ant.design 的 GA 统计代码
//     plugins.push([
//         'umi-plugin-ga',
//         {
//             code: 'UA-72788897-6',
//         },
//     ]);
//     plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
// }

export default {
    plugins,
    hash: true,
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/zh/guide/router.html
    routes: [{
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [{
                    name: 'login',
                    path: '/user/login',
                    component: './user/login',
                },
                {
                    name: 'register',
                    icon: 'smile',
                    path: '/user/register',
                    component: './user/register',
                },
            ],
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [{
                    path: '/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [{
                            path: '/',
                            redirect: '/user/login',
                        },
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            icon: 'dashboard',
                            component: './Dashboard/Dashboard',
                        },
                        {
                            path: '/generalProgramming',
                            name: 'Programación General',
                            icon: 'control',
                            component: './generalProgramming/generalProgramming',
                        },
                        {
                            path: '/shippingMaster',
                            name: 'Maestro de envíos',
                            icon: 'export',
                            component: './shipping/ShippingMaster',
                        },
                        {
                            path: '/outgoing',
                            name: 'Salidas',
                            icon: 'import',
                            component: './outcomming/OutComming',
                        },


                        {
                            path: '/SettingsUser',
                            name: 'Configuración',
                            icon: 'setting',
                            routes: [{
                                path: './UsersModule/UsersLayout',
                                name: 'Usuarios',
                                icon: 'user',
                                component: './UsersModule/UsersLayout'
                            }]
                        },

                        {
                            path: '/settings',
                            component: './account/AccountSettings'
                        },
                        // {
                        //     path: '/admin',
                        //     name: 'admin',
                        //     icon: 'crown',
                        //     component: './Admin',
                        //     authority: ['admin'],
                        // },
                        {
                            component: './404',
                        },
                    ],
                },
                {
                    component: './404',
                },
            ],
        },
        {
            component: './404',
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        "primary-color": "#64A9DD",
        // ...darkTheme,
        // 'menu-dark-color':'#244999',
        // 'menu-dark-submenu-bg': '#244999'
        /*'layout-sider-background': '#244999'  */
    },
    define: {
        // ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '',
        // ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: '',
        // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
        ANT_DESIGN_PRO_TARGET: ' https://yykyzygfwe.execute-api.us-east-1.amazonaws.com/Stage',
        ANT_CURRENT_HOST: "https://master.d33oxsmkbrwh67.amplifyapp.com",
        // ANT_DESIGN_PRO_TARGET: 'https://9j8ucg1yhj.execute-api.us-east-1.amazonaws.com/desarrollo'
        ANT_DESIGN_PRO_USER_POOL_ID: 'us-east-1_9WJ8uxbk9',
        ANT_DESIGN_PRO_CLIENT_ID: '66vntbnp4mpgn1o1p50pqd43kl',
        API_KEY:'qvWmpGYLQl6KNPdJqz40SavJ7EjyFPqy8CG4rz71'
        // ANT_DESIGN_PRO_TARGET: '/api',
    },
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    disableRedirectHoist: true,
    cssLoaderOptions: {
        modules: true,
        getLocalIdent: (context, _, localName) => {
            if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('ant.design.pro.less') ||
                context.resourcePath.includes('global.less')
            ) {
                return localName;
            }

            const match = context.resourcePath.match(/src(.*)/);

            if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = slash(antdProPath)
                    .split('/')
                    .map(a => a.replace(/([A-Z])/g, '-$1'))
                    .map(a => a.toLowerCase());
                return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
            }

            return localName;
        },
    },
    manifest: {
        basePath: '/',
    },
    // chainWebpack: webpackPlugin,
    proxy: {
        '/api/': {
            target: process.env.TARGET,
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        },
    },
};