import { getWeekProgrammingTotals, dashboardGetMasterTotal, getWeekProgrammingTotalsReset, dashboardGetMasterTotalReset, getDay } from '../services/api'

export default {
    namespace: 'dashboard',
    state: {

        programmingTotalPRODUCT1: "",
        programmingTotalPRODUCT2: "",

        programmingTotal: { total: "", new: "", cancelled: "", confirmed: "" },
        Monday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        },
        Tuesday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        },
        Wednesday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        },
        Thursday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        },
        Friday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        },
        Saturday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        },
        Sunday: {
            programmed: "",
            planned: "",
            confirmed: "",
            cancelled: "",
            plannedPercentage: "",
            confirmedPercentage: ""
        }


    },
    effects: {

        * init({ payload }, { call, put }) {
            yield put({
                type: 'reducerInit',
                payload: {},
            });
        },



        * getWeekProgrammingTotalsReset({ payload }, { call, put }) {


            // console.log("getWeekProgrammingTotals: " + JSON.stringify(payload));

            // var response = yield call(getWeekProgrammingTotals, payload);


            // response.productName = payload.product; /// response.dayName = payload.dayName   
            // /// response.dayName = "Friday"


            // console.log(response);
            yield put({
                type: 'getWeekProgrammingTotalsReducerReset',
                payload: payload,
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
        * dashboardGetMasterTotalReset({ payload }, { call, put }) {

            // console.log("dashboardGetMasterTotal: " + JSON.stringify(payload));

            // console.log(JSON.stringify(payload));
            // const response = yield call(dashboardGetMasterTotal, payload);
            // console.log(response);
            yield put({
                type: 'dashboardGetMasterTotalReducerReset',
                payload: payload,
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
        },
        * getDayReset({ payload }, { call, put }) {

            // var response = yield call(getDay, payload);

            // console.log("Day:" + JSON.stringify(payload));

            // response.dayName = payload.dayName;

            yield put({
                type: 'getDayReducerReset',
                payload: payload,
            });
        }

    },

    reducers: {
        getWeekProgrammingTotalsReducerReset(state, action) {

            // console.log("getWeekProgrammingTotalsReducer: " + JSON.stringify(action.payload));



             var productTotal = 0;

            // if (action.payload.Items && action.payload.Items.length > 0) {

            //     action.payload.Items[0].dates.forEach((oItem) => { productTotal += oItem.box; })

            // }

             var oNewState = {
                 ...state
             };


             oNewState["programmingTotalPRODUCT1"] = productTotal
             oNewState["programmingTotalPRODUCT2"] = productTotal
            return oNewState;

            //// state

        },

        getWeekProgrammingTotalsReducer(state, action) {

            console.log("getWeekProgrammingTotalsReducer: " + JSON.stringify(action.payload));



            var productTotal = 0;

            if (action.payload.Items && action.payload.Items.length > 0) {

                action.payload.Items[0].dates.forEach((oItem) => { productTotal += oItem.box; })

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



            return {
                ...state,
                programmingTotal: action.payload
            }
        },
        dashboardGetMasterTotalReducerReset(state, action) {

            // console.log("dashboardGetMasterTotalReducer: " + JSON.stringify(action.payload));



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
        },
        getDayReducerReset(state, action) {

            console.log("getDayReducerRecet:" + JSON.stringify(action.payload));

            var oNewState = {
                ...state

            };

             var programmed = "";
             var confirmed = "";
             var planned = "";
             var cancelled = "";

             var plannedPercentage = "";
             var confirmedPercentage = "";

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