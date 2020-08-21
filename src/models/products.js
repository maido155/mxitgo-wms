import{fetchProductAll} from '../services/api';
export default {
    namespace: 'products',
        state: {
            warehouses: [],
            warehouseIds: [],
            isSuccess: false,
            close: false,
            oShippingItem: { products: [], id: "" },
            products: [],
            locationTreeData: [],
            datesShipping: [],
            productsAll: [],
            operatorAll: [],
            disabledLocation: false
        },
    effects: {
        * getProducts({ payload }, { call, put }) {
            const response = yield call(fetchProductAll, payload);
            yield put({
                type: 'getProductsReducer',
                payload: response,
            });
        }
    },
    reducers: {
        getProductsReducer(state, action) {
            return {
                ...state,
                productsAll: action.payload.Items
            }
        }
    }
}