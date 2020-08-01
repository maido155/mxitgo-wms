
import { saveShipping, updateShipping, getShipping, getLocations, fetchShippingAll, fetchProductAll,getShippingDetail,fetchOperatorAll } from '../services/api';

import moment from 'moment';

export default {
    namespace: 'shipping',
    state: {
        warehouses: [],
        warehouseIds: [],
        isSuccess: false,
        close: false,
        oShippingItem: { products: [], id: "" },
        products: [],
        locationTreeData: [],
        datesShipping: [],
        productsAll: [],
        operatorAll: []
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
        * getLocations({ payload }, { call, put }) {
            const response = yield call(getLocations, payload);
            console.log(response);
            yield put({
                type: 'getLocationsReducer',
                payload: response,
            });
        },
        * getProducts({ payload }, { call, put }) {
            const response = yield call(fetchProductAll, payload);
            yield put({
                type: 'getProductsReducer',
                payload: response,
            });
        },
        * getOperators({ payload }, { call, put }) {
            const response = yield call(fetchOperatorAll, payload);
            yield put({
                type: 'getOperatorReducer',
                payload: response,
            });
        }


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
                loading: false
            }
        },
        saveShippingReducer(state, action) {
            return {
                ...state,
                isSuccess: true
            }
        },
        saveWarehouseReducer(state, action) {
            const datesWarehouse = [...state.warehouses, action.payload.warehouseLine];
            const products = [...state.products, action.payload.products];
            const warehouseIds = [...state.warehouseIds, action.payload.warehouseLine.warehouseId]
            return {
                ...state,
                warehouses: datesWarehouse,
                products: products,
                warehouseIds
            }
        },
        changedSuccessReducer(state, action) {
            return {
                ...state,
                isSuccess: false,
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
            var newArray = [];
            var newArrayProducts = [];

            aWarehouse.forEach((oWarehouse, iIndex) => {
                if (oWarehouse.warehouseId === action.payload.warehouseLine.warehouseId) {
                    newArrayProducts.push(action.payload.products);
                    newArray.push(action.payload.warehouseLine);
                } else {
                    newArrayProducts.push(state.products[iIndex]);
                    newArray.push(oWarehouse);
                }
            });


            return {
                ...state,
                warehouses: newArray,
                products: newArrayProducts
            }
        },
        setWarehouseReducer(state, action) {

            return {
                ...state,
                warehouses: action.payload.warehouses
            }
        },
        updateShippingReducer(state, action) {
            return {
                ...state,
                warehouses: [],
                warehouseIds: [],
                isSuccess: true,
                close: false,
                oShippingItem: { products: [], id: "" },
                products: []
            }
        },
        getProductsReducer(state, action) {
            return {
                ...state,
                productsAll: action.payload.Items
            }
        },
        getOperatorReducer(state, action) {
            return {
                ...state,
                operatorAll: action.payload
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

            /// convert date properties to moment

            oItem.originalDepartureDate = new moment(oItem.departureDate);
            oItem.originalDeliveryDate = new moment(oItem.deliveryDate);
            oItem.originalEntryDate = new moment(oItem.entryDate);

            oItem.departureDate = new moment(oItem.departureDate);
            oItem.deliveryDate = new moment(oItem.deliveryDate);
            oItem.entryDate = new moment(oItem.entryDate);


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

        getLocationsReducer(state, action) {


            action.payload

            var aTreeData = [];

            action.payload.forEach((aLocation) => {


                var aWarehouses = [];


                aLocation[0].warehouses.forEach((oWarehouse) => {

                    var sValue = oWarehouse.PK.replace("WMS-", "");

                    aWarehouses.push({ title: oWarehouse.center, value: sValue, key: sValue });
                });

                aTreeData.push({ title: aLocation[0].name, value: aLocation[0].shortName, key: aLocation[0].shortName, childLevel1: aWarehouses });


            });


            return {
                ...state,
                locationTreeData: aTreeData
            }
        }



    },
}