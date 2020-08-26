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
        postSuccess: false,
        palletsEdit: [],
        boxesEdit: []
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
            const responseGetAllCancell = yield call(fetchProgrammingAll, payload);
            yield put({
                type: 'queryProgrammingAll',
                payload: responseGetAllCancell,
            });
        },
        * getProgramming({ payload }, { call, put }) {
            const response = yield call(getProgramming, payload);
            yield put({
                type: 'queryGetProgrammingEdit',
                payload: response,
            });
            yield put({
                type: 'queryGetProgramming',
                payload: response,
            });
        },
        * fetchProductAll({ payload }, { call, put }) {
            const response = yield call(fetchProductAll, payload);
            let typeProduct = response.Items.filter(function(data) {
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
        * updateValidationNew({ payload }, { call, put }) {
            yield put({
                type: 'queryValidationNew',
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
        queryGetProgramming(state, action) {
            let dates = [];
            let datesGeneral = [];
            for (var i = 0; i < action.payload[0].date.length; i++) {
                let dateConvert = action.payload[0].date[i].date;
                let nameDate = moment(dateConvert).format('dddd DD MMMM')
                dates.push({
                    date: nameDate,
                    box: action.payload[0].date[i].box,
                    pallet: action.payload[0].date[i].pallet,
                })
            }
            var pallet = [];
            var boxes = [];
            var sumPallet = 0;
            var sumBoxes = 0;
            for (var k = 0; k < action.payload[0].date.length; k++) {
                pallet.push(action.payload[0].date[k].pallet);
                boxes.push(action.payload[0].date[k].box);
            }
            pallet.forEach(function(numero) {
                sumPallet += numero;
            });
            boxes.forEach(function(numero) {
                sumBoxes += numero;
            });
            datesGeneral.push({
                customerName: action.payload[0].customerName,
                endDate: action.payload[0].endDate,
                productName: action.payload[0].productName,
                startDate: action.payload[0].startDate,
                dates: dates,
                skProduct: action.payload[0].skProduct,
                skCustomer: action.payload[0].skCustomer,
                dateIso: action.payload[0].date,
                boxes: sumBoxes,
                pallets: sumPallet
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
                datesProductAll: action.payload
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
            }
        },
        queryGetProgrammingEdit(state, action) {
            let products = action.payload[0].date;
            let pallets = [];
            let boxes = [];
            for (var i = 0; i < products.length; i++) {
                pallets.push(products[i].pallet);
                boxes.push(products[i].box);
            }
            return {
                ...state,
                palletsEdit: pallets,
                boxesEdit: boxes
            }
        }

    }
}