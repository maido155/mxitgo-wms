import {getAllDashboardDatesPerDay} from '../services/api';

export default {
    namespace: 'dashboard',
    state: {

        currentSelectedDate: "",
        currentSelectedProduct: "",
        allDates:[]

    },
    effects: {
        * getAllDatesPerDay({ payload }, { call, put }) {
            
            const response = yield call(getAllDashboardDatesPerDay, payload);
            
            response.dayName = payload.nameDay;
            console.log(response);
            console.log(response);
            yield put({
                type: 'getAllDashboardDates',
                payload: response,
            });
        }
    
        
    },

    reducers: {
        getAllDashboardDates(state, action) {
            const allDates = [...state.allDates, action.payload];
           
            return {
                ...state,
                dashboardDates:allDates,
            }
        }
    }
}