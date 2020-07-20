import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DrawerGeneralProgramming from './drawerGeneralProgramming'; 
import { Card, Button, Icon, Modal, Spin, message, notification } from 'antd'; 
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
        editSumPallet: false,
        editSumBoxes: false
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
            rangeEdit: false,
            editSumPallet: false,
            editSumBoxes: false
        });
    };
    showEditDrawer = (skEdit) => {
        this.showNewDrawer();
        this.setState({
            edit: true,
            pk: skEdit
        })
        this.props.dispatch({
            type: 'programming/getProgramming',
            payload: {
                payload: {
                    Authorization: sessionStorage.getItem('idToken'),
                    idProgramming: skEdit
                }
             },
        });
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
    betweenDateEdit = (since, until) => {
        var sincesForm = moment(since).format();
        var untilForm = moment(until).format();
        var currentDay = sincesForm;
        var dateName = [];
        while (moment(currentDay).isSameOrBefore(untilForm)) {
            dateName.push(moment(currentDay).format());
            currentDay = moment(currentDay).add(1, 'd');
        }
        return dateName
    }
    handleSubmit = (data, weekUntil) => {
        const form = this.formRefNewLine.props.form;
        var allProgramming = this.props.datesPrograming;
        var getProgramming = this.props.datesGetProgramming;
        if(this.state.edit == true){
            form.validateFields((err, values) => {
                if(err){
                    return;
                }
                let startDate = this.props.datesGetProgramming[0].startDate;
                let endDate = this.props.datesGetProgramming[0].endDate;
                let dataWeek = 0;
                let dataAllWeek = 0;
                if(weekUntil == 0){
                    dataWeek = endDate;
                    dataAllWeek = this.betweenDateEdit(startDate, endDate);
                }else{
                    dataWeek = weekUntil;
                    dataAllWeek = data;
                }
                let payload = {
                    operation: "UPDATE_DATA", 
                    status: "NEW",
                    startDate: moment(values.weekEdit).format("YYYY-MM-DD") + "T00:00:00.000Z",
                    endDate:  moment(dataWeek).format("YYYY-MM-DD") + "T00:00:00.000Z",
                    idSkEdit: values.productEdit + "|" + values.customerEdit,
                    idSk: this.props.datesGetProgramming[0].skProduct + "|" + this.props.datesGetProgramming[0].skCustomer,
                    idPk: "PR-" + moment(values.weekEdit).format("DDMMYY") + moment(dataAllWeek[6]).format("DDMMYY"),
                    idPkOri: this.state.pk,
                    dates: [
                        {
                            caja: values.boxOneEdit,
                            pallet: values.palletOneEdit
                        },
                        {
                            caja: values.boxTwoEdit,
                            pallet: values.palleTwoEdit
                        },
                        {
                            caja: values.boxThreeEdit,
                            pallet: values.palleThreeEdit
                        },
                        {
                            caja: values.boxFourEdit,
                            pallet: values.palleFourEdit
                        },
                        {
                            caja: values.boxFiveEdit,
                            pallet: values.palleFiveEdit
                        },
                        {
                            caja: values.boxSixEdit,
                            pallet: values.palleSixEdit
                        },
                        {
                            caja: values.boxSevenEdit,
                            pallet: values.palleSevenEdit
                        }
                    ]
                };
                let getProgrammingFormat = "PR-" + moment(getProgramming[0].startDate).format("DDMMYY") + moment(getProgramming[0].endDate).format("DDMMYY");
                for(var i = 0; i < allProgramming.length; i++){
                    if(getProgrammingFormat != payload.idPk){
                        if(payload.idPk == allProgramming[i].Sk){
                            this.openNotificationWithIcon('warning');
                            return;    
                        }
                    }
                }
                if(this.state.rangeEdit == false){
                    var dataSim = this.props.datesGetProgramming[0].dateIso;
                    var dataIso = [];
                    for(var i = 0; i < dataSim.length; i++){
                        var oData = moment(dataSim[i].date).format("YYYY-MM-DD") + "T00:00:00.000Z";
                        dataIso.push(oData)
                    }
                    for(var k = 0; k < payload.dates.length; k++){
                        payload.dates[k]["date"] = dataIso[k]
                    }
                }else{
                    var dates = [];
                    for(var k = 0; k < dataAllWeek.length; k++){
                        let dateFormat = moment(data[k]).format("YYYY-MM-DD") + "T00:00:00.000Z";
                        dates.push(dateFormat);
                    }
                    for(var j = 0; j < payload.dates.length; j++){
                        payload.dates[j]["date"] = dates[j]
                    }
                }
                console.log(payload);
                this.props.dispatch({
                    type: 'programming/updateProgramming',
                    payload: {
                        payload: {
                            Authorization: sessionStorage.getItem('idToken'),
                            operation: payload.operation, 
                            status: payload.status,
                            startDate:  payload.startDate,
                            endDate:  payload.endDate,
                            idSkEdit: payload.idSkEdit,
                            idSk: payload.idSk,
                            idPk: payload.idPk,
                            dates: payload.dates,
                            idPkOri: payload.idPkOri
                        }
                     },
                });
            })
        }else{
            form.validateFields((err, values) => {
                if(err){
                    return;
                }
                let payload = {
                    operation: "NEW_DATA", 
                    status: "NEW",
                    startDate: moment(values.weekNew).format("YYYY-MM-DD") + "T00:00:00.000Z",
                    endDate:  moment(weekUntil).format("YYYY-MM-DD") + "T00:00:00.000Z",
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
                        },
                        {
                            caja: values.boxSixNew,
                            pallet: values.palletSixNew
                        },
                        {
                            caja: values.boxSevenNew,
                            pallet: values.palletSevenNew
                        }
                    ]
                };
                let pkPayload = "PR-" + payload.idPk;
                for(var i = 0; i < allProgramming.length; i++){
                    if(allProgramming[i].Sk == pkPayload){
                        this.openNotificationWithIcon('warning');
                        return;
                    }
                }
                var dates = [];
                for(var k = 0; k < data.length; k++){
                    let dateFormat = moment(data[k]).format("YYYY-MM-DD") + "T00:00:00.000Z";
                    dates.push(dateFormat);
                }
                for(var j = 0; j < payload.dates.length; j++){
                    payload.dates[j]["date"] = dates[j]
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
    openNotificationWithIcon = type => {
        notification[type]({
            message: formatMessage({ id: 'general.modal-verify-programming-message' }),
            description: formatMessage({ id: 'general.modal-verify-programming-description' }),
        });
    }
    UpdateValidation = () => {
        this.props.dispatch({
            type: 'programming/updateValidation',
            payload: {},
        });
    }
    UpdateValidationNew = () => {
        this.props.dispatch({
            type: 'programming/updateValidationNew',
            payload: {},
        });
    }
    cancelProgramming = (idProgramming) => {
        let _self = this;
        confirm({
            title: formatMessage({ id: 'general.modal-cancell' }),
            // content: 'Some descriptions',
            okText: formatMessage({ id: 'general.modal-cancell-yes' }),
            okType: 'danger',
            cancelText: formatMessage({ id: 'general.modal-cancell-no' }),
            onOk(){
                _self.props.dispatch({
                    type: 'programming/updateProgrammingStatus',
                    payload: {
                        payload: {
                            SK: idProgramming, operation: "UPDATE_STATUS", status: "CANCELLED",Authorization: sessionStorage.getItem('idToken')
                        }
                    }
                })
            }, 
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    showeditSumPallet = () => {
        this.setState({ editSumPallet: true })
    }
    showeditSumBoxes = () => {
        this.setState({ editSumBoxes: true })
    }
    render(){
        const { datesPrograming, loading, datesGetProgramming, datesCustomerAll, datesProductAll, editSuccess, postSuccess } = this.props;
        if(editSuccess){
            this.UpdateValidation();
            this.onCloseNewDrawer();
            if(this.state.showEdit){
                message.success(formatMessage({ id: 'general.table.editS' }));
                this.setState({
                    showEdit: false
                })
            }
        }else{
            this.setState({
                showEdit: true
            })
        }
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
                   visibleNewDrawer = {this.state.visibleNewDrawer}
                   onCloseNewDrawer = {this.onCloseNewDrawer}
                   edit = {this.state.edit}
                   loading = {loading}
                   datesProductAll = {datesProductAll}
                   datesCustomerAll = {datesCustomerAll}
                   rangePicker = {this.state.rangePicker}
                   dataInputShow = {this.dataInputShow}
                   mRangeEdit = {this.rangeEdit}
                   rangeEdit = {this.state.rangeEdit}
                   wrappedComponentRef = {this.saveFormRefNewLine}
                   handleSubmit = {this.handleSubmit}
                   datesGetProgramming = {datesGetProgramming}
                   editSumPallet = {this.state.editSumPallet}
                   showeditSumPallet = {this.showeditSumPallet}
                   editSumBoxes = {this.state.editSumBoxes}
                   showeditSumBoxes = {this.showeditSumBoxes}
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