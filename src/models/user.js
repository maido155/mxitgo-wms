import { queryCurrent, getDataUserByEmail, updateDataUser, saveAvatarUser, getAvatarUser, getAllUser, saveNewUser, getDataUser, deleteNewUser, query as queryUsers } from '@/services/user';

const UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
        userByEmail: [],
        dataUser: [],
        isUpdated: false,
        avatarUser: {},
        allUsers: [],
        saveUser: false,
        closeUser: false,
        updateUser: false
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
            let email = payload.payload;
            const response = yield call(getDataUserByEmail, { email });
            yield put({
                type: 'queryUserByEmail',
                payload: response,
            });
        },
        * fetchUser({ payload }, { call, put }) {
            let email = payload.payload;
            const response = yield call(getDataUser, { email });
            yield put({
                type: 'queryUser',
                payload: response,
            });
        },
        * cleanUser({ payload }, { call, put }) {
            yield put({
                type: 'querycleanUser',
                payload: {},
            });
        },
        * updateDataUser({ payload }, { call, put }) {
            let email = payload.payload.GET;
            const response = yield call(updateDataUser, payload);
            const responseDataUser = yield call(getDataUserByEmail, { email });
            yield put({
                type: 'queryDataUser',
                payload: responseDataUser,
            });
        },
        * updateNewUser({ payload }, { call, put }) {
            const response = yield call(updateDataUser, payload);
            yield put({
                type: 'queryUpdateNewUser',
                payload: response
            })
            const responseGet = yield call(getAllUser, { payload });
            yield put({
                type: 'queryAllUsers',
                payload: responseGet
            })
        },
        * updateValidation({ payload }, { call, put }) {
            yield put({
                type: 'queryValidation',
                payload: {},
            });
        },
        * fetchAvatarUser({ payload }, { call, put }) {
            let user = payload.payload;
            const response = yield call(getAvatarUser, { user });
            yield put({
                type: 'queryAvatarUser',
                payload: response,
            });
        },
        * saveAvatarUser({ payload }, { call, put }) {
            let user = payload.payload.GET;
            const response = yield call(saveAvatarUser, payload);
            const responseAvatarUser = yield call(getAvatarUser, { user });
            yield put({
                type: 'queryAvatarUser',
                payload: responseAvatarUser,
            });
        },
        * updateValidationAvatar({ payload }, { call, put }) {
            console.log(payload);
            yield put({
                type: 'queryAvatarUser',
                payload: payload,
            });
        },
        * fetchAllUsers({ payload }, { call, put }) {
            const response = yield call(getAllUser, { payload });
            yield put({
                type: 'queryAllUsers',
                payload: response
            })
        },
        * saveNewUser({ payload }, { call, put }) {
            const responsePost = yield call(saveNewUser, payload);
            yield put({
                type: 'queryAllUsersSuccess',
                payload: response
            })
            const response = yield call(getAllUser, { payload });
            yield put({
                type: 'queryAllUsers',
                payload: response
            })
        },
        * changedSuccessUser({ payload }, { call, put }) {
            yield put({
                type: 'querychangedSuccessUser',
                payload: {}
            })
        },
        * changedClosedUser({ payload }, { call, put }) {
            yield put({
                type: 'querychangedClosedUser',
                payload: {}
            })
        },
        * deleteNewUser({ payload }, { call, put }) {
            const responseDelete = yield call(deleteNewUser, payload);
            const response = yield call(getAllUser, { payload });
            yield put({
                type: 'queryAllUsers',
                payload: response
            })
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
        queryUser(state, action) {
            return {
                ...state,
                dataUser: action.payload,
            }
        },
        querycleanUser(state, action) {
            return {
                ...state,
                dataUser: [],
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
                avatarUser: action.payload.Items[0]
            }
        },
        saveCurrentUser(state, action) {
            return {...state, currentUser: action.payload || {} };
        },
        queryAllUsers(state, action) {
            return {
                ...state,
                allUsers: action.payload,
            }
        },
        queryAllUsersSuccess(state, action) {
            return {
                ...state,
                saveUser: true
            }
        },
        querychangedSuccessUser(state, action) {
            return {
                ...state,
                saveUser: false,
                closeUser: true,
                updateUser: false
            }
        },
        queryUpdateNewUser(state, action) {
            return {
                ...state,
                updateUser: true
            }
        },
        querychangedClosedUser(state, action) {
            return {
                ...state,
                closeUser: false
            }
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