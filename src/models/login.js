import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha, getDataUserByEmail } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
    namespace: 'login',
    state: {
        status: undefined,
    },
    effects: {

        * login({ payload }, { call, put }) {
            let email = payload;
            const response = yield call(getDataUserByEmail, email);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            }); // Login successfully
            console.log("***RESPONSE");
            console.log(response);

            if (response) {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;

                // if (redirect) {
                //   const redirectUrlParams = new URL(redirect);

                //   if (redirectUrlParams.origin === urlParams.origin) {
                //     redirect = redirect.substr(urlParams.origin.length);

                //     if (redirect.match(/^\/.*#/)) {
                //       redirect = redirect.substr(redirect.indexOf('#') + 1);
                //     }
                //   } else {
                //     window.location.href = redirect;
                //     return;
                //   }
                // }
                // yield delay(3000);
                //yield put(routerRedux.replace( '/'));
                //yield put(routerRedux.push('/welcome'));


                localStorage.setItem('userId', response.sub);
                localStorage.setItem('emailVerified', response.email_verified);
                localStorage.setItem('userName', response.name);
                localStorage.setItem('phoneNumberVerified', response.phone_number_verified);
                localStorage.setItem('phoneNumber', response.phone_number);
                localStorage.setItem('middleName', response.middle_name);
                localStorage.setItem('familyName', response.family_name);
                localStorage.setItem('email', response.email);

                window.location.href = '/dashboard';
            }

        },

        * getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload);
        },

        logout() {
            const { redirect } = getPageQuery(); // Note: There may be security issues, please note

            if (window.location.pathname !== '/user/login' && !redirect) {
                router.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.custom_currentAuthority);
            return {...state, status: payload.status, type: payload.type };
        },
    },
};
export default Model;