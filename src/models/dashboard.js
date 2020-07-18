import { getWeekProgrammingTotals, dashboardGetMasterTotal, getDay } from '../services/api'

export default {
    namespace: 'dashboard',
    state: {

        programmingTotalPRODUCT1: 0,
        programmingTotalPRODUCT2: 0,

        programmingTotal: { programmingTotal: 0, new: 0, cancelled: 0, confirmed: 0 },
        Monday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        },
        Tuesday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        },
        Wednesday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        },
        Thursday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        },
        Friday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        },
        Saturday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        },
        Sunday: {
            programmed: 0,
            planned: 0,
            confirmed: 0,
            cancelled: 0,
            plannedPercentage: 0,
            confirmedPercentage: 0
        }


    },
    effects: {
        * getWeekProgrammingTotals({ payload }, { call, put }) {


            console.log("getWeekProgrammingTotals: " + JSON.stringify(payload));

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

            console.log("dashboardGetMasterTotal: " + JSON.stringify(payload));

            console.log(JSON.stringify(payload));
            const response = yield call(dashboardGetMasterTotal, payload);
            console.log(response);
            yield put({
                type: 'dashboardGetMasterTotalReducer',
                payload: response,
            });
        },
        * getDay({ payload }, { call, put }) {
            
            var response = yield call(getDay, payload);

            console.log("Day:" + JSON.stringify(payload));
            
            response.dayName = payload.dayName;

            console.log(response);
            yield put({
                type: 'getDayReducer',
                payload: response,
            });
        }

    },

    reducers: {
        getWeekProgrammingTotalsReducer(state, action) {

            console.log("getWeekProgrammingTotalsReducer: " + JSON.stringify(action.payload));



            var productTotal = 0;

            if (action.payload.Items && action.payload.Items.length > 0) {

                action.payload.Items[0].dates.forEach((oItem) => { productTotal += oItem.caja; })

            }

            var oNewState = {
                ...state
            };


            oNewState["programmingTotal" + action.payload.productName.replace("-", "")] = productTotal

            return oNewState;

            //// state

        },
        dashboardGetMasterTotalReducer(state, action) {

            console.log("dashboardGetMasterTotalReducer: " + JSON.stringify(action.payload));



            action.payload
            return {
                ...state,
                programmingTotal: action.payload
            }
        },
        getDayReducer(state, action) {

            console.log("getDayReducer:" + JSON.stringify(action.payload));

            var oNewState = {
                ...state

            };

            var programmed = action.payload.programmed["pro" + action.payload.dayName];
            var confirmed = action.payload.programmedDay.confirmed;
            var planned = action.payload.programmedDay.planned;
            var cancelled = action.payload.programmedDay.cancelled;

            var plannedPercentage = (planned / programmed) * 100;
            var confirmedPercentage = (confirmed / programmed) * 100;

            oNewState[action.payload.dayName] = {

                programmed,
                planned,
                confirmed,
                cancelled,
                plannedPercentage,
                confirmedPercentage


            };

            return oNewState;
        }

    }
}