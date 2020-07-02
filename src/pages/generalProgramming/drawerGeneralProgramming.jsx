import React, { PureComponent } from 'react';
import { Drawer, Form, Row, Col, DatePicker, Select, InputNumber, Button, Divider, Spin } from 'antd'; 
import {isMobile} from 'react-device-detect';
import { FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

function disabledDate(current) {
    let dateThursday = moment(current).isoWeekday(2);
    let dateWednesday = moment(current).isoWeekday(3);
    let dateTuesday = moment(current).isoWeekday(4);
    let dateSaturday = moment(current).isoWeekday(6);
    let dateSunday = moment(current).isoWeekday(7);
    let dateAll = moment(current).format('dddd DD MMMM');
    let compareThursday = moment(dateThursday).format('dddd DD MMMM');
    let compareWednesday = moment(dateWednesday).format('dddd DD MMMM');
    let compareTuesday = moment(dateTuesday).format('dddd DD MMMM');
    let compareSaturday = moment(dateSaturday).format('dddd DD MMMM');
    let compareSunday = moment(dateSunday).format('dddd DD MMMM');
    if(dateAll === compareThursday || dateAll === compareWednesday || dateAll === compareTuesday || dateAll === compareSaturday || dateAll === compareSunday){
        return true;
    }
}
function onChange(date, dateString) {
    console.log(date, dateString);
}

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
            labelCol: {xs:{ span: 1}, sm:{ span: 5}, md: { span: 6 }, lg: { span: 6}, xl: { span: 8 }},
            wrapperCol: {xs:{ span: 23}, sm:{ span: 19}, md: { span: 18 }, lg: { span: 18}, xl : { span: 13 }},
        };
        const { edit, datesGetProgramming, loading, datesCustomerAll, datesProductAll } = this.props;
        const { getFieldDecorator } = this.props.form;
        return(
            <Drawer
                title={edit == false ? <FormattedMessage id="general.modal-title.title"/> : "Editar Programación"}
                width={isMobile ? "100%" : window.innerWidth < 575 ? "80%" : window.innerWidth < 768 ? "70%" : window.innerWidth < 991 ? "60%" : window.innerWidth < 1200 ? "50%" : window.innerWidth < 1600 ? "40%" : "30%"}
                closable={true}
                onClose={this.props.onCloseNewDrawer}
                visible={this.props.visibleNewDrawer}
            >
                <Form {...formItemLayout}>
                    <Spin tip={"Cargando..."} spinning={loading}>
                        {edit == false &&
                            <div>
                                <Row>
                                    <Col xl={24}>
                                        <Form.Item label={formatMessage({id: "general.calendar.week"})} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block' }}>
                                                {getFieldDecorator('weekEdit')
                                                    (<RangePicker
                                                        disabledDate={disabledDate}
                                                        format="YYYY-MM-DD"
                                                        onChange={onChange}
                                                    />)}
                                                </Form.Item>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={24}>
                                        <Form.Item label={formatMessage({id: "general.buttoon-product.product"})} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('productNew')
                                                    (<Select showSearch style={{ width: 200 }} placeholder="Select product" optionFilterProp="children" onChange={this.onChangeProd}
                                                        onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                    {datesProductAll.map(item => (
                                                        <Option value={item["WMS-1-SK"]}>{item.productName}</Option>
                                                    ))}
                                                </Select>)}
                                            </Form.Item>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={24}>
                                        <Form.Item label={formatMessage({id: "general.buttoon-center.center"})} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('customerNew')
                                                    (<Select showSearch style={{ width: 200 }} placeholder="Select center" optionFilterProp="children" onChange={this.onChangeCent}
                                                        onFocus={this.onFocusCent} onBlur={this.onBlurCent} onSearch={this.onSearchCent}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                    {datesCustomerAll.map(item => (
                                                        <Option value={item["WMS-1-SK"]}>{item.clientName}</Option>
                                                    ))}
                                                </Select>)}
                                            </Form.Item>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Form.Item label={"FECHA"} style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('boxOneNew')(<InputNumber/>)}
                                    </Form.Item>
                                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('palletOneNew')(<InputNumber/>)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label={"FECHA"} style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('boxTwoNew')(<InputNumber/>)}
                                    </Form.Item>
                                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('palletTwoNew')(<InputNumber/>)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label={"FECHA"} style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('boxThreeNew')(<InputNumber/>)}
                                    </Form.Item>
                                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('palletThreeNew')(<InputNumber/>)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label={"FECHA"} style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('boxFourNew')(<InputNumber/>)}
                                    </Form.Item>
                                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('palletFourNew')(<InputNumber/>)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label={"FECHA"} style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('boxFiveNew')(<InputNumber/>)}
                                    </Form.Item>
                                    <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('palletFiveNew')(<InputNumber/>)}
                                    </Form.Item>
                                </Form.Item>
                            </div>
                        }
                        {edit == true &&
                            <div>
                                {datesGetProgramming.length != 0 &&
                                    <div>
                                        <Row>
                                            <Col xl={24}>
                                                <Form.Item label={formatMessage({id: "general.calendar.week"})} style={{ marginBottom: 0 }}>
                                                    <Form.Item style={{ display: 'inline-block' }}>
                                                        {getFieldDecorator('weekEdit')
                                                            (<RangePicker
                                                                disabledDate={disabledDate}
                                                                format="YYYY-MM-DD"
                                                                onChange={onChange}
                                                            />)}
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={24}>
                                                <Form.Item label={formatMessage({id: "general.buttoon-product.product"})} style={{ marginBottom: 0 }}>
                                                    <Form.Item style={{ display: 'inline-block' }}>
                                                        {getFieldDecorator('productEdit', {initialValue: datesGetProgramming[0].skProduct})
                                                            (<Select showSearch style={{ width: 200 }} placeholder="Select product" optionFilterProp="children" onChange={this.onChangeProd}
                                                                onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            {datesProductAll.map(item => (
                                                                <Option value={item["WMS-1-SK"]}>{item.productName}</Option>
                                                            ))}
                                                        </Select>)}
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={24}>
                                                <Form.Item label={formatMessage({id: "general.buttoon-center.center"})} style={{ marginBottom: 0 }}>
                                                    <Form.Item style={{ display: 'inline-block' }}>
                                                        {getFieldDecorator('customerEdit', {initialValue: datesGetProgramming[0].skCustomer})
                                                            (<Select showSearch style={{ width: 200 }} placeholder="Select product" optionFilterProp="children" onChange={this.onChangeProd}
                                                                onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            {datesCustomerAll.map(item => (
                                                                <Option value={item["WMS-1-SK"]}>{item.clientName}</Option>
                                                            ))}
                                                        </Select>)}
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Divider/>
                                        <Form.Item label={datesGetProgramming[0].dates[0].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxOneEdit',{initialValue: datesGetProgramming[0].dates[0].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palletOneEdit',{initialValue: datesGetProgramming[0].dates[0].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[1].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxTwoEdit',{initialValue: datesGetProgramming[0].dates[1].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleTwoEdit',{initialValue: datesGetProgramming[0].dates[1].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[2].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxThreeEdit',{initialValue: datesGetProgramming[0].dates[2].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleThreeEdit',{initialValue: datesGetProgramming[0].dates[2].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[3].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxFourEdit',{initialValue: datesGetProgramming[0].dates[3].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleFourEdit',{initialValue: datesGetProgramming[0].dates[3].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[4].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxFiveEdit',{initialValue: datesGetProgramming[0].dates[4].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleFiveEdit',{initialValue: datesGetProgramming[0].dates[4].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                    </div>
                                }
                            </div>
                        }
                    </Spin>
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