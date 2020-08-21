import { fetchOperatorAll} from '../services/api';
export default {
    namespace: 'operator',
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
        * getOperators({ payload }, { call, put }) {
        const response = yield call(fetchOperatorAll, payload);
        yield put({
            type: 'getOperatorReducer',
            payload: response,
        });
    },
},

reducers: {
    
    getOperatorReducer(state, action) {
        return {
            ...state,
            operatorAll: action.payload
        }
    },
    
   
}}