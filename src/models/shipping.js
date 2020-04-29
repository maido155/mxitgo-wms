import { saveShipping } from '../services/api';

export default {
    namespace: 'shipping',
    state: {
        warehouse: [],
        isSuccess: false,
        close: false
    },
    effects: {
        * saveShipping({ payload }, { call, put }) {
            const response = yield call(saveShipping, payload);
            yield put({
                type: 'queryShipping',
                payload: response,
            });
        },
        * saveWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'queryWarehouse',
                payload: payload,
            });
        },
        * changedSuccess({ payload }, { call, put }) {
            yield put({
                type: 'queryChangedSuccess',
                payload: payload,
            });
        },
        * changedClose({ payload }, { call, put }) {
            yield put({
                type: 'queryChangedClose',
                payload: payload,
            });
        },
    },

    reducers: {
        queryShipping(state, action) {
            return {
                ...state,
                isSuccess: true
            }
        },
        queryWarehouse(state, action) {
            const datesWarehouse = [...state.warehouse, action.payload];
            return {
                ...state,
                warehouse: datesWarehouse
            }
        },
        queryChangedSuccess(state, action) {
            return {
                isSuccess: false,
                warehouse: [],
                close: true
            }
        },
        queryChangedClose(state, action) {
            return {
                close: false
            }
        }
    },
}