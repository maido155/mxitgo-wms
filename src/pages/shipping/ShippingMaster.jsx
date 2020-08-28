import React, { PureComponent } from 'react';
import { FormattedMessage,formatMessage } from 'umi-plugin-react/locale';
import ModalProductTable from '../generalComponents/ModalProductTable';
import { Card, Button, Icon, Form, Row, Col, Divider, Spin, DatePicker, Modal, notification, message } from 'antd'; //ADD
import TableShippingMaster from './TableShippingMaster';
import DrawerShipping from './DrawerShippingPrograming';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { _ } from 'lodash';
import { connect } from 'dva';

const { confirm } = Modal; //ADD

function disabledDate(current) {
    let dateMonday = moment(current).isoWeekday(1);
    let dateThursday = moment(current).isoWeekday(2);
    let dateTuesday = moment(current).isoWeekday(4);
    let dateFriday = moment(current).isoWeekday(5);
    let dateSaturday = moment(current).isoWeekday(6);
    let dateSunday = moment(current).isoWeekday(7);
    let dateAll = moment(current).format('dddd DD MMMM');
    let compareMonday = moment(dateMonday).format('dddd DD MMMM');
    let compareThursday = moment(dateThursday).format('dddd DD MMMM');
    let compareTuesday = moment(dateTuesday).format('dddd DD MMMM');
    let compareFriday = moment(dateFriday).format('dddd DD MMMM');
    let compareSaturday = moment(dateSaturday).format('dddd DD MMMM');
    let compareSunday = moment(dateSunday).format('dddd DD MMMM');
    if(dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday){
        return true;
    }
}

@connect(({ locations,products,operator,shipping, loading }) => ({
    shipping,
    operator,
    products,
    locations,
    loading: loading.models.shipping,
    warehouses: shipping.warehouses,
    isSuccess: shipping.isSuccess,
    isSuccessEdit: shipping.isSuccessEdit,
    isSuccessConfirm: shipping.isSuccessConfirm,
    isSuccessEntry: shipping.isSuccessEntry,
    close: shipping.close,
    datesShipping: shipping.datesShipping,
    productsAll: products.productsAll,
    operatorAll: operator.operatorAll,
    disableWarehouse: shipping.disableWarehouse
}))

