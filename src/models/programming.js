import { fetchProgrammingAll } from '../services/api';

export default {
    namespace: 'programming',
    state: {
        datesPrograming: []
    },
    effects: {
        * fetchProgrammingAll({ payload }, { call, put }) {
            const response = yield call(fetchProgrammingAll, payload);
            console.log(response);
            yield put({
                type: 'queryProgrammingAll',
                payload: response,
            });
        },
    },

    reducers: {
        queryProgrammingAll(state, action) {
            return {
                ...state,
                datesPrograming: action.payload.Items
            }
        },
    },
}