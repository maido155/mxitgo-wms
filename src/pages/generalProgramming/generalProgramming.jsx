import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Card, Spin, Modal} from 'antd';
import TableGeneralProgramming from './TableGeneralProgramming';
import ModalGeneralProgramming from './ModalGeneralProgramming';
import { connect } from 'dva';
const { confirm } = Modal;

@connect(({ programming, loading }) => ({
    programming,
    loading: loading.models.programming,
    datesPrograming:programming.datesPrograming,
}))

export default class generalProgramming extends PureComponent{
    state = {
        loading: false,
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
        const { datesPrograming, loading } = this.props;
        return(
            <PageHeaderWrapper>
                <Card>
                    <Spin tip={"Cargando..."} spinning={loading}>
                        <div align="right">
                            <ModalGeneralProgramming/>
                        </div>
                        <div>
                            <TableGeneralProgramming datesPrograming = {datesPrograming} cancelProgramming={this.cancelProgramming}/>
                        </div>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }

}