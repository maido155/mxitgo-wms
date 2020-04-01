import React, { PureComponent } from 'react';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import DrawerShippingPrograming from './DrawerShippingPrograming';
import ConfirmationShipping from './ConfirmationShipping';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import TableShippingMaster from './TableShippingMaster';
import { formatMessage } from 'umi-plugin-react/locale';
import DrawerEntry from './drawerEntry';
import Styles from './StylesShipping.css';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Divider, Row, Col, Button, Icon, Form } from 'antd';

export default class ShippingMaster extends PureComponent {
    state=
    {
        visibleFirstDrawer: false,
        visibleSecondDrawer: false,
        visibleThirdDrawer: false,
        visibleModal: false,
        loadingModal: false
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

    showThirdDrawer = () =>{
        this.setState({
            visibleThirdDrawer: true
        });
    };

    showModal = () => {
        this.setState({
          visibleModal: true
        });
    };

    handleOk = () => {
        this.setState({ loadingModal: true });
        setTimeout(() => {
          this.setState({ loadingModal: false, visibleModal: false });
        }, 3000);
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

    onCloseThirdDrawer = () =>{
        this.setState({
            visibleThirdDrawer: false
        });
    };

    handleCancel = () => {
        this.setState({ visibleModal: false });
    };

    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };
        return(
                    <PageHeaderWrapper>
                        <Card>
                            <Form {...formItemLayout}>
                                <Row type="flex" justify="center">
                                    <Col xs={24} sm={23} md={17} lg={16} xl={16}>
                                        <Form.Item label={formatMessage({ id: 'outWard.label.week' })}>
                                            <RangePickerComponent/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center">
                                    <Col xs={24} sm={23} md={17} lg={16} xl={8}>
                                        <Form.Item label={formatMessage({ id: 'outWard.label.product' })}>
                                            <RadioGroupComponent/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Divider/>
                            <Row>
                                <Col span={22} className={Styles.addshippingmaster}>
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
                            <Row>
                                <Col span={24}>
                                    <TableShippingMaster 
                                        clickFirstTable={this.showFirstDrawer} 
                                        clickthirdTable={this.showThirdDrawer}
                                        clickModal={this.showModal}
                                    />
                                    <ConfirmationShipping
                                        visibleThird={this.state.visibleThirdDrawer}
                                        closeThirdDrawer={this.onCloseThirdDrawer}
                                        showSecond={this.showSecondDrawer}
                                        visibleSecond={this.state.visibleSecondDrawer}
                                        closeSecond={this.onCloseSecondDrawer} 
                                    />
                                    <DrawerEntry
                                        visibleModal={this.state.visibleModal}
                                        successModal={this.handleOk}
                                        cancelModal={this.handleCancel}
                                        loadingModal={this.state.loadingModal}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </PageHeaderWrapper>
        ); 
    }
}