import {getWeekProgrammingTotals, dashboardGetMasterTotal} from '../services/api'

export default {
    namespace: 'dashboard',
    state: {

        programmingTotalPRODUCT1 : 0,
        programmingTotalPRODUCT2 : 0,

        programmingTotal: { programmingTotal: 0, new: 0, cancelled: 0, confirmed: 0 }
        

    },
    effects: {
        * getWeekProgrammingTotals({ payload }, { call, put }) {
            var response = yield call(getWeekProgrammingTotals, payload);
            
            
            response.productName = payload.product; /// response.dayName = payload.dayName   
            /// response.dayName = "Friday"
            
            
            console.log(response);
            yield put({
                type: 'getWeekProgrammingTotalsReducer',
                payload: response,
            });
        },
        * dashboardGetMasterTotal({ payload }, { call, put }) {
            const response = yield call(dashboardGetMasterTotal, payload);
            console.log(response);
            yield put({
                type: 'dashboardGetMasterTotalReducer',
                payload: response,
            });
        }

    },

    reducers: {
        getWeekProgrammingTotalsReducer(state, action) {

            var productTotal = 0;
            action.payload.Items[0].dates.forEach((oItem)=>{productTotal += oItem.caja;})

            var oNewState = {
                ...state
            };
            oNewState["programmingTotal" + action.payload.productName.replace("-", "")] = productTotal

            return oNewState;

//// state
            
        },
        dashboardGetMasterTotalReducer(state, action) {


            
            action.payload
            return {
                ...state,
                programmingTotal : action.payload
            }
        }

    }
}