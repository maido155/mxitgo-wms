import { customerGet } from '../services/api';

export default {
    namespace: 'customer',
    state: {},
    effects: {
        * customerGet({ payload }, { call, put }) {
            const response = yield call(customerGet, payload);
            yield put({
                type: 'customerGetReducer',
                payload: response,
            });
        }
    },

    reducers: {
        customerGetReducer(state, action) {
            return {
                ...state
            }
        }

    }
}