import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DrawerGeneralProgramming from './drawerGeneralProgramming'; 
import { Card, Button, Icon, Modal, Spin } from 'antd'; 
import TableProgramming from './tableGeneralProgramming';
import { connect } from 'dva';
const { confirm } = Modal;

@connect(({ programming, loading }) => ({
    programming,
    loading: loading.models.programming,
    datesPrograming:programming.datesPrograming,
    datesGetProgramming: programming.datesGetProgramming,
    datesCustomerAll: programming.datesCustomerAll,
    datesProductAll: programming.datesProductAll
}))

class GeneralProgramming extends PureComponent {
    state = { 
        visibleNewDrawer: false,
        edit: false
    };
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
    showNewDrawer = () => {
        this.setState({
            visibleNewDrawer: true
        });
    };
    onCloseNewDrawer = () => {
        this.setState({
            visibleNewDrawer: false,
            edit: false
        });
    };
    showEditDrawer = (skEdit) => {
        this.showNewDrawer();
        this.setState({
            edit: true
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
    render(){
        const { datesPrograming, loading, datesGetProgramming, datesCustomerAll, datesProductAll } = this.props;
        return(
            <div>
                <DrawerGeneralProgramming
                    visibleNewDrawer={this.state.visibleNewDrawer}
                    onCloseNewDrawer={this.onCloseNewDrawer}
                    edit={this.state.edit}
                    datesGetProgramming={datesGetProgramming}
                    loading={loading}
                    datesCustomerAll={datesCustomerAll}
                    datesProductAll={datesProductAll}
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