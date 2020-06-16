import {confirmOutcomming} from '../services/api';

export default {
    namespace: 'outcomming',
    state: {
    },
    effects: {
        * confirmOutcomming({ payload }, { call, put }) {
            const response = yield call(confirmOutcomming, payload);
            console.log(response);
            yield put({
                type: 'confirmOutcommingReducer',
                payload: response,
            });
        }
    },

    reducers: {
        confirmOutcommingReducer(state, action) {
            return {
                ...state
            }
        }
    }
}

   