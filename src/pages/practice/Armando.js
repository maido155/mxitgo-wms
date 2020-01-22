import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
    Table, Card, Spin, Form, Button, Icon, LocaleProvider, Input, Select, Row, Col, notification
} from 'antd';






import 'moment/locale/en-au';


@Form.create()
@connect(({ armando, loading }) => ({
    armando,
    loading: loading.models.armando,
    videogames:armando.videogames
}))



export default class Companies extends PureComponent {


    state = {
        loading: false
    }
    componentDidMount() {

         this.props.dispatch({
            type: 'armando/fetchVideoGames',
            payload: {
                payload: {
                    consolesId:1
                    // userId: "darmando.lira@hotmail.com"
                }
            },
        });
 
       


    }

    render() {

        
        const { loading, armando: { armando },videogames } = this.props;
        const columns = [
            {
              title: 'consolesId',
              dataIndex: 'consolesId',
              key: 'consolesId',
            },
            {
              title: 'digital',
              dataIndex: 'digital',
              key: 'digital',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
          ];
        return (
            <PageHeaderWrapper>
                    <Card title={<span><Icon type="bank" />  Practice</span>} style={{ 'margin': '0px' }}>
                        <Table
                           dataSource= {videogames}
                           columns={columns}
                        />
                    </Card>

            </PageHeaderWrapper>
        );
    }
}
