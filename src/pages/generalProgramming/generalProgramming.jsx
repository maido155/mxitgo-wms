import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Card, Spin} from 'antd';
import TableGeneralProgramming from './TableGeneralProgramming';
import ModalGeneralProgramming from './ModalGeneralProgramming';
import { connect } from 'dva';

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
                            <TableGeneralProgramming datesPrograming = {datesPrograming}/>
                        </div>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }

}