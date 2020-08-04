
import {confirmOutcomming, getComposition, getOutcomming, postOutcomming,getShippingsByEntry, restartOutcomming, getOutcommingsByEntry} from '../services/api';

export default {
    namespace: 'outcomming',
    state: {        
        compositionData: [],
        datesOutcomming: [],
        shippingsByEntry: [],
        postOutcommingSuccess: false,
        restartOutcommingSuccess: false,
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
            //console.log(response);
            const responseOutcomming = yield call(getOutcomming, payload.payload);
            //console.log(responseOutcomming);

            yield put({
                type: 'postOutcommingReducer',
                payload: responseOutcomming,
            });
        },
        * restartOutcomming({ payload }, { call, put }) {
            const response = yield call(restartOutcomming, payload);
            console.log(response);
            const responseOutcomming = yield call(getOutcomming, payload);
            //console.log(responseOutcomming);
            yield put({
                type: 'restartOutcommingReducer',
                payload: responseOutcomming,
            });
        },
        * getOutcommingsByEntry({ payload }, { call, put }) {
            const response = yield call(getOutcommingsByEntry, payload);
            console.log(response);
            yield put({
                type: 'getOutcommingsByEntryReducer',
                payload: response,
            });
        },        
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
                postOutcommingSuccess: true,
                datesOutcomming: action.payload
            }
        },
        restartOutcommingReducer(state, action) {
            return {
                ...state,
                restartOutcommingSuccess: true,
                datesOutcomming: action.payload
            }
        },
        getOutcommingsByEntryReducer(state, action) {
            return {
                ...state,
                dataOutcommingsByEntry: action.payload
            }
        },        
    }
}

   