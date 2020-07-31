import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import DatePicker from '../generalComponents/DatePickerComponent';
import TextArea from '../generalComponents/TextAreaComponent';
import TableComponent from '../generalComponents/TableComponent';
import { Drawer, Form, Row, Col, Typography, Divider, Button, Icon, Input, AutoComplete  } from 'antd';
import {isMobile} from 'react-device-detect';
import Styles from './StylesShipping.css';
import NewLine from './NewLine';
import { _ } from 'lodash';

const { Text } = Typography;
class ConfirmationShipping extends PureComponent {
    state={
        visibleNewLine: false,
        phoneOperator: ''    
    }

    showNewLine = () =>{
        this.setState({
            visibleNewLine: true
        });
    };

    onCloseNewLine = () =>{
        this.setState({
            visibleNewLine: false
        });
    };

    onSelect = (value) => {
        let phoneOperator = this.props.operatorAll.filter(function(data){
            return data.operators.name == value;
        })
        this.setState({phoneOperator: phoneOperator[0].operators.phone})
    }
    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };
        const { phoneOperator }= this.state;
        const {operatorAll} = this.props;
        let nameOperator = operatorAll.map(function(data){
            return data.operators.name;
        });
        return(
            <div>
                <NewLine
                    visibleNewLine = {this.state.visibleNewLine}
                    onCloseNewLine = {this.onCloseNewLine}
                />
                <Drawer
                    title={formatMessage({ id: 'shipping.shippingconfirmation.title' })}
                    width={isMobile ? "100%" : "80%"}
                    closable={true}
                    onClose={this.props.onCloseConfirmationShipping}
                    visible={this.props.visibleConfirmationShipping} 
                    getContainer={isMobile ? false : true} 
                >
                    <Form {...formItemLayout}>
                        <Row>
                            <Col xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.id-order' })}>
                                    <Text strong>TE0101023912231</Text>
                                </Form.Item>
                            </Col>
                        </Row>
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
                                <Button type="primary" shape="circle" size="large" onClick={this.showNewLine}>
                                    <Icon type="plus"/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className={Styles.tabledrawerone}>
                                <TableComponent showNewLine={this.showNewLine}/>
                            </Col>
                        </Row>
                        <Row className={Styles.lastcolumn}>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.driver' })}>
                                    <AutoComplete
                                        dataSource={nameOperator}
                                        filterOption={(inputValue, option) =>
                                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        onSelect={this.onSelect}
                                    />
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.phone' })}>
                                    <Input value={phoneOperator}/>
                                </Form.Item>
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
                            <Button type="danger" onClick={this.props.onCloseConfirmationShipping} className={Styles.cancelarfooter}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            <Button type="primary" onClick={this.props.onCloseConfirmationShipping}>
                                <FormattedMessage id="shipping.button.conf"/>
                            </Button>    
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default ConfirmationShipping;