import{getLocations} from '../services/api';
export default {
    namespace: 'locations',
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
        * getLocations({ payload }, { call, put }) {
            const response = yield call(getLocations, payload);
            console.log(response);
            yield put({
                type: 'getLocationsReducer',
                payload: response,
            });
        },
    },
    reducers: {
        getLocationsReducer(state, action) {


            action.payload
    
            var aTreeData = [];
    
            action.payload.forEach((aLocation) => {
    
    
                var aWarehouses = [];
    
    
                aLocation[0].warehouses.forEach((oWarehouse) => {
    
                    var sValue = oWarehouse.PK.replace("WMS-", "");
    
                    aWarehouses.push({ title: oWarehouse.center, value: sValue, key: sValue });
                });
    
                aTreeData.push({ title: aLocation[0].name, value: aLocation[0].shortName, key: aLocation[0].shortName, childLevel1: aWarehouses });
    
    
            });
    
    
            return {
                ...state,
                locationTreeData: aTreeData
            }
        },
    }
}