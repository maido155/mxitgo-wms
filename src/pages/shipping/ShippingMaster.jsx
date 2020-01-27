import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CalendarShippingMaster from './CalendarShippingMaster';
import TabsShippingMaster from './TabsShippingMaster';

import {
    Card, Row, Col, Button, Icon, Tabs
} from 'antd';

class ShippingMaster extends PureComponent {
    render() {          
        return (
            <PageHeaderWrapper>
                    <Card>
                        <div>
                            <Row>
                                <Col xs={0} sm={4} md={4} lg={4} xl={6}></Col>
                                <Col xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <h3>Semana:</h3>
                                </Col>
                                <Col xs={18} sm={12} md={12} lg={13} xl={10}>
                                    <CalendarShippingMaster/>
                                </Col>
                                <Col xs={0} sm={4} md={4} lg={4} xl={6}></Col>
                            </Row>
                        </div>
                        <br/>
                        <div>
                            <Row>
                                <Col span={2} offset={22}>
                                    <Button type="primary" shape="circle" size="large">
                                        <Icon type="plus" />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <TabsShippingMaster/>
                                </Col>
                            </Row>
                        </div>
                    </Card>
            </PageHeaderWrapper>
        );
    }
}

export default ShippingMaster;