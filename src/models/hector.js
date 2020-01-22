
import {
    getRestaurants,
   
} from '../services/api';

export default {
    namespace: 'hector',

    state: {
        restaurants: [],
       

    },

    effects: {

        *fetchRestaurants({ payload }, { call, put }) {
            const response = yield call(getRestaurants, payload);
            yield put({
                type: 'queryrestaurants',
                payload: response,
            });
        },


    },

    reducers: {
        ueryrestaurants(state, action) {

            console.log(action.payload);

            return {
                ...state,
                restaurants: action.payload
            };
        },
      
    },
};


