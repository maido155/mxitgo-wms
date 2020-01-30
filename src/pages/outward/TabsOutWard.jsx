import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import TableOutWard from './TableOutWard';
import { Row, Col, Tabs } from 'antd';

const { TabPane } = Tabs;

export default class TabsOutWard extends PureComponent{
    render(){
        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        <Tabs type="card">
                            <TabPane tab="Vallejo" key="1">
                                <TableOutWard/>
                            </TabPane>
                            <TabPane tab="Cuauhtitlan" key="2">
                                <TableOutWard/>
                            </TabPane>
                            <TabPane tab="Reparto" key="3">
                                <TableOutWard/>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}