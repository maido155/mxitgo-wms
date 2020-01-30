import React, { PureComponent } from 'react';
import {Row, Col,Typography,Card} from 'antd';

import {isMobile} from "react-device-detect";


const { Text } = Typography;

class gridDashboard extends PureComponent {
    render() {
        if(isMobile){
            return (
                <div>
                    <Row type="flex" justify="space-around">
                    
                    <Col span xs={3} sm={6} md={6} lg={4} xl={2}> <Text strong>Miercoles</Text></Col>
                    <Col span xs={3} sm={6} md={6} lg={4} xl={2}><Text strong>Jueves</Text></Col>
                    <Col span xs={3} sm={6} md={6} lg={4} xl={2}><Text strong>Viernes</Text></Col>
                    <Col span xs={3} sm={6} md={6} lg={4} xl={2}><Text strong>Sabado</Text></Col>
                   
                  </Row>
                </div>
            );
        }
        return (
        <div>
            <Row type="flex" justify="space-between">
            <Col span={1}></Col>
            <Col span={3}><Title level={4}>Miercoles</Title></Col>
            <Col span={3}><Title level={4}>Jueves</Title></Col>
            <Col span={3}><Title level={4}>Viernes</Title></Col>
            <Col span={3}><Title level={4}>Sabado</Title></Col>
            <Col span={3}><Title level={4}>Domingo</Title></Col>
            <Col span={3}><Title level={4}>Lunes</Title></Col>
            <Col span={3}><Title level={4}>Martes</Title></Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
              <Col span={3}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}><Title level={4}>Totales</Title></Col>
          </Row>
          <Row>
              <Col span={5}></Col>
              <Col span={5}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
              </Col>
              <Col span={5}></Col>
              <Col span={5}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
              </Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}>
              <Card style={{ width: 150 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
              </Col>
          </Row>
        </div>
        );
    }
}
export default gridDashboard;