import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
    Table, Card, Spin, Form, Button, Icon, LocaleProvider, Input, Select, Row, Col, Notification, rowSelection
} from 'antd';
import 'moment/locale/en-au';


@Form.create()
@connect(({ hector, loading }) => ({
    hector,
    loading: loading.models.hector,
    restaurants : hector.restaurants
}))

export default class Companies extends PureComponent {
    


    state = {
        loading: false,
        
    }

    
    componentDidMount() {

        this.props.dispatch({
            type: 'restaurants/fetchRestaurants',
            payload: {
                payload: {
                    restaurantId: localStorage.getItem("restaurantId"),

                }

            },
            
        });
 

       


    }
   
 

    render() {

        const columns = [
            {
              title: 'RestaurantId',
              dataIndex: 'restaurantId',
              render: text => <a>{text}</a>,
            },
            {
              title: 'RestaurantDir',
              dataIndex: 'restaurantDir',
            },
            {
              title: 'Restaurant',
              dataIndex: 'restaurant',
            },
            {
                title: 'Menu',
                dataIndex: 'menu',
              }, {
                title: 'PhoneNumber',
                dataIndex: 'phoneNumber',
              },
              {
                title: 'RestaurantData',
                dataIndex: 'restaurantData',
              },
              {
                title: 'Type',
                dataIndex: 'type',
              },

          ];        
        const { loading, hector: { hector }, restaurants} = this.props;

        return (
            <PageHeaderWrapper style={{backgroundColor:"#1890ff"}}>
                    <Card  title={<span><Icon type="bank" />  Practice</span>} style={{ 'margin': '0px' }}>
                    <Table  columns={columns} dataSource={restaurants}  />
                    </Card>
<button onClick={alert(restaurants)}>ghsxjh</button>
            </PageHeaderWrapper>
        );
    }
}
