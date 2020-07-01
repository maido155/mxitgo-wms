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

const DrawerGeneralProgramming  = Form.create()(
    class extends React.Component {
        state = {
            dateRanger : [],
            dateIso: []
        }
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
        onChange = (date, dateString) => {
            var dateShow = [];
            var since = moment(dateString[0]);
            var until = moment(dateString[1]);
            var dateAllRange = this.betweenDate(since, until);
            for(var i = 0; i < dateAllRange.length; i++){
                let nameDate = moment(dateAllRange[i]).format('dddd DD MMMM')
                dateShow.push(nameDate);
            }
            this.props.dataInputShow();
            this.props.mRangeEdit();
            this.setState({
                dateRanger: dateShow,
            })
        }
        betweenDate = (since, until) => {
            var currentDay = since;
            var dateName = [];
            var dateIso = [];
            while (currentDay.isSameOrBefore(until)) {
                dateName.push(currentDay.format('YYYY-MM-DD'));
                dateIso.push(currentDay.format());
                currentDay.add(1, 'days');
            }
            this.setState({
                dateIso: dateIso
            })
            return dateName;
        }
        changeInput = value => {
            console.log(value);
        }
        render(){
            const formItemLayout = {
                labelCol: {xs:{ span: 12}, sm:{ span: 10 }, md:{ span: 10 }, lg:{ span: 10 }, xl: { span: 10 }},
                wrapperCol: {xs:{ span: 12}, sm:{ span: 14 }, md:{ span: 14 }, lg:{ span: 14 }, xl : { span: 14 }},
            };
            const tailFormItemLayout = { 
                wrapperCol: {xs: {span: 0,offset: 0,}, sm: {span: 13,offset: 11,}, md: {span: 13,offset: 11,}, lg: {span: 13,offset: 11,}, xl: {span: 13,offset: 11,}},
            };
            const { edit, datesGetProgramming, loading, datesCustomerAll, datesProductAll, handleSubmit, rangePicker, rangeEdit, sumInputs, sumPallets, sumBoxes, sumPalletsEdit, sumBoxesEdit } = this.props;
            const { dateRanger } = this.state;
            const { getFieldDecorator } = this.props.form;
            return(
                <Drawer
                    title={edit == false ? <FormattedMessage id="general.modal-title.title"/> : <FormattedMessage id="general.modal-title.Edit"/>}
                    width={isMobile ? "100%" : 550}
                    closable={true}
                    onClose={this.props.onCloseNewDrawer}
                    visible={this.props.visibleNewDrawer}
                >
                    <Form {...formItemLayout}>
                        <Spin tip={"Cargando..."} spinning={loading}>
                            {edit == false &&
                                <div>
                                    <Row>
                                        <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                            <Form.Item label={formatMessage({id: "general.calendar.week"})}>
                                                {getFieldDecorator('weekNew',{rules: [{ required: true, message: "Fecha no seleccionada" }]})
                                                    (<RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" onChange={this.onChange}/>)
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                            <Form.Item label={formatMessage({id: "general.buttoon-product.product"})}>
                                                {getFieldDecorator('productNew',{rules: [{ required: true, message: "Producto no seleccionado" }]})
                                                    (<Select showSearch style={{ width: 200 }} placeholder="Select product" optionFilterProp="children" onChange={this.onChangeProd} style={{ width: '100%' }}
                                                        onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd}filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        {datesProductAll.map(item => (<Option value={item["WMS-1-SK"]}>{item.productName}</Option>))}
                                                    </Select>)
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                            <Form.Item label={formatMessage({id: "general.buttoon-center.center"})}>
                                                {getFieldDecorator('customerNew',{rules: [{ required: true, message: "Customer no seleccionado" }] })
                                                    (<Select showSearch style={{ width: 200 }} placeholder="Select center" optionFilterProp="children" onChange={this.onChangeCent} style={{ width: '100%' }}
                                                        onFocus={this.onFocusCent} onBlur={this.onBlurCent} onSearch={this.onSearchCent} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        {datesCustomerAll.map(item => (<Option value={item["WMS-1-SK"]}>{item.clientName}</Option>))}
                                                    </Select>)
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                    </Row>
                                    <Divider/>
                                    {rangePicker == true &&
                                        <div> 
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={0} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item {...tailFormItemLayout}>
                                                        <Row>
                                                            <Col span={13}>
                                                                <label><FormattedMessage id="general.modal-label.pallets"/></label>
                                                            </Col>
                                                            <Col span={11}>
                                                                <label><FormattedMessage id="general.modal-label.boxes"/></label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[0]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletOneNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxOneNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[1]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletTwoNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxTwoNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}  
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[2]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletThreeNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxThreeNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[3]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletFourNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFourNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[4]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletFiveNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFiveNew',{initialValue: 0})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.modal-title.absolute"})}>
                                                        <Row>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                                <label>{sumPallets == 0 ? 0 : sumPallets}</label>
                                                            </Col>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                                <label>{sumBoxes == 0 ? 0 : sumBoxes}</label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                        </div>
                                    }
                                </div>
                            }
                            {edit == true &&
                                <div>
                                    {datesGetProgramming.length != 0 &&
                                        <div>
                                            <Row>
                                                <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.calendar.week"})}>
                                                        {getFieldDecorator('weekEdit',{initialValue: [moment(datesGetProgramming[0].startDate, "YYYY-MM-DD"), moment(datesGetProgramming[0].endDate, "YYYY-MM-DD")], rules: [{ required: true, message: "Fecha no seleccionada" }]})
                                                            (<RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" onChange={this.onChange}/>)
                                                        }
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.buttoon-product.product"})}>
                                                        {getFieldDecorator('productEdit',{initialValue: datesGetProgramming[0].skProduct, rules: [{ required: true, message: "Producto no seleccionado" }]})
                                                            (<Select showSearch style={{ width: 200 }} placeholder="Select product" optionFilterProp="children" onChange={this.onChangeProd} style={{ width: '100%' }}
                                                                onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd}filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {datesProductAll.map(item => (<Option value={item["WMS-1-SK"]}>{item.productName}</Option>))}
                                                            </Select>)
                                                        }
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.buttoon-center.center"})}>
                                                        {getFieldDecorator('customerEdit',{initialValue: datesGetProgramming[0].skCustomer, rules: [{ required: true, message: "Customer no seleccionado" }]})
                                                            (<Select showSearch style={{ width: 200 }} placeholder="Select center" optionFilterProp="children" onChange={this.onChangeCent} style={{ width: '100%' }}
                                                                onFocus={this.onFocusCent} onBlur={this.onBlurCent} onSearch={this.onSearchCent} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {datesCustomerAll.map(item => (<Option value={item["WMS-1-SK"]}>{item.clientName}</Option>))}
                                                            </Select>)
                                                        }
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                            </Row>
                                            <Divider/>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={0} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item {...tailFormItemLayout}>
                                                        <Row>
                                                            <Col span={13}>
                                                                <label><FormattedMessage id="general.modal-label.pallets"/></label>
                                                            </Col>
                                                            <Col span={11}>
                                                                <label><FormattedMessage id="general.modal-label.boxes"/></label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[0].date : dateRanger[0]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletOneEdit',{initialValue: datesGetProgramming[0].dates[0].pallet})(<InputNumber min={0} onChange={sumInputs()}/>)}                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxOneEdit',{initialValue: datesGetProgramming[0].dates[0].caja})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[1].date : dateRanger[1]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palleTwoEdit',{initialValue: datesGetProgramming[0].dates[1].pallet})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxTwoEdit',{initialValue: datesGetProgramming[0].dates[1].caja})(<InputNumber min={0} onChange={sumInputs()}/>)}  
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>


                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[2].date : dateRanger[2]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palleThreeEdit',{initialValue: datesGetProgramming[0].dates[2].pallet})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxThreeEdit',{initialValue: datesGetProgramming[0].dates[2].caja})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[3].date : dateRanger[3]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palleFourEdit',{initialValue: datesGetProgramming[0].dates[3].pallet})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFourEdit',{initialValue: datesGetProgramming[0].dates[3].caja})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[4].date : dateRanger[4]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palleFiveEdit',{initialValue: datesGetProgramming[0].dates[4].pallet})(<InputNumber min={0} onChange={sumInputs()}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFiveEdit',{initialValue: datesGetProgramming[0].dates[4].caja})(<InputNumber min={0} onChange={sumInputs()}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.modal-title.absolute"})}>
                                                        <Row>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                                <label>{sumPalletsEdit}</label>
                                                            </Col>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                                <label>{sumBoxesEdit}</label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                        </div>
                                    }
                                </div>
                            }
                        </Spin>
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
                            <Button type="primary" onClick={() => {handleSubmit(this.state.dateIso)}}>
                                <FormattedMessage id="general.modal.accept"/>
                            </Button>
                        </div>
                    </Form>
                </Drawer>
            )
        }
    }
);
export default DrawerGeneralProgramming;