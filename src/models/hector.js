
import {
    getCompanies,
    getIndustries,
    generateCompany,
    updateCompany,
    getDepartmentsByUsers,
    updateDepartment,
    generateDepartment,
    deleteDepartment
} from '../services/api';

export default {
    namespace: 'hector',

    state: {
        companies: [],
        industries: [],
        departments: []

    },

    effects: {

        *fetchCompanies({ payload }, { call, put }) {
            const response = yield call(getCompanies, payload);
            yield put({
                type: 'queryCompanies',
                payload: response,
            });
        },
        *fetchIndustries({ payload }, { call, put }) {
            const response = yield call(getIndustries, payload);
            yield put({
                type: 'queryIndustries',
                payload: response,
            });
        },
        *generateCompany({ payload }, { call, put }) {
            const response = yield call(generateCompany, payload);

            const responseCompanies = yield call(getCompanies, {});
            yield put({
                type: 'queryCompanies',
                payload: responseCompanies,
            });
        },
        *generateDepartment({ payload }, { call, put }) {
            const response = yield call(generateDepartment, payload);

            const responseDepartments = yield call(getDepartmentsByUsers, payload);
            yield put({
                type: 'queryDepartmentsByUser',
                payload: responseDepartments,
            });
        },
        *deleteDepartment({ payload }, { call, put }) {
            const response = yield call(deleteDepartment, payload);

            const responseDepartments = yield call(getDepartmentsByUsers, payload);
            yield put({
                type: 'queryDepartmentsByUser',
                payload: responseDepartments,
            });
        },



        *updateCompany({ payload }, { call, put }) {
            const response = yield call(updateCompany, payload);

            const responseCompanies = yield call(getCompanies, {});
            yield put({
                type: 'queryCompanies',
                payload: responseCompanies,
            });


            // const responseCompanies = yield call(getCompanies, payload);
            // yield put({
            //     type: 'queryCompanies',
            //     payload: responseCompanies,
            // });
        },
        *updateDepartment({ payload }, { call, put }) {
            const response = yield call(updateDepartment, payload);

            const responseDepartments = yield call(getDepartmentsByUsers, payload);
            yield put({
                type: 'queryDepartmentsByUser',
                payload: responseDepartments,
            });
        },

        *fetchDepartmentsByUser({ payload }, { call, put }) {
            const response = yield call(getDepartmentsByUsers, payload);
            yield put({
                type: 'queryDepartmentsByUser',
                payload: response,
            });
        },

    },

    reducers: {
        queryCompanies(state, action) {

            console.log(action.payload);

            return {
                ...state,
                companies: action.payload
            };
        },
        queryDepartmentsByUser(state, action) {

            console.log(action.payload);

            return {
                ...state,
                departments: action.payload
            };
        },
        queryIndustries(state, action) {

            console.log(action.payload);

            return {
                ...state,
                industries: action.payload
            };
        },
        queryCompanyResponse(state, action) {

            console.log(action.payload);
            return {
                ...state,
                answer: action.payload
            };
        },
    },
};


