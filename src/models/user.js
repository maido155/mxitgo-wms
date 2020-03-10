import { queryCurrent, getDataUserByEmail, updateDataUser, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userByEmail: [],
    isUpdated: false
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchUserByEmail({payload}, {call, put}){
        let email = payload.payload.email;
        const response = yield call(getDataUserByEmail, {email});
        yield put({
          type: 'queryUserByEmail',
          payload: response,
        });
    },

    *updateDataUser({payload},{call, put}){
      let email = payload.payload.GET.email;
      const response = yield call(updateDataUser, payload);
      const responseDataUser = yield call(getDataUserByEmail, {email});
      yield put({
          type: 'queryDataUser',
          payload: responseDataUser,
      });
    },

    *updateValidation({payload},{call, put}){
      yield put({
        type: 'queryValidation',
        payload: {},
      });
    },
  },
  reducers: {
    queryUserByEmail(state, action){
      return{
        ...state,
        userByEmail: action.payload,
        isUpdated: false
      }
    },
    queryDataUser(state, action){
      return{
        ...state,
        userByEmail: action.payload,
        isUpdated: true
      }
    },
    queryValidation(state, action){
      return{
        ...state,
        isUpdated: false
      }
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
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
