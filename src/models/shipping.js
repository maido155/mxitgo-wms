import { saveShipping } from '../services/api';

export default {
    namespace: 'shipping',
    state: {
        warehouse: []
    },
    effects: {
        * fetchShipping({ payload }, { call, put }) {
            const response = yield call(saveShipping, payload);
            yield put({
                type: 'queryShipping',
                payload: response,
            });
        },
        * fetchWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'queryWarehouse',
                payload: payload,
            });
        },
    },

    reducers: {
        queryShipping(state, action) {
            return {
                ...state,
            }
        },
        queryWarehouse(state, action) {
            const datesWarehouse = [...state.warehouse, action.payload];
            return {
                ...state,
                warehouse: datesWarehouse
            }
        },
    },
}