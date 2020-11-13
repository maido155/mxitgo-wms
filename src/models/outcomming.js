import { confirmOutcomming, getComposition, getOutcomming, postOutcomming, getShippingsByEntry, restartOutcomming, getOutcommingsByEntr, fetchProductAll, fetchCustomerAll, getOutcommingsByEntry } from '../services/api';

export default {
    namespace: 'outcomming',
    state: {
        compositionData: [],
        datesOutcomming: [],
        shippingsByEntry: [],
        postOutcommingSuccess: false,
        restartOutcommingSuccess: false,
        datesCustomerAll: [],
        datesProductAll: [],
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
        *outcommingRemove({payload},{call,put}){
            yield put({
                type: 'outcommingReducerRemove',
                payload: payload
            })
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

            const responseOCvsSH = yield call(getOutcommingsByEntry, payload);
            console.log(responseOCvsSH);
            yield put({
                type: 'getOutcommingsByEntryReducer',
                payload: responseOCvsSH,
            });
        },
        * restartOutcomming({ payload }, { call, put }) {

            const response = yield call(restartOutcomming, payload.payload);
            console.log(response);

            yield put({
                type: 'restartOutcommingReducer',
                payload: response,
            });

            const responseOutcomming = yield call(getOutcomming, payload.payload);
            console.log(responseOutcomming);
            yield put({
                type: 'getOutcommingReducer',
                payload: responseOutcomming,
            });

            const responseOCvsSH = yield call(getOutcommingsByEntry, payload);
            console.log(responseOCvsSH);
            yield put({
                type: 'getOutcommingsByEntryReducer',
                payload: responseOCvsSH,
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
        * fetchProductAll({ payload }, { call, put }) {
            const responseProduct = yield call(fetchProductAll, payload);
            let typeProduct = responseProduct.Items.filter(function(data) {
                return data.type == payload.payload.type
            })
            yield put({
                type: 'queryProductAll',
                payload: typeProduct,
            });
            const responseCus = yield call(fetchCustomerAll, payload);
            yield put({
                type: 'queryCustomerAll',
                payload: responseCus,
            });
        }
    },

    reducers: {
        queryCustomerAll(state, action) {
            return {
                ...state,
                datesCustomerAll: action.payload.Items
            }
        },
        queryProductAll(state, action) {
            return {
                ...state,
                datesProductAll: action.payload
            }
        },
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
               // datesOutcomming: []
            }
        },
        restartOutcommingReducer(state, action) {
            return {
                ...state,
                restartOutcommingSuccess: true,
               // datesOutcomming: []
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

   