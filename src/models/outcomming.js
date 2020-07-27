
import {confirmOutcomming, getComposition, getOutcomming, postOutcomming,getShippingsByEntry} from '../services/api';

export default {
    namespace: 'outcomming',
    state: {        
        compositionData: [],
        datesOutcomming: [],
        shippingsByEntry: [],
        postOutcommingSuccess: false
    },
    effects: {
        * confirmOutcomming({ payload }, { call, put }) {
            const response = yield call(confirmOutcomming, payload);
            console.log(response);

            //const responseGetAll = yield call(fetchProgrammingAll, payload);
            const responseGetOutComming = yield call(getOutcomming, payload);

            yield put({
                type: 'confirmOutcommingReducer',
                payload: responseGetOutComming,
            });
        },
        * getComposition({ payload }, { call, put }) {
            const response = yield call(getComposition, payload);
            console.log(response);
            yield put({
                type: 'getCompositionReducer',
                payload: response,
            });
        },
        * getOutcomming({ payload }, { call, put }) {
            const response = yield call(getOutcomming, payload);
            console.log(response);
            yield put({
                type: 'getOutcommingReducer',
                payload: response,
            });
        },
        * getShippingsByEntry({ payload }, { call, put }) {
            const response = yield call(getShippingsByEntry, payload);
            console.log(response);
            yield put({
                type: 'getShippingsByEntryReducer',
                payload: response,
            });
        },
        * postOutcomming({ payload }, { call, put }) {
            const response = yield call(postOutcomming, payload);
            console.log(response);
            yield put({
                type: 'postOutcommingReducer',
                payload: response,
            });
        }
    },

    reducers: {
        confirmOutcommingReducer(state, action) {
            return {
                ...state,
                datesOutcomming: action.payload
            }
        },
        getCompositionReducer(state, action) {
            return {
                ...state,
                compositionData: action.payload
            }
        },
        getOutcommingReducer(state, action) {
            return {
                ...state,
                datesOutcomming: action.payload
            }
        },
        getShippingsByEntryReducer(state, action) {
            return {
                ...state,
                datesOutcomming: action.payload
        	}
        },
        postOutcommingReducer(state, action) {
            return {
                ...state,
                postOutcommingSuccess: true
            }
        }
    }
}

   