import { fetchProgrammingAll, updateProgrammingStatus, getProgramming } from '../services/api';
import moment from 'moment';

export default {
    namespace: 'programming',
    state: {
        datesPrograming: [],
        datesGetProgramming: []
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
        }
    },

    reducers: {
        queryProgrammingAll(state, action) {
            return {
                ...state,
                datesPrograming: action.payload
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
                dates: dates
            })
            return {
                ...state,
                datesGetProgramming: datesGeneral
            }
        }
    }
}