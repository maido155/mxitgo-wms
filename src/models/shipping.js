import { confirmShipping, saveShipping, updateShipping, getShipping, fetchShippingAll, getShippingDetail, deleteShipping } from '../services/api';


import moment from 'moment';

export default {
    namespace: 'shipping',
    state: {
        warehouses: [],
        warehouseIds: [],
        isSuccess: false,
        isSuccessEdit: false,
        isSuccessConfirm: false,
        isSuccessEntry: false,
        close: false,
        oShippingItem: { products: [], id: "" },
        products: [],
        locationTreeData: [],
        datesShipping: [],
        productsAll: [],
        operatorAll: [],
        disabledLocation: false,
        disableWarehouse: []
    },
    effects: {

        * getShippingAll({ payload }, { call, put }) {
            const response = yield call(fetchShippingAll, payload);
            console.log(response);
            console.log(response);
            console.log(response);
            yield put({
                type: 'queryGetShippingAll',
                payload: response,
            });
        },

        * saveShipping({ payload }, { call, put }) {
            const response = yield call(saveShipping, payload);
            console.log(response);
            console.log(response);
            yield put({
                type: 'saveShippingReducer',
                payload: response,
            });
            const responseGetAll = yield call(fetchShippingAll, payload);
            console.log(responseGetAll);
            console.log(responseGetAll);
            yield put({
                type: 'queryGetShippingAll',
                payload: responseGetAll,
            });
        },
        * saveWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'saveWarehouseReducer',
                payload: payload,
            });
            yield put({
                type: 'disabledWarehouseReducer',
                payload: payload,
            });
        },
        * replaceWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'replaceWarehouseReducer',
                payload: payload,
            });
        },
        * changedSuccess({ payload }, { call, put }) {
            yield put({
                type: 'changedSuccessReducer',
                payload: payload,
            });
        },
        * updatedSuccess({ payload }, { call, put }) {
            yield put({
                type: 'changedSuccessReducer',
                payload: payload,
            });
        },
        * changedClose({ payload }, { call, put }) {
            yield put({
                type: 'queryChangedClose',
                payload: payload,
            });
        },
        * setWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'setWarehouseReducer',
                payload: payload,
            });
        },
        * updateShipping({ payload }, { call, put }) {
            const response = yield call(updateShipping, payload);
            console.log(response);
            yield put({
                type: 'updateShippingReducer',
                payload: response,
            });
            const responseGetAll = yield call(fetchShippingAll, payload);
            console.log(responseGetAll);
            console.log(responseGetAll);
            yield put({
                type: 'queryGetShippingAll',
                payload: responseGetAll,
            });
        },
        * getShipping({ payload }, { call, put }) {
            const response = yield call(getShipping, payload);
            console.log(response);
            yield put({
                type: 'getShippingReducer',
                payload: response,
            });
        },
        * getShippingDetail({ payload }, { call, put }) {
            const response = yield call(getShippingDetail, payload);
            console.log(response);
            yield put({
                type: 'getShippingDetailReducer',
                payload: response,
            });
        },
        * setShipping({ payload }, { call, put }) {
            yield put({
                type: 'setShippingReducer',
                payload: response,
            });
        },
        * resetValues({ payload }, { call, put }) {
            console.log("Reset values called");
            yield put({
                type: 'resetValuesReducer',
                payload: payload,
            });
        },
        * deleteShipping({ payload }, { call, put }) {
            const response = yield call(deleteShipping, payload);
            console.log(response);
            const responseShippingAll = yield call(fetchShippingAll, payload);
            yield put({
                type: 'deleteShippingReducer',
                payload: responseShippingAll,
            });

        },
        * confirmShipping({ payload }, { call, put }) {
            const response = yield call(confirmShipping, payload);
            console.log(response);
            yield put({
                type: 'confirmShippingReducer',
                payload: response,
            });
            const responseShippingAll = yield call(fetchShippingAll, payload);
            console.log(responseShippingAll);
            yield put({
                type: 'queryGetShippingAll',
                payload: responseShippingAll,
            });
        },
        * removeWarehouse({ payload }, { call, put }) {
            yield put({
                type: 'removeWarehouseReducer',
                payload: payload.payload,
            });
        },
        * saveEntry({ payload }, { call, put }) {
            const response = yield call(saveShipping, payload);
            console.log(response);
            console.log(response);
            yield put({
                type: 'saveEntryReducer',
                payload: response,
            });
            const responseGetAll = yield call(fetchShippingAll, payload);
            console.log(responseGetAll);
            console.log(responseGetAll);
            yield put({
                type: 'queryGetShippingAll',
                payload: responseGetAll,
            });
        },
        * updateValidation({ payload }, { call, put }) {
            yield put({
                type: 'queryValidation',
                payload: {},
            });
        },
    },

    reducers: {

        queryGetShippingAll(state, action) {
            // const allDates = [...state.datesShipping, action.payload];
            // const newDates = [];
            // for (let i = 0; i < allDates[0].length; i++) {
            //     newDates.push(allDates[0][i])
            // }
            return {
                ...state,
                datesShipping: action.payload
            }
        },
        saveEntryReducer(state, action) {
            if (action.payload.message === "Success") {
                return {
                    ...state,
                    isSuccessEntry: true
                }
            }
        },
        resetValuesReducer(state, action) {
            console.log("Reset values reducer called");
            return {
                ...state,
                warehouses: [],
                warehouseIds: [],
                isSuccess: false,
                close: false,
                oShippingItem: { products: [], id: "" },
                products: [],
                loading: false,
                disableWarehouse: []
            }
        },
        saveShippingReducer(state, action) {
            if (action.payload.message === "Success") {
                return {
                    ...state,
                    isSuccess: true
                }
            } else {
                return {
                    ...state,
                    isSuccess: false
                }
            }
        },
        saveWarehouseReducer(state, action) {
            const datesWarehouse = [...state.warehouses, action.payload.objWarehouse];
            const products = [...state.products, action.payload.products];
            const warehouseIds = [...state.warehouseIds, action.payload.objWarehouse.warehouseId]
            return {
                ...state,
                warehouses: datesWarehouse,
                products: products,
                warehouseIds
            }
        },
        disabledWarehouseReducer(state, action) {
            let getWarehouse = action.payload.locationTreeData.filter(function(data) {
                for (var i = 0; i < data.childLevel1.length; i++) {
                    if (data.childLevel1[i].key == action.payload.objWarehouse.warehouseId) {
                        return data.childLevel1[i].key == action.payload.objWarehouse.warehouseId;
                    }
                }
            })
            return {
                ...state,
                disableWarehouse: getWarehouse
            }
        },
        changedSuccessReducer(state, action) {
            return {
                ...state,
                isSuccess: false,
                isSuccessEdit: false,
                isSuccessConfirm: false,
                isSuccessEntry: false,
                close: true


            }
        },
        queryChangedClose(state, action) {
            return {
                ...state,
                close: false
            }
        },
        replaceWarehouseReducer(state, action) {

            var aWarehouse = state.warehouses;
            var products = state.products;
            var warehouseId = state.warehouseIds;
            let pos = aWarehouse.map(function(data) { return data.warehouseId; }).indexOf(action.payload.origin);
            aWarehouse.splice(pos, 1);
            products.splice(pos, 1);
            warehouseId.splice(pos, 1)

            var newArray = [];
            var newArrayProducts = [];
            var newArrayWarehouseId = [];

            newArray = [action.payload.payload.objWarehouse, ...aWarehouse];
            newArrayProducts = [action.payload.payload.products, ...products];
            newArrayWarehouseId = [action.payload.payload.objWarehouse.warehouseId, ...warehouseId];

            return {
                ...state,
                warehouses: newArray,
                products: newArrayProducts,
                warehouseIds: newArrayWarehouseId
            }
        },
        removeWarehouseReducer(state, action) {
            var aWarehouse = state.warehouses;
            var products = state.products;
            var warehouse = state.warehouseIds;
            var warehouseDisable = state.disableWarehouse;
            let pos = aWarehouse.map(function(data) { return data.warehouseId; }).indexOf(action.payload.payload.warehouseId);
            aWarehouse.splice(pos, 1);
            products.splice(pos, 1);
            warehouse.splice(pos, 1);
            const warehouseIds = [...state.warehouseIds, action.payload.payload.warehouseId];
            if (aWarehouse.length == 0) {
                warehouseDisable = [];
            }
            return {
                ...state,
                warehouses: aWarehouse,
                products: products,
                warehouseIds: warehouse,
                disableWarehouse: warehouseDisable
            }
        },
        setWarehouseReducer(state, action) {

            return {
                ...state,
                warehouses: action.payload.warehouses
            }
        },
        updateShippingReducer(state, action) {
            if (action.payload.message === "Success") {
                return {
                    ...state,
                    // datesShipping: action.payload,
                    // warehouses: [],
                    // warehouseIds: [],
                    isSuccessEdit: true,
                    close: false,
                    // oShippingItem: { products: [], id: "" },
                    // products: []
                }
            }
        },
        confirmShippingReducer(state, action) {
            if (action.payload.message === "Success") {
                return {
                    ...state,
                    isSuccessConfirm: true
                }
            }
        },
        getShippingReducer(state, action) {

            var oItem = action.payload;


            var aWarehouseData = [];


            for (var i = 0; i < oItem.products.length; i++) {
                var oLineItem = {};
                oItem.products[i].forEach((oProductItem) => {
                    oLineItem[oProductItem.product] = oProductItem.amount;
                });
                oLineItem.center = oItem.warehouseDetails[i].center;
                oLineItem.warehouseId = oItem.warehouse[i];
                aWarehouseData.push(oLineItem);
            };

            oItem.originalDepartureDate = oItem.departureDate;
            oItem.originalDeliveryDate = oItem.deliveryDate;
            oItem.originalEntryDate = oItem.entryDate;

            return {
                ...state,
                warehouses: aWarehouseData,
                warehouseIds: oItem.warehouse,
                visibleShippingPrograming: true,
                oShippingItem: oItem,
                masterMode: "EDIT",
                products: oItem.products

            }
        },
        getShippingDetailReducer(state, action) {

            var oItem = action.payload[0];




            /// convert date properties to moment

            oItem.originalDepartureDate = new moment(oItem.departureDate);
            oItem.originalDeliveryDate = new moment(oItem.deliveryDate);
            oItem.originalEntryDate = new moment(oItem.entryDate);

            oItem.departureDate = new moment(oItem.departureDate);
            oItem.deliveryDate = new moment(oItem.deliveryDate);
            oItem.entryDate = new moment(oItem.entryDate);


            return {
                ...state,
                oShippingItem: oItem,
                visibleModalProduct: true

            }
        },
        setShippingReducer(state, action) {
            return {
                ...state,
                oShippingItem: action.payload.oItem,

            }
        },

        deleteShippingReducer(state, action) {
            return {
                ...state,
                oShippingItem: { products: [], id: "" },
                datesShipping: action.payload
            }
        },
        queryValidation(state, action) {
            return {
                ...state,
                isSuccess: false
            }
        },
    },
}