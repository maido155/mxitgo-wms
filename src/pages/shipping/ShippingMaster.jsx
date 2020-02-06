import React, { PureComponent } from 'react';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import DrawerShippingPrograming from './DrawerShippingPrograming';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import TableShippingMaster from './TableShippingMaster';
import Styles from './StylesShipping.css';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Divider, Row, Col, Button, Icon } from 'antd';

export default class ShippingMaster extends PureComponent {
    state=
    {
        visibleFirstDrawer: false,
        visibleSecondDrawer: false
    }

    showFirstDrawer = () =>{
        this.setState({
            visibleFirstDrawer: true
        });
    };

    showSecondDrawer = () =>{
        this.setState({
            visibleSecondDrawer: true
        });
    };

    onCloseFirstDrawer = () =>{
        this.setState({
            visibleFirstDrawer: false
        });
    };

    onCloseSecondDrawer = () =>{
        this.setState({
            visibleSecondDrawer: false
        });
    };

    render() {
        return(
            <PageHeaderWrapper>
                <Card>
                    <Row>
                        <Col xs={24} sm={4} md={4} lg={5} xl={8} className={Styles.week}>
                            <h3>Semana:</h3>
                        </Col>
                        <Col xs={24} sm={16} md={14} lg={13} xl={8} className={Styles.calendar}>
                            <RangePickerComponent/>
                        </Col>
                        <Col xs={24} sm={3} md={5} lg={5} xl={7} className={Styles.addbutton}>
                            <Button type="primary" shape="circle" size="large" onClick={this.showFirstDrawer}>
                                <Icon type="plus" />
                            </Button>
                            <DrawerShippingPrograming 
                                visibleFirst={this.state.visibleFirstDrawer} 
                                closeFirst={this.onCloseFirstDrawer}
                                showSecond={this.showSecondDrawer} 
                                visibleSecond={this.state.visibleSecondDrawer}
                                closeSecond={this.onCloseSecondDrawer}
                                />
                        </Col>  
                    </Row>
                    <Row type="flex" justify="center">
                        <Col xs={16} sm={6} md={4} lg={4} xl={3} className={Styles.product}>
                            <h3>Producto:</h3>
                        </Col>
                        <Col xs={16} sm={10} md={8} lg={8} xl={4} className={Styles.typeProduct}>
                            <RadioGroupComponent/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col>
                            <TableShippingMaster
                                clickFirstTable={this.showFirstDrawer}/>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        ); 
    }
}