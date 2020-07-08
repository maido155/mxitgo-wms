import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DrawerGeneralProgramming from './drawerGeneralProgramming'; 
import { Card, Button, Icon, Modal, Spin, message } from 'antd'; 
import TableProgramming from './tableGeneralProgramming';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import moment from 'moment';
moment.locale('es');
const { confirm } = Modal;

@connect(({ programming, loading }) => ({
    programming,
    loading: loading.models.programming,
    datesPrograming:programming.datesPrograming,
    datesGetProgramming: programming.datesGetProgramming,
    datesCustomerAll: programming.datesCustomerAll,
    datesProductAll: programming.datesProductAll,
    editSuccess: programming.editSuccess,
    postSuccess: programming.postSuccess
}))
class GeneralProgramming extends PureComponent {
    state = { 
        visibleNewDrawer: false,
        edit: false,
        rangePicker: false,
        rangeEdit: false,
        pk: "",
        showEdit: true,
        showNew: true,
    }
    componentDidMount() {
        this.props.dispatch({
           type: 'programming/fetchProgrammingAll',
           payload: {
               payload: {
                Authorization: sessionStorage.getItem('idToken')
               }
            },
        });
        this.props.dispatch({
            type: 'programming/fetchCustomerAll',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
             },
        });
        this.props.dispatch({
            type: 'programming/fetchProductAll',
            payload: {
                payload: {
                 Authorization: sessionStorage.getItem('idToken')
                }
             },
        });
    }
    showNewDrawer = () => {
        this.setState({
            visibleNewDrawer: true
        });
    };
    onCloseNewDrawer = () => {
        const form = this.formRefNewLine.props.form;
        form.resetFields();
        this.setState({
            visibleNewDrawer: false,
            edit: false,
            rangePicker: false,
            // rangeEdit: false,
            // editSumPallet: false
        });
    };
    showEditDrawer = (skEdit) => {
        this.showNewDrawer();
        this.setState({
            edit: true,
            // pk: skEdit
        })
        // this.props.dispatch({
        //     type: 'programming/getProgramming',
        //     payload: {
        //         payload: {
        //             Authorization: sessionStorage.getItem('idToken'),
        //             idProgramming: skEdit
        //         }
        //      },
        // });
    }
    dataInputShow = () => {
        this.setState({
            rangePicker: true
        })
    }
    rangeEdit = () => {
        this.setState({
            rangeEdit: true
        })
    }
    saveFormRefNewLine = (formRef) => {
        this.formRefNewLine = formRef;
    }
    handleSubmit = (data, weekUntil) => {
        const form = this.formRefNewLine.props.form;
        if(this.state.edit == true){
            form.validateFields((err, values) => {
                if(err){
                    return;
                }
                // let payload = {
                //     operation: "UPDATE_DATA", 
                //     status: "NEW",
                //     startDate: values.weekEdit,
                //     endDate:  values.weekEdit[1],
                //     idSkEdit: values.productEdit + "|" + values.customerEdit,
                //     idSk: this.props.datesGetProgramming[0].skProduct + "|" + this.props.datesGetProgramming[0].skCustomer,
                //     idPk: this.state.pk,
                //     dates: [
                //         {
                //             caja: values.boxOneEdit,
                //             pallet: values.palletOneEdit
                //         },
                //         {
                //             caja: values.boxTwoEdit,
                //             pallet: values.palleTwoEdit
                //         },
                //         {
                //             caja: values.boxThreeEdit,
                //             pallet: values.palleThreeEdit
                //         },
                //         {
                //             caja: values.boxFourEdit,
                //             pallet: values.palleFourEdit
                //         },
                //         {
                //             caja: values.boxFiveEdit,
                //             pallet: values.palleFiveEdit
                //         }
                //     ]
                // };
                // if(this.state.rangeEdit == false){
                //     var dataSim = this.props.datesGetProgramming[0].dateIso;
                //     var dataIso = [];
                //     for(var i = 0; i < dataSim.length; i++){
                //         var oData = moment(dataSim[i].date).format();
                //         dataIso.push(oData)
                //     }
                //     for(var k = 0; k < payload.dates.length; k++){
                //         payload.dates[k]["data"] = dataIso[k]
                //     }
                // }else{
                //     for(var j = 0; j < payload.dates.length; j++){
                //         payload.dates[j]["data"] = data[j]
                //     }
                // }
                // this.props.dispatch({
                //     type: 'programming/updateProgramming',
                //     payload: {
                //         payload: {
                //             Authorization: sessionStorage.getItem('idToken'),
                //             operation: payload.operation, 
                //             status: payload.status,
                //             startDate:  payload.startDate,
                //             endDate:  payload.endDate,
                //             idSkEdit: payload.idSkEdit,
                //             idSk: payload.idSk,
                //             idPk: payload.idPk,
                //             dates: payload.dates
                //         }
                //      },
                // });
            })
        }else{
            form.validateFields((err, values) => {
                if(err){
                    return;
                }
                let payload = {
                    operation: "NEW_DATA", 
                    status: "NEW",
                    startDate: moment(values.weekNew).format(),
                    endDate:  weekUntil,
                    idSk: values.productNew + "|" + values.customerNew,
                    idPk: moment(values.weekNew).format("DDMMYY") + moment(weekUntil).format("DDMMYY"),
                    dates: [
                        {
                            caja: values.boxOneNew,
                            pallet: values.palletOneNew
                        },
                        {
                            caja: values.boxTwoNew,
                            pallet: values.palletTwoNew
                        },
                        {
                            caja: values.boxThreeNew,
                            pallet: values.palletThreeNew
                        },
                        {
                            caja: values.boxFourNew,
                            pallet: values.palletFourNew
                        },
                        {
                            caja: values.boxFiveNew,
                            pallet: values.palletFiveNew
                        }
                    ]
                };
                if(this.state.rangeEdit == false){
                    var dataSim = this.props.datesGetProgramming[0].dateIso;
                    var dataIso = [];
                    for(var i = 0; i < dataSim.length; i++){
                        var oData = moment(dataSim[i].date).format();
                        dataIso.push(oData)
                    }
                    for(var k = 0; k < payload.dates.length; k++){
                        payload.dates[k]["data"] = dataIso[k]
                    }
                }else{
                    for(var j = 0; j < payload.dates.length; j++){
                        payload.dates[j]["data"] = data[j]
                    }
                }
                this.props.dispatch({
                    type: 'programming/postProgramming',
                    payload: {
                        payload: {
                            Authorization: sessionStorage.getItem('idToken'),
                            operation: payload.operation, 
                            status: payload.status,
                            startDate:  payload.startDate,
                            endDate:  payload.endDate,
                            idPk: payload.idPk,
                            idSk: payload.idSk,
                            dates: payload.dates
                        }
                     },
                });
            }); 
        }
    }
    // UpdateValidation = () => {
    //     this.props.dispatch({
    //         type: 'programming/updateValidation',
    //         payload: {},
    //     });
    // }
    UpdateValidationNew = () => {
        this.props.dispatch({
            type: 'programming/updateValidationNew',
            payload: {},
        });
    }
    cancelProgramming = (idProgramming) => {
        let _self = this;
        confirm({
            title: 'Are you sure you want to cancel this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk(){
                _self.props.dispatch({
                    type: 'programming/updateProgrammingStatus',
                    payload: { SK: idProgramming, operation: "UPDATE_STATUS", status: "CANCELLED"}
                })
            }, 
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    render(){
        const { datesPrograming, loading, datesGetProgramming, datesCustomerAll, datesProductAll, editSuccess, postSuccess } = this.props;
        // if(editSuccess){
        //     this.UpdateValidation();
        //     this.onCloseNewDrawer();
        //     if(this.state.showEdit){
        //         message.success(formatMessage({ id: 'general.table.editS' }));
        //         this.setState({
        //             showEdit: false
        //         })
        //     }
        // }else{
        //     this.setState({
        //         showEdit: true
        //     })
        // }
        if(postSuccess){
            this.UpdateValidationNew();
            this.onCloseNewDrawer();
            if(this.state.showNew){
                message.success(formatMessage({ id: 'general.table.save' }));
                this.setState({
                    showNew: false
                })
            }
        }else{
            this.setState({
                showNew: true
            })
        }
        return(
            <div>
                <DrawerGeneralProgramming
                   visibleNewDrawer={this.state.visibleNewDrawer}
                   onCloseNewDrawer={this.onCloseNewDrawer}
                   edit={this.state.edit}
                   loading={loading}
                   datesProductAll={datesProductAll}
                   datesCustomerAll={datesCustomerAll}
                   rangePicker = {this.state.rangePicker}
                   dataInputShow = {this.dataInputShow}
                   mRangeEdit= {this.rangeEdit}
                   rangeEdit = {this.state.rangeEdit}
                   wrappedComponentRef={this.saveFormRefNewLine}
                   handleSubmit={this.handleSubmit}
                />
                <PageHeaderWrapper>
                    <Card>
                        <Spin tip={"Cargando..."} spinning={loading}>
                            <div align="right">
                                <Button type="primary" shape="circle" size="large" onClick={this.showNewDrawer}>
                                    <Icon type="plus"/>
                                </Button>
                                <TableProgramming datesPrograming={datesPrograming} cancelProgramming={this.cancelProgramming} showEditDrawer={this.showEditDrawer}/>
                            </div>
                        </Spin>
                    </Card>
                </PageHeaderWrapper>
            </div>
        )
    }
}
export default GeneralProgramming;