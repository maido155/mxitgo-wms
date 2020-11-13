import React, { PureComponent } from 'react';
import { Drawer, Form, Row, Col, DatePicker, Select, InputNumber, Button, Divider, Spin, message } from 'antd'; 
import {isMobile} from 'react-device-detect';
import { FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import moment from 'moment';

const { Option } = Select;

function disabledDate(current) {
    let dateMonday = moment(current).isoWeekday(1);
    let dateThursday = moment(current).isoWeekday(2);
    let dateTuesday = moment(current).isoWeekday(4);
    let dateFriday = moment(current).isoWeekday(5);
    let dateSaturday = moment(current).isoWeekday(6);
    let dateSunday = moment(current).isoWeekday(7);
    let dateAll = moment(current).format('dddd DD MMMM');
    let compareMonday = moment(dateMonday).format('dddd DD MMMM');
    let compareThursday = moment(dateThursday).format('dddd DD MMMM');
    let compareTuesday = moment(dateTuesday).format('dddd DD MMMM');
    let compareFriday = moment(dateFriday).format('dddd DD MMMM');
    let compareSaturday = moment(dateSaturday).format('dddd DD MMMM');
    let compareSunday = moment(dateSunday).format('dddd DD MMMM');
    if(dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday || current < moment().endOf('day')){
        return true;
    }
}

var numberValidationOne = 0;
var numberValidation = 0;
var dataValidation = [];
const DrawerGeneralProgramming  = Form.create()(
    class extends React.Component {
        state = {
            dateRanger : [],
            weekNewUntil: 0,
            inputsPallets: [],
            inputsBoxes: [],
            dateIso: [],
            inputsPalletsEdit: [],
            inputsBoxesEdit: []
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
        onChangeProd = value => {
            const { inputsPallets } = this.state;
            let palletsState = inputsPallets;
            let boxes = [];
            let pallets = [];
            for(var  i = 0; i < palletsState.length; i++){
                boxes.push(0);
                pallets.push(0);
            }
            this.setState({
                inputsPallets: pallets,
                inputsBoxes: boxes
            })
        } 
        onChange = (date, dateString) => {
            var dateShow = [];
            var inputsPalletsState = [];
            var inputsBoxesState = [];
            var since = moment(dateString);
            var until = moment(dateString)
            until.add(6, 'days');
            this.setState({weekNewUntil: until})
            var dateAllRange = this.betweenDate(since, until)
            for(var i = 0; i < dateAllRange.length; i++){
                let nameDate = moment(dateAllRange[i]).format('dddd DD MMMM');
                let splitDate = nameDate.split(" ");
                var dateDay = splitDate[0].charAt(0).toUpperCase() + splitDate[0].slice(1);
                var dateMonth = splitDate[2].charAt(0).toUpperCase() + splitDate[2].slice(1);
                var dateAll = dateDay + " " + splitDate[1] + " " + dateMonth;
                dateShow.push(dateAll);
            }
            for(var k = 0; k < dateShow.length; k++){
                inputsPalletsState.push(0);
                inputsBoxesState.push(0);
            }
            this.props.dataInputShow();
            this.setState({
                dateRanger: dateShow,
                inputsPallets: inputsPalletsState,
                inputsBoxes:  inputsBoxesState
            });
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
        /***********/
        calculatorInputs = (value, type, position) => {
            const { datesProductAll } = this.props;
            const { inputsBoxes, inputsPallets } = this.state
            const form = this.props.form;

            let dataForm = form.getFieldsValue();
            let productSelect = dataForm.productNew;
            let quantityProduct = 0;
            let numRound = Math.round(value);
            let boxes = inputsBoxes;
            let pallets = inputsPallets

            if(productSelect === undefined){
                message.warning(formatMessage({ id: 'general.modal-product' }));
                return;
            }
            
            let typeProduct = datesProductAll.filter(function(data){
                return data['WMS-1-SK'] == productSelect;
            })

            quantityProduct = typeProduct[0].quantityBoxes;

            if(type === 'pallet'){
                pallets[position] = numRound;
                boxes[position] = (numRound * quantityProduct);
                this.setState({ inputsPallets: pallets, inputsBoxes: boxes})
            }else{
                let result = numRound / quantityProduct;
                let resultRound = Math.ceil(result)
                boxes[position] = numRound;
                pallets[position] = resultRound;
                this.setState({ inputsBoxes: boxes, inputsPallets: pallets})
            }
        }
        sumInputsPallets = (pallets) => {
            let sumPallets = pallets.reduce(function(numOne, numTwo){
                return numOne + numTwo
            });
            return sumPallets
        }
        sumInputsBoxes = (boxes) => {
            let sumBoxes = boxes.reduce(function(numOne, numTwo){
                return numOne + numTwo
            });
            return sumBoxes
        }
        /***********/
        sumInputsPalletsEdit = (pallets) => {
            if(pallets.length != 0){
                let sumPallets = pallets.reduce(function(numOne, numTwo){
                    return numOne + numTwo
                });
                return sumPallets 
            }
        }
        sumInputsBoxesEdit = (boxes) => {
            if(boxes.length != 0){
                let sumBoxes = boxes.reduce(function(numOne, numTwo){
                    return numOne + numTwo
                });
                return sumBoxes 
            }
        }
        calculatorInputsEdit = (value, type, position) => {
            const { datesProductAll } = this.props;
            const { inputsPalletsEdit, inputsBoxesEdit } = this.state
            const form = this.props.form;

            let dataForm = form.getFieldsValue();
            let productSelect = dataForm.productEdit;
            let quantityProductEdit = 0;
            let numRoundEdit = Math.round(value);
            let boxesEdit = inputsBoxesEdit;
            let palletsEdit = inputsPalletsEdit;

            let typeProduct = datesProductAll.filter(function(data){
                return data['WMS-1-SK'] == productSelect;
            })

            quantityProductEdit = typeProduct[0].quantityBoxes;
            
            if(type === 'pallet'){
                palletsEdit[position] = numRoundEdit;
                boxesEdit[position] = (numRoundEdit * quantityProductEdit);
                this.setState({ inputsPalletsEdit: palletsEdit, inputsBoxesEdit: boxesEdit})
            }else{
                let result = numRoundEdit / quantityProductEdit;
                let resultRound = Math.ceil(result);
                boxesEdit[position] = numRoundEdit;
                palletsEdit[position] = resultRound;
                this.setState({ inputsBoxesEdit: boxesEdit, inputsPalletsEdit: palletsEdit})
            }
        }
        chargerInputProducts = (boxes, pallet, datesProduct) => {
            if(boxes.length != 0 && datesProduct.length != 0){
                numberValidationOne++;
                if(numberValidationOne <= 1){
                    dataValidation.push(datesProduct[0].productName,datesProduct[0].customerName,datesProduct[0].startDate);
                    this.setState({
                        inputsPalletsEdit: pallet,
                        inputsBoxesEdit: boxes
                    })
                }else{
                    if(dataValidation[0] != datesProduct[0].productName || dataValidation[1] != datesProduct[0].customerName || dataValidation[2] != datesProduct[0].startDate ){
                        numberValidation++;
                        if(numberValidation <= 1){
                            this.setState({
                                inputsPalletsEdit: pallet,
                                inputsBoxesEdit: boxes
                            })
                        }
                    }
                }
            }
            return 'Success'
        }
        closeDrawerProduct = () => {
            numberValidationOne = 0;
            numberValidation = 0;
            dataValidation = [];
            this.props.form.resetFields();
            this.props.onCloseNewDrawer();
        }
        render(){
            const { edit, visualizar, loading, datesProductAll, datesCustomerAll, rangePicker, handleSubmit, datesGetProgramming, rangeEdit, boxesEdit, palletsEdit } = this.props;
            const { dateRanger, inputsPallets, inputsBoxes, weekNewUntil, dateIso, inputsPalletsEdit, inputsBoxesEdit} = this.state;
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: {xs:{ span: 12}, sm:{ span: 12 }, md:{ span: 12 }, lg:{ span: 12 }, xl: { span: 11 }},
                wrapperCol: {xs:{ span: 12}, sm:{ span: 12 }, md:{ span: 12 }, lg:{ span: 12 }, xl : { span: 13 }},
            };
            const tailFormItemLayout = { 
                wrapperCol: {xs: {span: 0,offset: 0,}, sm: {span: 13,offset: 11,}, md: {span: 13,offset: 11,}, lg: {span: 13,offset: 11,}, xl: {span: 13,offset: 11,}},
            };
            return(
                <Drawer
                    title={edit === false ? <FormattedMessage id="general.modal-title.title"/> : visualizar == true ? <FormattedMessage id="general.modal-visualize"/> : <FormattedMessage id="general.modal-title.Edit"/>} 
                    width={isMobile ? "100%" : 550}
                    closable={true}
                    onClose={this.closeDrawerProduct}
                    visible={this.props.visibleNewDrawer}
                >
                    <Form {...formItemLayout}>
                        <Spin tip={formatMessage({id: "general.loading"})} spinning={loading}>
                            {edit == false && 
                                <div>
                                    <Row>
                                        <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                            <Form.Item label={formatMessage({id: "general.calendar.week"})}>
                                                {getFieldDecorator('weekNew',{rules: [{ required: true, message: formatMessage({id: "general.modal-date"}) }]})
                                                    (<DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} onChange={this.onChange} allowClear={false}/>)
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                            <Form.Item label={formatMessage({id: "general.button-product.product"})}>
                                                {getFieldDecorator('productNew',{rules: [{ required: true, message: formatMessage({id: "general.modal-product"}) }]})
                                                    (<Select showSearch style={{ width: 200 }} placeholder={formatMessage({id: "component-placeholder-product"})} optionFilterProp="children" onChange={this.onChangeProd} style={{ width: '100%' }}
                                                        onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                                            <Form.Item label={formatMessage({id: "general.button-center.center"})}>
                                                {getFieldDecorator('customerNew',{rules: [{ required: true, message: formatMessage({id: "general.modal-customer"}) }] })
                                                    (<Select showSearch style={{ width: 200 }} placeholder={formatMessage({id: "component-placeholder-center"})} optionFilterProp="children" onChange={this.onChangeCent} style={{ width: '100%' }}
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
                                                                <InputNumber min={0} value={inputsPallets[0]} onChange={(value) => this.calculatorInputs(value, 'pallet', 0)}/>                                                        
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[0]} onChange={(value) => this.calculatorInputs(value, 'box', 0)}/>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[1]} >
                                                        <Row>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsPallets[1]} onChange={(value) => this.calculatorInputs(value, 'pallet', 1)}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[1]} onChange={(value) => this.calculatorInputs(value, 'box', 1)}/> 
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
                                                                <InputNumber min={0} value={inputsPallets[2]} onChange={(value) => this.calculatorInputs(value, 'pallet', 2)}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[2]} onChange={(value) => this.calculatorInputs(value, 'box', 2)}/>
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
                                                                <InputNumber min={0} value={inputsPallets[3]} onChange={(value) => this.calculatorInputs(value, 'pallet', 3)}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[3]} onChange={(value) => this.calculatorInputs(value, 'box', 3)}/>
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
                                                                <InputNumber min={0} value={inputsPallets[4]} onChange={(value) => this.calculatorInputs(value, 'pallet', 4)}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[4]} onChange={(value) => this.calculatorInputs(value, 'box', 4)}/>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[5]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsPallets[5]} onChange={(value) => this.calculatorInputs(value, 'pallet', 5)}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[5]} onChange={(value) => this.calculatorInputs(value, 'box', 5)}/>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={dateRanger[6]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsPallets[6]} onChange={(value) => this.calculatorInputs(value, 'pallet', 6)}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxes[6]} onChange={(value) => this.calculatorInputs(value, 'box', 6)}/>
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
                                                                <label>{this.sumInputsPallets(inputsPallets)}</label>
                                                            </Col>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                                <label>{this.sumInputsBoxes(inputsBoxes)}</label>
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
                            {edit == true && this.chargerInputProducts(boxesEdit, palletsEdit, datesGetProgramming) &&
                                <div>
                                    {datesGetProgramming.length != 0 &&
                                        <div>
                                            <Row>
                                                <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.calendar.week"})}>
                                                        {getFieldDecorator('weekEdit',{initialValue: moment(datesGetProgramming[0].startDate, "YYYY-MM-DD"), rules: [{ required: true, message: formatMessage({id: "general.modal-date"}) }]})
                                                            (<DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} format="YYYY-MM-DD" onChange={this.onChange} disabled={edit == true ? true : false}/>)
                                                        }
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.button-product.product"})}>
                                                        {getFieldDecorator('productEdit',{initialValue: datesGetProgramming[0].skProduct, rules: [{ required: true, message: formatMessage({id: "general.modal-product"}) }]})
                                                            (<Select showSearch style={{ width: 200 }} placeholder={formatMessage({id: "component-placeholder-product"})} optionFilterProp="children" onChange={this.onChangeProd} style={{ width: '100%' }}
                                                                onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd}filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}  disabled={edit == true ? true : false}
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
                                                    <Form.Item label={formatMessage({id: "general.button-center.center"})}>
                                                        {getFieldDecorator('customerEdit',{initialValue: datesGetProgramming[0].skCustomer, rules: [{ required: true, message: formatMessage({id: "general.modal-customer"}) }]})
                                                            (<Select showSearch style={{ width: 200 }} placeholder={formatMessage({id: "component-placeholder-center"})} optionFilterProp="children" onChange={this.onChangeCent} style={{ width: '100%' }}
                                                                onFocus={this.onFocusCent} onBlur={this.onBlurCent} onSearch={this.onSearchCent} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} disabled={edit == true ? true : false}
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
                                                    <Form.Item label={datesGetProgramming[0].dates[0].date}>
                                                        <Row>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsPalletsEdit[0]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 0)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[0]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 0)} disabled={visualizar == true ? true : false}/>
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
                                                                <InputNumber min={0} value={inputsPalletsEdit[1]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 1)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[1]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 1)} disabled={visualizar == true ? true : false}/>
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
                                                                <InputNumber min={0} value={inputsPalletsEdit[2]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 2)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[2]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 2)} disabled={visualizar == true ? true : false}/>
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
                                                                <InputNumber min={0} value={inputsPalletsEdit[3]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 3)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[3]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 3)} disabled={visualizar == true ? true : false}/>
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
                                                                <InputNumber min={0} value={inputsPalletsEdit[4]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 4)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[4]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 4)} disabled={visualizar == true ? true : false}/>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[5].date : dateRanger[5]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsPalletsEdit[5]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 5)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[5]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 5)} disabled={visualizar == true ? true : false}/>
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[6].date : dateRanger[6]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsPalletsEdit[6]} onChange={(value) => this.calculatorInputsEdit(value, 'pallet', 6)} disabled={visualizar == true ? true : false}/>                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                <InputNumber min={0} value={inputsBoxesEdit[6]} onChange={(value) => this.calculatorInputsEdit(value, 'box', 6)} disabled={visualizar == true ? true : false}/>
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
                                                                <label>{this.sumInputsPalletsEdit(inputsPalletsEdit)}</label>
                                                            </Col>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                            <label>{this.sumInputsBoxesEdit(inputsBoxesEdit)}</label>
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
                            <Button type="danger" onClick={this.closeDrawerProduct} style={{ marginRight: 8 }}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            {visualizar == false &&
                                <Button type="primary" onClick={() => {handleSubmit(inputsPallets, inputsBoxes , dateIso, weekNewUntil,inputsPalletsEdit,inputsBoxesEdit)}}>
                                    <FormattedMessage id="general.modal.accept"/>
                                </Button>
                            }
                        </div>
                    </Form>
                </Drawer>
            )
        }
    }
);

export default DrawerGeneralProgramming;