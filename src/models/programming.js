
import { fetchProgrammingAll, updateProgrammingStatus, getProgramming, fetchCustomerAll, fetchProductAll, updateProgramming, postProgramming } from '../services/api';

import moment from 'moment';
moment.locale('es');

export default {
    namespace: 'programming',
    state: {
        datesPrograming: [],
        datesGetProgramming: [],
        datesCustomerAll: [],
        datesProductAll: [],
        editSuccess: false,
        showEdit: false,
        showNew: false,
        postSuccess: false
    },
    effects: {
        * fetchProgrammingAll({ payload }, { call, put }) {
            const response = yield call(fetchProgrammingAll, payload);
            console.log(response);
            yield put({
                type: 'queryProgrammingAll',
                payload: response,
            });
        },

        * updateProgrammingStatus({ payload }, { call, put }) {
            const response = yield call(updateProgrammingStatus, payload);
            console.log(response);
            yield put({
                type: 'updateProgrammingStatusReducer',
                payload: response,
            });
        },
        * getProgramming({ payload }, { call, put }) {
            const response = yield call(getProgramming, payload);
            yield put({
                type: 'queryGetProgramming',
                payload: response,
            });
        },

        * fetchCustomerAll({ payload }, { call, put }) {
            const response = yield call(fetchCustomerAll, payload);
            console.log(response);
            console.log(response);
            yield put({
                type: 'queryCustomerAll',
                payload: response,
            });
        },

        * fetchProductAll({ payload }, { call, put }) {
            const response = yield call(fetchProductAll, payload);
            console.log(response);
            console.log(response);
            yield put({
                type: 'queryProductAll',
                payload: response,
            });
        },
        * updateProgramming({ payload }, { call, put }) {
            const response = yield call(updateProgramming, payload);
            const responseGetAll = yield call(fetchProgrammingAll, payload);
            console.log(response);
            yield put({
                type: 'queryProgrammingAllEdit',
                payload: responseGetAll,
            });
        },
        * updateValidation({ payload }, { call, put }) {
            yield put({
                type: 'queryValidation',
                payload: {},
            });
        },
        * postProgramming({ payload }, { call, put }) {
            const response = yield call(postProgramming, payload);
            const responseGetAll = yield call(fetchProgrammingAll, payload);
            yield put({
                type: 'queryProgrammingAllPost',
                payload: responseGetAll,
            });
        },

    },

    reducers: {
        queryProgrammingAll(state, action) {
            return {
                ...state,
                datesPrograming: action.payload
            }
        },
        queryProgrammingAllEdit(state, action) {
            return {
                ...state,
                datesPrograming: action.payload,
                editSuccess: true
            }
        },
        queryProgrammingAllPost(state, action) {
            return {
                ...state,
                datesPrograming: action.payload,
                postSuccess: true
            }
        },
        updateProgrammingStatusReducer(state, action) {
            return {
                ...state
            }
        },
        queryGetProgramming(state, action) {
            let dates = [];
            let datesGeneral = [];
            for (var i = 0; i < action.payload[0].date.length; i++) {
                let dateConvert = action.payload[0].date[i].date;
                let nameDate = moment(dateConvert).format('dddd DD MMMM')
                dates.push({
                    date: nameDate,
                    caja: action.payload[0].date[i].caja,
                    pallet: action.payload[0].date[i].pallet,
                })
            }
            datesGeneral.push({
                customerName: action.payload[0].customerName,
                endDate: action.payload[0].endDate,
                productName: action.payload[0].productName,
                startDate: action.payload[0].startDate,
                dates: dates,
                skProduct: action.payload[0].skProduct,
                skCustomer: action.payload[0].skCustomer,
                dateIso: action.payload[0].date

            })
            return {
                ...state,
                datesGetProgramming: datesGeneral
            }
        },
        queryCustomerAll(state, action) {
            return {
                ...state,
                datesCustomerAll: action.payload.Items
            }
        },
        queryProductAll(state, action) {
            return {
                ...state,
                datesProductAll: action.payload.Items
            }
        },
        queryValidation(state, action) {
            return {
                ...state,
                editSuccess: false,
                showEdit: true
            }
        },
        queryValidationNew(state, action) {
            return {
                ...state,
                postSuccess: false,
                showNew: true
            }
        }

    }
}