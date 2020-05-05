import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Card, Button} from 'antd';
import TableGeneralProgramming from './TableGeneralProgramming';
import ModalGeneralProgramming from './ModalGeneralProgramming';
import RightContent from '@/components/GlobalHeader/RightContent';
import { connect } from 'dva';

@connect(({ programming, loading }) => ({
    programming,
    loading: loading.models.programming,
    datesPrograming:programming.datesPrograming,
}))

export default class generalProgramming extends PureComponent{
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
        return(
            <PageHeaderWrapper>
                <Card>
                    <div align="right">
                        <ModalGeneralProgramming/>
                    </div>
                    <div>
                        <TableGeneralProgramming/>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }

}