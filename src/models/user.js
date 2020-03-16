import { queryCurrent, getDataUserByEmail, updateDataUser, saveAvatarUser, getAvatarUser, query as queryUsers } from '@/services/user';

const UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
        userByEmail: [],
        isUpdated: false,
        avatarUser: {}
    },
    effects: {
        * fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        * fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrent);
            yield put({
                type: 'saveCurrentUser',
                payload: response,
            });
        },

        * fetchUserByEmail({ payload }, { call, put }) {
            let email = payload.payload.email;
            const response = yield call(getDataUserByEmail, { email });
            yield put({
                type: 'queryUserByEmail',
                payload: response,
            });
        },

        * updateDataUser({ payload }, { call, put }) {
            let email = payload.payload.GET.email;
            const response = yield call(updateDataUser, payload);
            const responseDataUser = yield call(getDataUserByEmail, { email });
            yield put({
                type: 'queryDataUser',
                payload: responseDataUser,
            });
        },

        * updateValidation({ payload }, { call, put }) {
            yield put({
                type: 'queryValidation',
                payload: {},
            });
        },

        * fetchAvatarUser({ payload }, { call, put }) {
            let user = payload.payload.user;
            const response = yield call(getAvatarUser, { user });
            console.log(response);
            yield put({
                type: 'queryAvatarUser',
                payload: response,
            });
        },

        * saveAvatarUser({ payload }, { call, put }) {
            let user = payload.payload.GET.user;
            const response = yield call(saveAvatarUser, payload);
            const responseAvatarUser = yield call(getAvatarUser, { user });
            yield put({
                type: 'queryAvatarUser',
                payload: responseAvatarUser,
            });
        },

        *updateValidationAvatar({ payload }, { call, put }){
          console.log(payload);
          yield put({
            type: 'queryAvatarUser',
            payload: payload,
          });
        }
    },
    reducers: {
        queryUserByEmail(state, action) {
            return {
                ...state,
                userByEmail: action.payload,
                isUpdated: false
            }
        },
        queryDataUser(state, action) {
            return {
                ...state,
                userByEmail: action.payload,
                isUpdated: true
            }
        },
        queryValidation(state, action) {
            return {
                ...state,
                isUpdated: false
            }
        },
        queryAvatarUser(state, action) {
            return {
                ...state,
                avatarUser: action.payload.body.Items[0]
            }
        },
        saveCurrentUser(state, action) {
            return {...state, currentUser: action.payload || {} };
        },

        changeNotifyCount(
            state = {
                currentUser: {},
            },
            action,
        ) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount,
                },
            };
        },
    },
};
export default UserModel;