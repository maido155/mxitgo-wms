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
        // const formItemLayout = {
        //     labelCol: {xs: { span: 23 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span: 23 }},
        // };
        const formItemLayout = {
            labelCol: {xl: { span: 9 }},
            wrapperCol: {xl : { span: 12 }},
        };
        const { edit, datesGetProgramming, loading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return(
            <Drawer
                title={edit == false ? <FormattedMessage id="general.modal-title.title"/> : "Editar Programación"}
                width={isMobile ? "100%" : "30%"}
                closable={true}
                onClose={this.props.onCloseNewDrawer}
                visible={this.props.visibleNewDrawer}
            >
                <Form {...formItemLayout}>
                    <Spin tip={"Cargando..."} spinning={loading}>
                        {edit == true &&
                            <div>
                                {datesGetProgramming.length != 0 &&
                                    <div>
                                        <Form.Item label={formatMessage({id: "general.buttoon-center.center"})} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('customer')
                                                (<Select showSearch style={{ width: 200 }} placeholder="Select center" optionFilterProp="children" onChange={this.onChangeCent}
                                                    onFocus={this.onFocusCent} onBlur={this.onBlurCent} onSearch={this.onSearchCent}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="vallejo">Vallejo</Option>
                                                    <Option value="cuautitlán">Cuautitlán</Option>
                                                    <Option value="reparto">Reparto</Option>
                                                </Select>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[0].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxOne',{initialValue: datesGetProgramming[0].dates[0].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palletOne',{initialValue: datesGetProgramming[0].dates[0].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[1].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxTwo',{initialValue: datesGetProgramming[0].dates[1].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleTwo',{initialValue: datesGetProgramming[0].dates[1].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[2].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxTwo',{initialValue: datesGetProgramming[0].dates[2].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleTwo',{initialValue: datesGetProgramming[0].dates[2].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[3].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxTwo',{initialValue: datesGetProgramming[0].dates[3].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleTwo',{initialValue: datesGetProgramming[0].dates[3].pallet})(<InputNumber/>)}
                                            </Form.Item>
                                        </Form.Item>
                                        <Form.Item label={datesGetProgramming[0].dates[4].date} style={{ marginBottom: 0 }}>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('boxTwo',{initialValue: datesGetProgramming[0].dates[4].caja})(<InputNumber/>)}
                                            </Form.Item>
                                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                                {getFieldDecorator('palleTwo',{initialValue: datesGetProgramming[0].dates[4].pallet})(<InputNumber/>)}
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