import {confirmOutcomming, getComposition, outcommingGet} from '../services/api';

export default {
    namespace: 'outcomming',
    state: {
        compositionData: [],
        datesOutcomming: []
    },
    effects: {
        * confirmOutcomming({ payload }, { call, put }) {
            const response = yield call(confirmOutcomming, payload);
            console.log(response);
            yield put({
                type: 'confirmOutcommingReducer',
                payload: response,
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
        * outcommingGet({ payload }, { call, put }) {
            const response = yield call(outcommingGet, payload);
            console.log(response);
            yield put({
                type: 'outcommingGetReducer',
                payload: response,
            });
        }
    },

    reducers: {
        confirmOutcommingReducer(state, action) {
            return {
                ...state
            }
        },
        getCompositionReducer(state, action) {
            return {
                ...state,
                compositionData: action.payload
            }
        },
        outcommingGetReducer(state, action) {
            return {
                ...state,
                datesOutcomming: action.payload
            }
        }

    }
}

   