class ShippingMaster extends PureComponent {
    state = {
        visibleDrawerShipping: false,
        masterMode: "NEW",
        mode: "",
        visibleNewLine: false,
        visibleConfirmation: false,
        visibleNewLineConfirm: false,
        lineData: {},
        lineMode: "NEW",
        visibleModalProduct: false,
        removeLocation: false,
        currentLoader: false,
        visibleEntry: false
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'locations/getLocations',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
            },
        }); 
        this.props.dispatch({
            type: 'products/getProducts',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
            },
        });
        this.props.dispatch({
            type: 'operator/getOperators',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
            },
        })
    }
    onChangeWeek=(date,dateString)=>{
        var since = moment(dateString)
        var until = moment(dateString)
        until.add(6, 'days');
        let dateFrom = "";
        if (date !== null) {
            dateFrom= `${since.format("YYYY-MM-DD") + "T00:00:00.000Z"}`; //date[0].toISOString();
        } else {
            dateFrom = '';
        }
        this.setState({
            dateFrom
        })
        this.props.dispatch({
            type: 'shipping/getShippingAll',
            payload: {
                payload: {
                    POST: {
                        Authorization: sessionStorage.getItem('idToken'),
                        initialDate: dateFrom
                    }
                }
            },
        });
    };
    insertWarehouse = (payload) => {
        this.props.dispatch({
            type: 'shipping/saveWarehouse',
            payload
        });
    }
    replaceWarehouse = (payload, origin) => {
        this.props.dispatch({
            type: 'shipping/replaceWarehouse',
            payload : {
                payload,
                origin
            }
        });
    }
    saveShipping = (datesShipping) => {
        if (this.state.masterMode == "NEW") {
            this.props.dispatch({
                type: 'shipping/saveShipping',
                payload: {
                    payload: {
                        POST: {
                            initialDate: this.state.dateFrom,
                            typeCondition: "New",
                            isMasterModified: true,
                            comment: datesShipping.comment,
                            createdBy: datesShipping.createdBy,
                            date: datesShipping.date,
                            departureDate: datesShipping.departureDate,
                            deliveryDate: datesShipping.deliveryDate,
                            entryDate: datesShipping.entryDate,
                            destination: datesShipping.destination,
                            products: datesShipping.products,
                            skWh: datesShipping.warehouses,
                            dateNew: datesShipping.dateNew,
                            createdByNew: datesShipping.createdByNew,
                            idShipping: datesShipping.idShipping,
                            Authorization: sessionStorage.getItem('idToken'),
                            locations: datesShipping.warehousesSelect
                        }
                    }
                }
            });
        } else {
            this.props.dispatch({
                type: 'shipping/updateShipping',
                payload: {
                    payload: {
                        POST: {
                            initialDate: this.state.dateFrom,
                            typeCondition: "New",
                            isMasterModified: true,
                            comment: datesShipping.comment,
                            createdBy: datesShipping.createdBy,
                            date: datesShipping.date,
                            departureDate: datesShipping.departureDate,
                            deliveryDate: datesShipping.deliveryDate,
                            entryDate: datesShipping.entryDate,
                            destination: datesShipping.destination,
                            products: datesShipping.products,
                            skWh: datesShipping.warehouses,
                            dateNew: datesShipping.dateNew,
                            createdByNew: datesShipping.createdByNew,
                            idShipping: datesShipping.idShipping,
                            Authorization: sessionStorage.getItem('idToken'),
                            locations: datesShipping.warehousesSelect
                        }
                    }
                }
            })
        }
    }
    confirmShipping = (datesShipping) => {
        let _self = this;
        let operators = this.props.operatorAll;
        let existsOperator = operators.filter(function(data){
            return data.operators.phone == datesShipping.phone && data.operators.name != datesShipping.operator;
        })
        if(existsOperator.length == 0){
            this.props.dispatch({
                type: 'shipping/confirmShipping',
                payload: {
                    payload: {
                        POST: {
                            typeCondition: "Confirmed",
                            isMasterModified: true,
                            comment: datesShipping.comment,
                            createdBy: datesShipping.createdBy,
                            date: datesShipping.date,
                            departureDate: datesShipping.departureDate,
                            deliveryDate: datesShipping.deliveryDate,
                            entryDate: datesShipping.entryDate,
                            destination: datesShipping.destination,
                            products: datesShipping.products,
                            skWh: datesShipping.warehouses,
                            dateNew: datesShipping.dateNew,
                            createdByNew: datesShipping.createdByNew,
                            pk: datesShipping.idShipping,
                            sk: datesShipping.idShipping.substr(4),
                            operator: datesShipping.operator,
                            phone: datesShipping.phone,
                            initialDate: this.state.dateFrom,
                            Authorization: sessionStorage.getItem('idToken')
                        }
                    }
                }
            })
        }else{
           this.openNotificationWithIcon('warning');
           return;
        }
    }
    deleteShipping = (shipping) => { //ADD
        let _self = this;
        confirm({
            title: formatMessage({ id: 'shipping.modal-delete' }),
            okText: formatMessage({ id: 'shipping.modal-delete-yes' }),
            okType: 'danger',
            cancelText: formatMessage({ id: 'shipping.modal-delete-no' }),
            onOk(){
                console.log('Deleting..........'); //I18N *****************************************************************************************************
                _self.props.dispatch({
                    type: 'shipping/deleteShipping',
                    payload: {
                        payload: {
                            POST:{
                                'WMS-1-PK': shipping,
                                initialDate: _self.state.dateFrom,
                                Authorization: sessionStorage.getItem('idToken')
                            }
                        }
                    }
                })
            }, 
            onCancel() {
              console.log('Deleting shipping cancelled'); //I18N *****************************************************************************************************
            },
        });
    }
    saveEntryShipping = (entry) => {
        let _self = this;
        this.props.dispatch({
            type: 'shipping/saveEntry',
            payload: {
                payload: {
                    POST: {
                        initialDate: this.state.dateFrom,
                        typeCondition: "Entry",
                        isMasterModified: true,
                        comment: entry.textEntry,
                        createdBy: entry.createdBy,
                        date: entry.date,
                        products: entry.products,
                        pk: entry["WMS-1-PK"],
                        sk: entry["WMS-1-SK"],
                        skWh: entry.skWh,
                        picture: entry.urlImageGeneral,
                        Authorization: sessionStorage.getItem('idToken'),

                    }
                }
            }
        });
    }
    openNotificationWithIcon = type => {
        notification[type]({
            message: formatMessage({ id: 'shipping.notification.operator' }),
            // description: '',
        });
    }
    changedSuccess = () => {
        this.props.dispatch({
            type: 'shipping/changedSuccess',
            payload: {}
        })
    }
    updateShippingSuccess = () => {
        this.props.dispatch({
            type: 'shipping/updatedSuccess',
            payload: {}
        })
    }
    showModalProduct = (oItem,producto) => {
        this.props.dispatch({
            type: 'shipping/getShippingDetail',
            payload: { id: oItem['WMS-1-PK'], product: producto}
        })
        this.setState({
            visibleModalProduct: true
        })
    };
    onCloseModalProduct = e => {
        this.setState({
            visibleModalProduct: false,
        });
    };
    showMessage = (type, message) => {
        notification[type]({
            message
        });
    }
    showMessageFeatures = (type) => {
        notification[type]({
            message: formatMessage({ id: 'shipping.drawerEntry.messageTemperature' }),
        });
    }
    /*****************************************************************/
    showDrawerShipping = (masterMode, oItem) => {
        if(masterMode == "EDIT"){
            this.props.dispatch({
                type: 'shipping/getShipping',
                payload: { id: oItem['WMS-1-PK'], status: "New" }
            })
            this.setState({ visibleDrawerShipping: true, masterMode: masterMode})
        }else{
            this.props.dispatch({
                type: 'shipping/resetValues',
                payload: { oItem: { products: [], id: "" } }
            })
            this.setState({ visibleDrawerShipping: true, masterMode: masterMode})
        }
    }
    closeDrawerShipping = () => {
        this.setState({ visibleDrawerShipping: false});
    }
    onCloseConfirmationShipping=() => {
        this.setState({ visibleConfirmation: false})
    }
    showNewLine = (sLineStatus, record, mode) => {
        this.setState({ visibleNewLine: true, mode: mode, lineData: record, lineMode: sLineStatus})
    }
    closeNewLine = () => {
        this.setState({ visibleNewLine: false})
    }
    showConfirmation = (masterMode, oItem) => {
        this.props.dispatch({
            type: 'shipping/getShipping',
            payload: { id: oItem['WMS-1-PK'], status: "New"}
        })
        this.setState({ visibleConfirmation: true, masterMode: masterMode})
    }
    closeConfirmation = () => {
        this.setState({ visibleConfirmation: false})
    }
    showNewLineConfirm = (sLineStatus, record, mode) => {
        this.setState({ visibleNewLineConfirm: true, mode: mode, lineData: record, lineMode: sLineStatus})
    }
    closeNewLineConfirm = () => {
        this.setState({ visibleNewLineConfirm: false})
    }
    changedClose = () => {
        this.props.dispatch({
            type: 'shipping/changedClose',
            payload: {}
        })
    }
    showEntry = (shipping) => {
        this.props.dispatch({
            type: 'shipping/getShipping',
            payload: { id: shipping, status: "Entry"}
        })
        this.setState({ visibleEntry: true})
    }
    closeEntry = () => {
        this.setState({ visibleEntry: false})
    }
    isCreated = (success) => {
        if(success){
            message.success(formatMessage({id:'shipping.drawerEntry.messageSuccessNew'}) );
            this.changedSuccess();
        }
    }
    isEdited = (successEdit) => {
        if(successEdit){
            message.success(formatMessage({id:'shipping.drawerEntry.messageSuccessEdit'}) );
            this.changedSuccess();
        }
    }
    isConfirmed = (successConfirm) => {
        if(successConfirm){
            message.success(formatMessage({id:'shipping.drawerEntry.messageSuccessConfirm'}) );
            this.changedSuccess();
        }
    }
    isEntry = (successEntry) => {
        if(successEntry){
            message.success(formatMessage({id:'shipping.drawerEntry.messageSuccessEntry'}) );
            this.changedSuccess();
        }
    }
    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 7 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 5 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
        };
        const {  warehouses, warehouseIds, oShippingItem, products } = this.props.shipping;
        const {locationTreeData}= this.props.locations;
        const { productsAll, loading, isSuccess,isSuccessEdit,isSuccessConfirm,isSuccessEntry, close, datesShipping, operatorAll, disableWarehouse } = this.props;
        let currentLoader = this.props.loading === undefined ? false : this.props.loading;
        this.setState({ currentLoader });
        this.isCreated(isSuccess);
        this.isEdited(isSuccessEdit);
        this.isConfirmed(isSuccessConfirm);
        this.isEntry(isSuccessEntry);
        return (
            <div>
                <DrawerShipping 
                    //Props Drawer Shipping(New)
                    visibleDrawerShipping={this.state.visibleDrawerShipping}
                    masterMode={this.state.masterMode}
                    closeDrawerShipping={this.closeDrawerShipping}

                    //Props Drawer New Line
                    visibleNewLine={this.state.visibleNewLine}
                    mode={this.state.mode}
                    showNewLine={this.showNewLine}
                    closeNewLine={this.closeNewLine}

                    //Props New Line
                    locationTreeData={locationTreeData}
                    productsAll={productsAll}
                    lineData={this.state.lineData}
                    lineMode={this.state.lineMode}
                    disableWarehouse={disableWarehouse}

                    //Props Drawer Shipping
                    warehouses={warehouses}
                    warehouseIds={warehouseIds}
                    oShippingItem={oShippingItem}
                    products={products}
                    loading={loading}
                    isSuccess={isSuccess}
                    close={close}
                    insertWarehouse={this.insertWarehouse}
                    replaceWarehouse={this.replaceWarehouse}
                    saveShipping={this.saveShipping}
                    changedSuccess={this.changedSuccess}
                    updateShippingSuccess={this.updateShippingSuccess}
                    changedClose={this.changedClose}
                    showMessage={this.showMessage}
                />
                <ModalProductTable
                    visibleModalProduct={this.state.visibleModalProduct}
                    onCloseModalProduct={this.onCloseModalProduct}
                    oShippingItem={oShippingItem}
                    loading={loading}
                />
                <PageHeaderWrapper extra={
                    <div >
                        <Form style={{paddingRight:"1rem"}} layout="inline" >  
                            <Form.Item {...formItemLayout}  label={formatMessage({id: "outComming.label.week"})}>
                                <DatePicker format="YYYY-MM-DD" style={{ width: 200 }} disabledDate={disabledDate} onChange={(date,dateString)=>{this.onChangeWeek(date,dateString,this)}}/>
                            </Form.Item>
                            <Form.Item style={{padding:"0rem 1rem 0rem 7rem"}} {...formItemLayout}>
                                <Button type="primary" shape="circle" size="large" onClick={() => {this.showDrawerShipping("NEW")}}>
                                    <Icon type="plus" />
                                </Button>
                            </Form.Item>    
                        </Form>    
                    </div>                 
                }>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <Spin tip={formatMessage({id: "shipping.loading"})} spinning={this.state.currentLoader}>
                                    <TableShippingMaster
                                        //Props Drawer Shipping(Edit)
                                        showDrawerShipping={this.showDrawerShipping} 
                                        showMessage={this.showMessage}

                                        //Props Confirmation
                                        visibleConfirmation={this.state.visibleConfirmation}
                                        showConfirmation={this.showConfirmation}
                                        closeConfirmation={this.closeConfirmation}
                                        onCloseConfirmationShipping={this.onCloseConfirmationShipping}
                                        oShippingItem={oShippingItem}
                                        loading={loading}
                                        isSuccess={isSuccess}
                                        close={close}
                                        operatorAll={operatorAll}
                                        warehouses={warehouses}
                                        warehouseIds={warehouseIds}
                                        lineMode={this.state.lineMode}
                                        lineData={this.state.lineData}
                                        insertWarehouse={this.insertWarehouse}
                                        replaceWarehouse={this.replaceWarehouse}
                                        confirmShipping={this.confirmShipping}
                                        masterMode={this.state.masterMode}
                                        products={products}
                                        changedSuccess={this.changedSuccess}
                                        updateShippingSuccess={this.updateShippingSuccess}
                                        changedClose={this.changedClose}
                                        

                                        //Props Drawer New Line
                                        visibleNewLineConfirm={this.state.visibleNewLineConfirm}
                                        showNewLineConfirm={this.showNewLineConfirm}
                                        closeNewLineConfirm={this.closeNewLineConfirm}
                                        mode={this.state.mode}
                                        productsAll={productsAll}
                                        locationTreeData={locationTreeData}
                                        disableWarehouse={disableWarehouse}
                                        
                                        showModalProduct={this.showModalProduct}
                                        datesTableShipping={datesShipping}

                                        //props Table shipping
                                        deleteShipping={this.deleteShipping} //ADD SABADO

                                        //props entry
                                        visibleEntry={this.state.visibleEntry}
                                        showEntry= {this.showEntry}
                                        closeEntry={this.closeEntry}
                                        saveEntryShipping={this.saveEntryShipping}
                                        changedSuccess={this.changedSuccess}
                                        updateShippingSuccess={this.updateShippingSuccess}
                                        closeDrawerShipping={this.closeDrawerShipping}
                                        close={close}
                                        isSuccess={isSuccess}
                                        changedClose={this.changedClose}
                                        showMessageFeatures={this.showMessageFeatures}
                                    />
                                </Spin>
                            </Col>
                        </Row>
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default ShippingMaster;