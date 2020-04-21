import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button, Row, Col, Icon, Form, Divider} from 'antd';
import Styles from './StylesShipping.css';
import DatePicker from '../generalComponents/DatePickerComponent';
import TextArea from '../generalComponents/TextAreaComponent';
import TableComponent from '../generalComponents/TableComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import NewLine from './NewLine';
import {isMobile} from 'react-device-detect';

export default class DrawerShippingPrograming extends PureComponent{
    state=
    {
        visibleNewLine: false,
    }

    showDrawerNewLine = () =>{
        this.setState({
            visibleNewLine: true
        });
    };

    onCloseDrawerNewLine = () =>{
        this.setState({
            visibleNewLine: false
        });
    };

    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };
        return(
            <div>
                <Drawer
                    title={formatMessage({ id: 'shipping.drawershipping.label.title' })}
                    width={isMobile ? "100%" : "80%"}
                    closable={true}
                    onClose={this.props.onCloseDrawerShipping}
                    visible={this.props.visibleDrawerShipping} 
                    getContainer={false} 
                    style={{
                        textAlign: 'left'
                    }}
                >
                    <NewLine
                        visibleDrawer={this.state.visibleNewLine}
                        closeDrawer={this.onCloseDrawerNewLine}
                    /> 
                    <Form {...formItemLayout}>
                        <Row>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-exit' })}>
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-arrival' })}>
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-entry' })}>
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.drawershipping.label.date-comments' })}>
                                    <TextArea/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row type="flex" justify="center" >
                            <Col span={19} className={Styles.adddrawerone}>
                                <Button type="primary" shape="circle" size="large" onClick={this.showDrawerNewLine}>
                                    <Icon type="plus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className={Styles.tabledrawerone}>
                                <TableComponent showDrawer={this.showDrawerNewLine}/>
                            </Col>
                        </Row>
                        <div
                            style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                            }}
                        >
                            <Button type="danger" onClick={this.props.onCloseDrawerShipping} className={Styles.cancelarfooter}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            <Button type="primary" onClick={this.props.onCloseDrawerShipping}>
                                <FormattedMessage id="shipping.button.program"/>
                            </Button>    
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}