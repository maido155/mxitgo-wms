import React, { PureComponent } from 'react';
import { Drawer, Form, Row, Col, DatePicker, Select, InputNumber, Button, Divider, Spin, message } from 'antd'; 
import {isMobile} from 'react-device-detect';
import { FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import moment from 'moment';
const { Option } = Select;

function disabledDate(current) {
    mulInputs = {
        palletOne: 0,
        palletTwo: 0,
        palletThree: 0,
        palletFour: 0,
        palletFive: 0
    }
    sumInputs = {
        boxOne: 0,
        boxTwo: 0,
        boxThree: 0,
        boxFour: 0,
        boxFive: 0
    }
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
    if(dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday){
        return true;
    }
}
var mulInputs = {
    palletOne: 0,
    palletTwo: 0,
    palletThree: 0,
    palletFour: 0,
    palletFive: 0
}
var sumInputs = {
    boxOne: 0,
    boxTwo: 0,
    boxThree: 0,
    boxFour: 0,
    boxFive: 0
}
const DrawerGeneralProgramming  = Form.create()(
    class extends React.Component {
        state = {
            dateRanger : [],
            multiBoxes: {one: 0, two: 0, three: 0, four: 0, five: 0},
            sumPallets: 0,
            sumBoxes: 0,
            weekNewUntil: 0,
            dateIso: []
        }
        onChange = (date, dateString) => {
            var dateShow = [];
            var since = moment(dateString);
            var until = moment(dateString)
            until.add(6, 'days');
            this.setState({weekNewUntil: until})
            var dateAllRange = this.betweenDate(since, until);
            for(var i = 0; i < dateAllRange.length; i++){
                let nameDate = moment(dateAllRange[i]).format('dddd DD MMMM')
                dateShow.push(nameDate);
            }
            this.props.dataInputShow();
            this.props.mRangeEdit();
            this.setState({
                dateRanger: dateShow,
                sumPallets: 0,
                sumBoxes: 0,
                multiBoxes: {one: 0, two: 0, three: 0, four: 0, five: 0}
            });
            const form = this.props.form;
            form.resetFields("palletOneNew");
            form.resetFields("palletTwoNew");
            form.resetFields("palletThreeNew");
            form.resetFields("palletFourNew");
            form.resetFields("palletFiveNew");
            this.resetInputs();
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
        resetInputs = () => {
            mulInputs = {
                palletOne: 0,
                palletTwo: 0,
                palletThree: 0,
                palletFour: 0,
                palletFive: 0
            }
            sumInputs = {
                boxOne: 0,
                boxTwo: 0,
                boxThree: 0,
                boxFour: 0,
                boxFive: 0
            }
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
            console.log(`selected ${value}`);
            this.setState({multiBoxes: {one: 0, two: 0, three: 0, four: 0, five: 0}, sumPallets: 0, sumBoxes: 0})
            const form = this.props.form;
            this.resetInputs();
            form.resetFields("palletOneNew");
            form.resetFields("palletTwoNew");
            form.resetFields("palletThreeNew");
            form.resetFields("palletFourNew");
            form.resetFields("palletFiveNew");
        } 
        handleChangePallet = (value, name) => {
            this.validationProduct();
            var palletvsBoxes = this.props.datesProductAll;
            const form = this.props.form;
            let data = form.getFieldsValue();
            var productName = data.productNew;
            var quantityBoxes = 0;
            var sumBoxes = 0;
            for(var i = 0; i < palletvsBoxes.length; i++){
                if(palletvsBoxes[i]["WMS-1-SK"] == productName){
                    quantityBoxes = palletvsBoxes[i].quantityBoxes;
                }
            }
            switch (name) {
                case "palletOne":
                    mulInputs.palletOne = value;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumBoxes = (mulInputs.palletOne * quantityBoxes) + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive;                    
                    form.resetFields("boxOneNew");
                    break;
                case "palletTwo":
                    mulInputs.palletTwo = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumBoxes = (mulInputs.palletTwo * quantityBoxes) + sumInputs.boxOne + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive;
                    form.resetFields("boxTwoNew");
                    break;
                case "palletThree":
                    mulInputs.palletThree = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumBoxes = (mulInputs.palletThree * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxFour + sumInputs.boxFive;
                    form.resetFields("boxThreeNew");
                    break;
                case "palletFour":
                    mulInputs.palletFour = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumBoxes = (mulInputs.palletFour * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFive;
                    form.resetFields("boxFourNew");
                    break;
                case "palletFive":
                    mulInputs.palletFive = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumBoxes = (mulInputs.palletFive * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour;
                    form.resetFields("boxFiveNew");
                    break;
                default:
                    break;
            }
            var sumPallets = mulInputs.palletOne + mulInputs.palletTwo + mulInputs.palletThree + mulInputs.palletFour + mulInputs.palletFive;
            this.setState({
                sumPallets: sumPallets,
                multiBoxes: { 
                    one : mulInputs.palletOne * quantityBoxes,
                    two: mulInputs.palletTwo * quantityBoxes,
                    three: mulInputs.palletThree * quantityBoxes,
                    four: mulInputs.palletFour * quantityBoxes,
                    five: mulInputs.palletFive * quantityBoxes
                },
                sumBoxes: sumBoxes,
            })
        }
        handleChangeBox = (value, name) => {
            this.validationProduct();
            const form = this.props.form;
            let data = form.getFieldsValue();
            switch (name) {
                case "boxOne":
                    sumInputs.boxOne = value;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    break;
                case "boxTwo":
                    sumInputs.boxTwo = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    break;
                case "boxThree":
                    sumInputs.boxThree = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    break;
                case "boxFour":
                    sumInputs.boxFour = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    break;
                case "boxFive":
                    sumInputs.boxFive = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    break;
                default:
                    break;
            }
            var sumBoxes = sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive;
            this.setState({
                sumBoxes: sumBoxes,
            })
        }
        validationProduct = () => {
            const form = this.props.form;
            let data = form.getFieldsValue(); 
            if(data.productNew == undefined){
                message.warning(formatMessage({ id: 'general.modal-product' }));
            }
        }
        handleChangePalletEdit = (value, name) => {
            this.props.showeditSumPallet();
            this.props.showeditSumBoxes();
            if(this.props.edit){
                this.resetInputs();
            }
            var palletvsBoxes = this.props.datesProductAll;
            const form = this.props.form;
            let data = form.getFieldsValue();
            var productName = data.productEdit;
            var quantityBoxes = 0;
            var sumBoxes = 0;
            var multBoxes = {
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0
            }
            for(var i = 0; i < palletvsBoxes.length; i++){
                if(palletvsBoxes[i]["WMS-1-SK"] == productName){
                    quantityBoxes = palletvsBoxes[i].quantityBoxes;
                }
            }
            switch (name) {
                case "palletOneEdit":
                    mulInputs.palletOne = value;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    if((mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour * quantityBoxes) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveNew){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                    }else{
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit;
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                    }
                    sumBoxes = (mulInputs.palletOne * quantityBoxes) + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive;   
                    form.resetFields("boxOneEdit");
                    break;
                case "palletTwoEdit":
                    mulInputs.palletTwo = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour * quantityBoxes) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveNew){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                    }
                    sumBoxes = (mulInputs.palletTwo * quantityBoxes) + sumInputs.boxOne + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive; 
                    form.resetFields("boxTwoEdit");
                    break;
                    case "palletThreeEdit":
                        mulInputs.palletThree = value;
                        mulInputs.palletOne = data.palletOneEdit;
                        mulInputs.palletTwo = data.palleTwoEdit;
                        mulInputs.palletFour = data.palleFourEdit;
                        mulInputs.palletFive = data.palleFiveEdit;
                        sumInputs.boxOne = data.boxOneEdit;
                        sumInputs.boxTwo = data.boxTwoEdit;
                        sumInputs.boxFour = data.boxFourEdit;
                        sumInputs.boxFive = data.boxFiveEdit;
                        if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletFour * quantityBoxes) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveNew){
                            multBoxes.one = mulInputs.palletOne * quantityBoxes;
                            multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                            multBoxes.three = mulInputs.palletThree * quantityBoxes;
                            multBoxes.four = mulInputs.palletFour * quantityBoxes;
                            multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        }else{
                            multBoxes.one = data.boxOneEdit;
                            multBoxes.two = data.boxTwoEdit;
                            multBoxes.three = mulInputs.palletThree * quantityBoxes;
                            multBoxes.four = data.boxFourEdit;
                            multBoxes.five = data.boxFiveEdit;
                        }
                        sumBoxes = (mulInputs.palletThree * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxFour + sumInputs.boxFive;  
                        form.resetFields("boxThreeEdit");
                        break;
                    case "palletFourEdit":
                        mulInputs.palletFour = value;
                        mulInputs.palletOne = data.palletOneEdit;
                        mulInputs.palletTwo = data.palleTwoEdit;
                        mulInputs.palletThree = data.palleThreeEdit;
                        mulInputs.palletFive = data.palleFiveEdit;
                        sumInputs.boxOne = data.boxOneEdit;
                        sumInputs.boxTwo = data.boxTwoEdit;
                        sumInputs.boxThree = data.boxThreeEdit;
                        sumInputs.boxFive = data.boxFiveEdit;
                        if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveNew){
                            multBoxes.one = mulInputs.palletOne * quantityBoxes;
                            multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                            multBoxes.three = mulInputs.palletThree * quantityBoxes;
                            multBoxes.four = mulInputs.palletFour * quantityBoxes;
                            multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        }else{
                            multBoxes.one = data.boxOneEdit;
                            multBoxes.two = data.boxTwoEdit;
                            multBoxes.three = data.boxThreeEdit; 
                            multBoxes.four = mulInputs.palletFour * quantityBoxes;
                            multBoxes.five = data.boxFiveEdit;
                        }
                        sumBoxes = (mulInputs.palletFour * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFive; 
                        form.resetFields("boxFourEdit");
                        break;
                case "palletFiveEdit":
                    mulInputs.palletFive = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour) == data.boxFourEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                    }
                    sumBoxes = (mulInputs.palletFive * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour; 
                    form.resetFields("boxFiveEdit");
                    break;
                default:
                    break;
            }
            var sumPallets = mulInputs.palletOne + mulInputs.palletTwo + mulInputs.palletThree + mulInputs.palletFour + mulInputs.palletFive;
            this.setState({
                sumPallets: sumPallets,
                multiBoxes: { 
                    one : multBoxes.one,
                    two: multBoxes.two,
                    three: multBoxes.three,
                    four: multBoxes.four,
                    five: multBoxes.five
                },
                sumBoxes: sumBoxes
            })  
        }
        handleChangeBoxEdit = (value, name) => {
            this.props.showeditSumBoxes();
            const form = this.props.form;
            let data = form.getFieldsValue();
            if(this.props.edit){
                this.resetInputs();
            }
            switch (name) {
                case "boxOne":
                    sumInputs.boxOne = value;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    break;
                case "boxTwo":
                    sumInputs.boxTwo = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    break;
                case "boxThree":
                    sumInputs.boxThree = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    break;
                case "boxFour":
                    sumInputs.boxFour = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    break;
                case "boxFive":
                    sumInputs.boxFive = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    break;
                default:
                    break;
            }
            var sumBoxes = sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive;
            this.setState({
                sumBoxes: sumBoxes,
            })
        }
        render(){
            const formItemLayout = {
                labelCol: {xs:{ span: 12}, sm:{ span: 10 }, md:{ span: 10 }, lg:{ span: 10 }, xl: { span: 10 }},
                wrapperCol: {xs:{ span: 12}, sm:{ span: 14 }, md:{ span: 14 }, lg:{ span: 14 }, xl : { span: 14 }},
            };
            const tailFormItemLayout = { 
                wrapperCol: {xs: {span: 0,offset: 0,}, sm: {span: 13,offset: 11,}, md: {span: 13,offset: 11,}, lg: {span: 13,offset: 11,}, xl: {span: 13,offset: 11,}},
            };
            const { edit, loading, datesProductAll, datesCustomerAll, rangePicker, handleSubmit, datesGetProgramming, rangeEdit, editSumPallet, editSumBoxes } = this.props;
            const { getFieldDecorator } = this.props.form;
            const { dateRanger, multiBoxes, sumPallets, sumBoxes, weekNewUntil, dateIso } = this.state;
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
                                                {getFieldDecorator('weekNew',{rules: [{ required: true, message: formatMessage({id: "general.modal-date"}) }]})
                                                    (<DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} onChange={this.onChange}/>)
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                        <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                            <Form.Item label={formatMessage({id: "general.buttoon-product.product"})}>
                                                {getFieldDecorator('productNew',{rules: [{ required: true, message: formatMessage({id: "general.modal-product"}) }]})
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
                                                {getFieldDecorator('customerNew',{rules: [{ required: true, message: formatMessage({id: "general.modal-customer"}) }] })
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
                                                                {getFieldDecorator('palletOneNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletOne")}/>)}                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxOneNew',{initialValue: multiBoxes.one })(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxOne")}/>)}
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
                                                                {getFieldDecorator('palletTwoNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletTwo")}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxTwoNew',{initialValue: multiBoxes.two})(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxTwo")}/>)}  
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
                                                                {getFieldDecorator('palletThreeNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletThree")}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxThreeNew',{initialValue: multiBoxes.three})(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxThree")}/>)}
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
                                                                {getFieldDecorator('palletFourNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletFour")}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFourNew',{initialValue: multiBoxes.four})(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxFour")}/>)}
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
                                                                {getFieldDecorator('palletFiveNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletFive")}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFiveNew',{initialValue: multiBoxes.five})(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxFive")}/>)}
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
                                                        {getFieldDecorator('weekEdit',{initialValue: moment(datesGetProgramming[0].startDate, "YYYY-MM-DD"), rules: [{ required: true, message: formatMessage({id: "general.modal-date"}) }]})
                                                            (<DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} format="YYYY-MM-DD" onChange={this.onChange}/>)
                                                        }
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={5}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={1} md={1} lg={1} xl={1}></Col>
                                                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={formatMessage({id: "general.buttoon-product.product"})}>
                                                        {getFieldDecorator('productEdit',{initialValue: datesGetProgramming[0].skProduct, rules: [{ required: true, message: formatMessage({id: "general.modal-product"}) }]})
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
                                                        {getFieldDecorator('customerEdit',{initialValue: datesGetProgramming[0].skCustomer, rules: [{ required: true, message: formatMessage({id: "general.modal-customer"}) }]})
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
                                                                {getFieldDecorator('palletOneEdit',{initialValue: datesGetProgramming[0].dates[0].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletOneEdit")}/>)}                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxOneEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[0].caja : multiBoxes.one})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxOne")}/>)}
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
                                                                {getFieldDecorator('palleTwoEdit',{initialValue: datesGetProgramming[0].dates[1].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletTwoEdit")}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxTwoEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[1].caja : multiBoxes.two})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxTwo")}/>)}  
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
                                                                {getFieldDecorator('palleThreeEdit',{initialValue: datesGetProgramming[0].dates[2].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletThreeEdit")}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxThreeEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[2].caja : multiBoxes.three})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxThree")}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[3].date : dateRanger[5]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palleFourEdit',{initialValue: datesGetProgramming[0].dates[3].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletFourEdit")}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFourEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[3].caja : multiBoxes.four})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxFour")}/>)}
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={0} sm={5} md={5} lg={5} xl={3}></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={0} sm={3} md={3} lg={3} xl={3}></Col>
                                                <Col xs={16} sm={18} md={18} lg={18} xl={18}>
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[4].date : dateRanger[6]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palleFiveEdit',{initialValue: datesGetProgramming[0].dates[4].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletFiveEdit")}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFiveEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[4].caja : multiBoxes.five})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxFive")}/>)}
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
                                                                <label>{editSumPallet == false ? datesGetProgramming[0].pallets : sumPallets}</label>
                                                            </Col>
                                                            <Col span={12} style={{textAlign: "center"}}>
                                                            <label>{editSumBoxes == false ? datesGetProgramming[0].boxes : sumBoxes}</label>
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
                            <Button type="primary" onClick={() => {handleSubmit(dateIso, weekNewUntil)}}>
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