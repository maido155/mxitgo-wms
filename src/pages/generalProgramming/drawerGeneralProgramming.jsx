import React, { PureComponent } from 'react';
import { Drawer, Form, Row, Col, DatePicker, Select, InputNumber, Button, Divider } from 'antd'; 
import {isMobile} from 'react-device-detect';
import { FormattedMessage, formatMessage} from 'umi-plugin-react/locale';

const { RangePicker } = DatePicker;
const { Option } = Select;
class DrawerGeneralProgramming extends PureComponent {
    onChangeProd(value) {
        console.log(`selected ${value}`);
    } 
    onBlurProd() {
        console.log('blur');
    }  
    onFocusProd() {
        console.log('focus');
    } 
    onSearchProd(val) {
        console.log('search:', val);
    }
    onChangeCent(value) {
        console.log(`selected ${value}`);
    } 
    onBlurCent() {
        console.log('blur');
    }  
    onFocusCent() {
        console.log('focus');
    } 
    onSearchCent(val) {
        console.log('search:', val);
    }
    render(){
        const formItemLayout = {
            labelCol: {xs: { span: 23 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span: 23 }},
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <Drawer
                title={<FormattedMessage id="general.modal-title.title"/>}
                width={isMobile ? "100%" : "50%"}
                closable={true}
                onClose={this.props.onCloseNewDrawer}
                visible={this.props.visibleNewDrawer}
            >
                <Form {...formItemLayout}>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={5} sm={6} md={6} lg={7} xl={8}>
                            <Form.Item label={formatMessage({id: "general.calendar.week"})}/>
                        </Col>
                        <Col xs={19} sm={18} md={18} lg={17} xl={10}>
                            <RangePicker style={{ width: '100%'}}/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={5} sm={6} md={6} lg={7} xl={8}>
                            <Form.Item label={formatMessage({id: "general.buttoon-product.product"})}/>
                        </Col>
                        <Col xs={19} sm={18} md={18} lg={17} xl={10}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select product"
                                optionFilterProp="children"
                                onChange={this.onChangeProd}
                                onFocus={this.onFocusProd}
                                onBlur={this.onBlurProd}
                                onSearch={this.onSearchProd}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="gold">Gold</Option>
                                <Option value="premium">Premium</Option>
                            </Select>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                    </Row>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={5} sm={6} md={6} lg={7} xl={8}>
                            <Form.Item label={formatMessage({id: "general.buttoon-center.center"})}/>
                        </Col>
                        <Col xs={19} sm={18} md={18} lg={17} xl={10}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select center"
                                optionFilterProp="children"
                                onChange={this.onChangeCent}
                                onFocus={this.onFocusCent}
                                onBlur={this.onBlurCent}
                                onSearch={this.onSearchCent}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="vallejo">Vallejo</Option>
                                <Option value="cuautitlán">Cuautitlán</Option>
                                <Option value="reparto">Reparto</Option>
                            </Select>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col xs={8} sm={9} md={9} lg={10} xl={9}></Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <label style={ isMobile ? { fontSize: "1rem", marginLeft: "25%"} : { fontSize: "1rem", marginLeft: "20%"}}><FormattedMessage id="general.modal-label.pallets"/></label>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={8} sm={7} md={7} lg={7} xl={4}>
                            <label style={isMobile ? { fontSize: "1rem", marginLeft: "25%"} : { fontSize: "1rem", marginLeft: "20%"}}><FormattedMessage id="general.modal-label.boxes"/></label>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Jue 8 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Vie 9 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Sab 10 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Dom 11 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Lun 12 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>

                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Mar 13 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={5} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={5} xl={3}>
                            <Form.Item label="Mie 14 Nov"/>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={6} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={7} sm={7} md={7} lg={5} xl={4}>
                            <InputNumber/>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={5} xl={6}></Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={0} md={0} lg={0} xl={6}></Col>
                        <Col xs={7} sm={9} md={9} lg={9} xl={3}>
                            <Form.Item label="Total"/>
                        </Col>
                        <Col xs={5} sm={5} md={5} lg={5} xl={2}>
                            <label style={{ marginLeft:"50%"}}>0</label>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3} xl={2}></Col>
                        <Col xs={5} sm={5} md={5} lg={3} xl={2}>
                            <label style={{ marginLeft:"50%"}}>0</label>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={6}></Col>
                    </Row>
                </Form>
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
                    <Button type="danger" onClick={this.props.onCloseNewDrawer} style={{ marginRight: 8 }}>
                        <FormattedMessage id="shipping.button.cancel"/>
                    </Button>
                    <Button onClick={this.props.onCloseNewDrawer} type="primary">
                        Guardar
                    </Button>
                </div>
            </Drawer>
        )
    }
}

export default Form.create()(DrawerGeneralProgramming);