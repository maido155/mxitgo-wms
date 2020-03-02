import { queryCurrent, getDataUserByEmail, query as queryUsers } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userByEmail: []
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
  },
  reducers: {
    queryUserByEmail(state, action){
      return{
        ...state,
        userByEmail: action.payload.body.Items
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
