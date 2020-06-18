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
}))

class GeneralProgramming extends PureComponent {
    state = { 
        visibleNewDrawer: false 
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
            visibleNewDrawer: true,
        });
    };
    onCloseNewDrawer = () => {
        this.setState({
            visibleNewDrawer: false,
        });
    };
    render(){
        const { datesPrograming, loading } = this.props;
        return(
            <div>
                <DrawerGeneralProgramming
                    visibleNewDrawer={this.state.visibleNewDrawer}
                    onCloseNewDrawer={this.onCloseNewDrawer}
                />
                <PageHeaderWrapper>
                    <Card>
                        <Spin tip={"Cargando..."} spinning={loading}>
                            <div align="right">
                                <Button type="primary" shape="circle" size="large" onClick={this.showNewDrawer}>
                                    <Icon type="plus"/>
                                </Button>
                                <TableProgramming datesPrograming={datesPrograming} cancelProgramming={this.cancelProgramming} showNewDrawer={this.showNewDrawer} visibleNewDrawer={this.state.visibleNewDrawer} onCloseNewDrawer={this.onCloseNewDrawer}/>
                            </div>
                        </Spin>
                    </Card>
                </PageHeaderWrapper>
            </div>
        )
    }
}

export default GeneralProgramming;