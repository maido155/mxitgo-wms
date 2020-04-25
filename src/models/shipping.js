import { saveShipping } from '@/services/user';

const ShipModel = {
    namespace: 'shipping',
    state: {
        warehouse: []
    },
    effects: {
        * saveShipping({ payload }, { call, put }) {
            const response = yield call(saveShipping, payload);
            yield put({
                type: 'querySaveShipping',
                payload: response,
            });
        },
        * saveWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'querySaveWarehouse',
                payload: payload,
            });
        },
    },
    reducers: {
        querySaveWarehouse(state, action) {
            const datesWarehouse = [...state.warehouse, action.payload];
            return {
                ...state,
                warehouse: datesWarehouse
            }
        },
        querySaveShipping(state, action) {
            return {
                ...state,
            }
        },
    }
};
export default ShipModel;