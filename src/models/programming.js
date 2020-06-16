import { fetchProgrammingAll, updateProgrammingStatus } from '../services/api';

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

        * updateProgrammingStatus({ payload }, { call, put }) {
            const response = yield call(updateProgrammingStatus, payload);
            console.log(response);
            yield put({
                type: 'updateProgrammingStatusReducer',
                payload: response,
            });
        }
    },

    reducers: {
        queryProgrammingAll(state, action) {
            return {
                ...state,
                datesPrograming: action.payload
            }
        },
        updateProgrammingStatusReducer(state, action) {
            return {
                ...state
            }
        }
    }
}