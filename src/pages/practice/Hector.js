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
@connect(({ hector, loading }) => ({
    hector,
    loading: loading.models.hector
}))
export default class Companies extends PureComponent {


    state = {
        loading: false
    }
    componentDidMount() {

        /* this.props.dispatch({
            type: 'companies/fetchCompanies',
            payload: {
                payload: {
                    userId: localStorage.getItem("userId")
                    // userId: "dhector.lira@hotmail.com"
                }

            },
        });
 */
       


    }

    getColumns = (editCompany, showDepartments) => {

        return [
            // {
            //     title: 'ID',
            //     width: 50,
            //     dataIndex: 'companyId',
            //     key: 'companyId'
            // },
            {
                title: 'Name',
                dataIndex: 'companyName',
            }, {
                title: 'Email',
                dataIndex: 'companyEmail',
            }, {
                title: 'Website',
                dataIndex: 'companyWebSiteAddress',
            }, {
                title: 'Point of contact',
                dataIndex: 'companyPointOfContact',
                key: 'companyPointOfContact',

            }, {
                title: 'Actions', width: 120, fixed: 'right', dataIndex: '', key: 'x',
                render: (text, record) => (
                    <div style={{ textAlign: 'left' }}>
                        <a onClick={() => { showDepartments(record) }} ><Icon type="cluster" /> Departments</a>
                        <a onClick={() => { editCompany(record) }} ><Icon type="edit" /> Edit</a><br />




                    </div>
                )
            }];
    }

    

    render() {

        
        const { loading, hector: { hector }, } = this.props;

        return (
            <PageHeaderWrapper>
                    <Card title={<span><Icon type="bank" />  Practice</span>} style={{ 'margin': '0px' }}>


                        

                    </Card>

            </PageHeaderWrapper>
        );
    }
}
