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
        palletFive: 0,
        palletSix: 0,
        palletSeven: 0
    }
    sumInputs = {
        boxOne: 0,
        boxTwo: 0,
        boxThree: 0,
        boxFour: 0,
        boxFive: 0,
        boxSix: 0,
        boxSeven: 0
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
    if(dateAll === compareMonday || dateAll === compareThursday || dateAll === compareTuesday || dateAll === compareFriday || dateAll === compareSaturday || dateAll === compareSunday || current < moment().endOf('day')){
        return true;
    }
}
var mulInputs = {
    palletOne: 0,
    palletTwo: 0,
    palletThree: 0,
    palletFour: 0,
    palletFive: 0,
    palletSix: 0,
    palletSeven: 0
}
var sumInputs = {
    boxOne: 0,
    boxTwo: 0,
    boxThree: 0,
    boxFour: 0,
    boxFive: 0,
    boxSix: 0,
    boxSeven: 0
}
const DrawerGeneralProgramming  = Form.create()(
    class extends React.Component {
        state = {
            dateRanger : [],
            multiBoxes: {one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0},
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
                let nameDate = moment(dateAllRange[i]).format('dddd DD MMMM');
                let splitDate = nameDate.split(" ");
                var dateDay = splitDate[0].charAt(0).toUpperCase() + splitDate[0].slice(1);
                var dateMonth = splitDate[2].charAt(0).toUpperCase() + splitDate[2].slice(1);
                var dateAll = dateDay + " " + splitDate[1] + " " + dateMonth;
                dateShow.push(dateAll);
            }
            this.props.dataInputShow();
            this.props.mRangeEdit();
            this.setState({
                dateRanger: dateShow,
            });
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
                palletFive: 0,
                palletSix: 0,
                palletSeven: 0
            }
            sumInputs = {
                boxOne: 0,
                boxTwo: 0,
                boxThree: 0,
                boxFour: 0,
                boxFive: 0,
                boxSix: 0,
                boxSeven: 0
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
            this.setState({multiBoxes: {one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0}, sumPallets: 0, sumBoxes: 0})
            const form = this.props.form;
            this.resetInputs();
            form.resetFields("palletOneNew");
            form.resetFields("palletTwoNew");
            form.resetFields("palletThreeNew");
            form.resetFields("palletFourNew");
            form.resetFields("palletFiveNew");
            form.resetFields("palletSixNew");
            form.resetFields("palletSevenNew");
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
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    sumBoxes = (mulInputs.palletOne * quantityBoxes) + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;                 
                    form.resetFields("boxOneNew");
                    break;
                case "palletTwo":
                    mulInputs.palletTwo = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    sumBoxes = (mulInputs.palletTwo * quantityBoxes) + sumInputs.boxOne + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;
                    form.resetFields("boxTwoNew");
                    break;
                case "palletThree":
                    mulInputs.palletThree = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    sumBoxes = (mulInputs.palletThree * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;
                    form.resetFields("boxThreeNew");
                    break;
                case "palletFour":
                    mulInputs.palletFour = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    sumBoxes = (mulInputs.palletFour * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;
                    form.resetFields("boxFourNew");
                    break;
                case "palletFive":
                    mulInputs.palletFive = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    sumBoxes = (mulInputs.palletFive * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxSix + sumInputs.boxSeven;
                    form.resetFields("boxFiveNew");
                    break;
                case "palletSix":
                    mulInputs.palletSix = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    sumBoxes = (mulInputs.palletSix * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSeven;
                    form.resetFields("boxSixNew");
                    break;
                case "palletSeven":
                    mulInputs.palletSeven = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumBoxes = (mulInputs.palletSeven * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix;
                    form.resetFields("boxSevenNew");
                    break;
                default:
                    break;
            }
            var sumPallets = mulInputs.palletOne + mulInputs.palletTwo + mulInputs.palletThree + mulInputs.palletFour + mulInputs.palletFive + mulInputs.palletSix + mulInputs.palletSeven;
            this.setState({
                sumPallets: sumPallets,
                multiBoxes: { 
                    one : mulInputs.palletOne * quantityBoxes,
                    two: mulInputs.palletTwo * quantityBoxes,
                    three: mulInputs.palletThree * quantityBoxes,
                    four: mulInputs.palletFour * quantityBoxes,
                    five: mulInputs.palletFive * quantityBoxes,
                    six: mulInputs.palletSix * quantityBoxes,
                    seven: mulInputs.palletSeven * quantityBoxes
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
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    break;
                case "boxTwo":
                    sumInputs.boxTwo = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    break;
                case "boxThree":
                    sumInputs.boxThree = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    break;
                case "boxFour":
                    sumInputs.boxFour = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    break;
                case "boxFive":
                    sumInputs.boxFive = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxSix = data.boxSixNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    break;
                case "boxSix":
                    sumInputs.boxSix = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSeven = data.boxSevenNew;
                    break;
                case "boxSeven":
                    sumInputs.boxSeven = value;
                    sumInputs.boxOne = data.boxOneNew;
                    sumInputs.boxTwo = data.boxTwoNew;
                    sumInputs.boxThree = data.boxThreeNew;
                    sumInputs.boxFour = data.boxFourNew;
                    sumInputs.boxFive = data.boxFiveNew;
                    sumInputs.boxSix = data.boxSixNew;
                    break;
                default:
                    break;
            }
            var sumBoxes = sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;
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




    // ********************************************************
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
                five: 0,
                six: 0,
                seven: 0
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
                    mulInputs.palletSix = data.palleSixEdit;
                    mulInputs.palletSeven = data.palleSevenEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    if((mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour * quantityBoxes) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveEdit || (mulInputs.palletSix * quantityBoxes) == data.boxSixEdit || (mulInputs.palletSeven * quantityBoxes) == data.boxSevenEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit;
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                        multBoxes.six = data.boxSixEdit;
                        multBoxes.seven = data.boxSevenEdit;
                    }
                    sumBoxes = (mulInputs.palletOne * quantityBoxes) + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;   
                    form.resetFields("boxOneEdit");
                    break;
                case "palletTwoEdit":
                    mulInputs.palletTwo = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    mulInputs.palletSix = data.palleSixEdit;
                    mulInputs.palletSeven = data.palleSevenEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour * quantityBoxes) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveEdit || (mulInputs.palletSix * quantityBoxes) == data.boxSixEdit || (mulInputs.palletSeven * quantityBoxes) == data.boxSevenEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                        multBoxes.six = data.boxSixEdit;
                        multBoxes.seven = data.boxSevenEdit;
                    }
                    sumBoxes = (mulInputs.palletTwo * quantityBoxes) + sumInputs.boxOne + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven; 
                    form.resetFields("boxTwoEdit");
                    break;
                case "palletThreeEdit":
                    mulInputs.palletThree = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    mulInputs.palletSix = data.palleSixEdit;
                    mulInputs.palletSeven = data.palleSevenEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletFour * quantityBoxes) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveEdit || (mulInputs.palletSix * quantityBoxes) == data.boxSixEdit || (mulInputs.palletSeven * quantityBoxes) == data.boxSevenEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                        multBoxes.six = data.boxSixEdit;
                        multBoxes.seven = data.boxSevenEdit;
                    }
                    sumBoxes = (mulInputs.palletThree * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;
                    form.resetFields("boxThreeEdit");
                    break;
                case "palletFourEdit":
                    mulInputs.palletFour = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    mulInputs.palletSix = data.palleSixEdit;
                    mulInputs.palletSeven = data.palleSevenEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveEdit || (mulInputs.palletSix * quantityBoxes) == data.boxSixEdit || (mulInputs.palletSeven * quantityBoxes) == data.boxSevenEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = data.boxFiveEdit;
                        multBoxes.six = data.boxSixEdit;
                        multBoxes.seven = data.boxSevenEdit;
                    }
                    sumBoxes = (mulInputs.palletFour * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven; 
                    form.resetFields("boxFourEdit");
                    break;
                case "palletFiveEdit":
                    mulInputs.palletFive = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletSix = data.palleSixEdit;
                    mulInputs.palletSeven = data.palleSevenEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    if((mulInputs.palletOne * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour) == data.boxFourEdit || (mulInputs.palletSix * quantityBoxes) == data.boxSixEdit || (mulInputs.palletSeven * quantityBoxes) == data.boxSevenEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = data.boxSixEdit;
                        multBoxes.seven = data.boxSevenEdit;
                    }
                    sumBoxes = (mulInputs.palletFive * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxSix + sumInputs.boxSeven;
                    form.resetFields("boxFiveEdit");
                    break;
                case "palletSixEdit":
                    mulInputs.palletSix = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    mulInputs.palletSeven = data.palleSevenEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    if((mulInputs.palletSix * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveEdit || (mulInputs.palletSeven * quantityBoxes) == data.boxSevenEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = data.boxSevenEdit;
                    }
                    sumBoxes = (mulInputs.palletSix * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSeven;
                    form.resetFields("boxSixEdit");
                    break; 
                case "palletSevenEdit":
                    mulInputs.palletSeven = value;
                    mulInputs.palletOne = data.palletOneEdit;
                    mulInputs.palletTwo = data.palleTwoEdit;
                    mulInputs.palletThree = data.palleThreeEdit;
                    mulInputs.palletFour = data.palleFourEdit;
                    mulInputs.palletFive = data.palleFiveEdit;
                    mulInputs.palletSix = data.palleSixEdit;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    if((mulInputs.palletSeven * quantityBoxes) == data.boxOneEdit || (mulInputs.palletTwo * quantityBoxes) == data.boxTwoEdit || (mulInputs.palletThree * quantityBoxes) == data.boxThreeEdit || (mulInputs.palletFour) == data.boxFourEdit || (mulInputs.palletFive * quantityBoxes) == data.boxFiveEdit || (mulInputs.palletSix * quantityBoxes) == data.boxSixEdit){
                        multBoxes.one = mulInputs.palletOne * quantityBoxes;
                        multBoxes.two = mulInputs.palletTwo * quantityBoxes;
                        multBoxes.three = mulInputs.palletThree * quantityBoxes;
                        multBoxes.four = mulInputs.palletFour * quantityBoxes;
                        multBoxes.five = mulInputs.palletFive * quantityBoxes;
                        multBoxes.six = mulInputs.palletSix * quantityBoxes;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }else{
                        multBoxes.one = data.boxOneEdit;
                        multBoxes.two = data.boxTwoEdit;
                        multBoxes.three = data.boxThreeEdit; 
                        multBoxes.four = data.boxFourEdit;
                        multBoxes.five = data.boxFiveEdit;
                        multBoxes.six = data.boxSixEdit;
                        multBoxes.seven = mulInputs.palletSeven * quantityBoxes;
                    }
                    sumBoxes = (mulInputs.palletSeven * quantityBoxes) + sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix;
                    form.resetFields("boxSevenEdit");
                    break;           
                default:
                    break;
            }
            var sumPallets = mulInputs.palletOne + mulInputs.palletTwo + mulInputs.palletThree + mulInputs.palletFour + mulInputs.palletFive + mulInputs.palletSix + mulInputs.palletSeven;
            this.setState({
                sumPallets: sumPallets,
                multiBoxes: { 
                    one : multBoxes.one,
                    two: multBoxes.two,
                    three: multBoxes.three,
                    four: multBoxes.four,
                    five: multBoxes.five,
                    six: multBoxes.six,
                    seven: multBoxes.seven
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
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    break;
                case "boxTwo":
                    sumInputs.boxTwo = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    break;
                case "boxThree":
                    sumInputs.boxThree = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    break;
                case "boxFour":
                    sumInputs.boxFour = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    break;
                case "boxFive":
                    sumInputs.boxFive = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    break;
                case "boxSix":
                    sumInputs.boxSix = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSeven = data.boxSevenEdit;
                    break;   
                case "boxSeven":
                    sumInputs.boxSeven = value;
                    sumInputs.boxOne = data.boxOneEdit;
                    sumInputs.boxTwo = data.boxTwoEdit;
                    sumInputs.boxThree = data.boxThreeEdit;
                    sumInputs.boxFour = data.boxFourEdit;
                    sumInputs.boxFive = data.boxFiveEdit;
                    sumInputs.boxSix = data.boxSixEdit;
                    break;       
                default:
                    break;
            }
            var sumBoxes = sumInputs.boxOne + sumInputs.boxTwo + sumInputs.boxThree + sumInputs.boxFour + sumInputs.boxFive + sumInputs.boxSix + sumInputs.boxSeven;
            this.setState({
                sumBoxes: sumBoxes,
            })
        }
        render(){
            const formItemLayout = {
                labelCol: {xs:{ span: 12}, sm:{ span: 12 }, md:{ span: 12 }, lg:{ span: 12 }, xl: { span: 11 }},
                wrapperCol: {xs:{ span: 12}, sm:{ span: 12 }, md:{ span: 12 }, lg:{ span: 12 }, xl : { span: 13 }},
            };
            const tailFormItemLayout = { 
                wrapperCol: {xs: {span: 0,offset: 0,}, sm: {span: 13,offset: 11,}, md: {span: 13,offset: 11,}, lg: {span: 13,offset: 11,}, xl: {span: 13,offset: 11,}},
            };
            const { edit, loading, datesProductAll, datesCustomerAll, rangePicker, handleSubmit, datesGetProgramming, rangeEdit, editSumPallet, editSumBoxes, visualizar } = this.props;
            const { getFieldDecorator } = this.props.form;
            const { dateRanger, multiBoxes, sumPallets, sumBoxes, weekNewUntil, dateIso } = this.state;
            return(
                <Drawer
                    title={edit == false ? <FormattedMessage id="general.modal-title.title"/> : visualizar == true ? <FormattedMessage id="general.modal-visualize"/> : <FormattedMessage id="general.modal-title.Edit"/>} 
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
                                                    <Form.Item label={dateRanger[1]} >
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
                                                    <Form.Item label={dateRanger[3]}>
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
                                                    <Form.Item label={dateRanger[4]}>
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
                                                    <Form.Item label={dateRanger[5]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletSixNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletSix")}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxSixNew',{initialValue: multiBoxes.six})(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxSix")}/>)}
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
                                                                {getFieldDecorator('palletSevenNew',{initialValue: 0})(<InputNumber min={0} onChange={(value) => this.handleChangePallet(value, "palletSeven")}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxSevenNew',{initialValue: multiBoxes.seven})(<InputNumber min={0} onChange={(value) => this.handleChangeBox(value, "boxSeven")}/>)}
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
                                                            (<DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} disabledDate={disabledDate} format="YYYY-MM-DD" onChange={this.onChange} disabled={edit == true ? true : false}/>)
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
                                                    <Form.Item label={formatMessage({id: "general.buttoon-center.center"})}>
                                                        {getFieldDecorator('customerEdit',{initialValue: datesGetProgramming[0].skCustomer, rules: [{ required: true, message: formatMessage({id: "general.modal-customer"}) }]})
                                                            (<Select showSearch style={{ width: 200 }} placeholder="Select center" optionFilterProp="children" onChange={this.onChangeCent} style={{ width: '100%' }}
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
                                                    <Form.Item label={rangeEdit == false ? datesGetProgramming[0].dates[0].date : dateRanger[0]}>
                                                        <Row>
                                                            <Col span={12}>
                                                                {getFieldDecorator('palletOneEdit',{initialValue: datesGetProgramming[0].dates[0].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletOneEdit")} disabled={visualizar == true ? true : false}/>)}                                                           
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxOneEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[0].box : multiBoxes.one})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxOne")} disabled={visualizar == true ? true : false}/>)}
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
                                                                {getFieldDecorator('palleTwoEdit',{initialValue: datesGetProgramming[0].dates[1].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletTwoEdit")} disabled={visualizar == true ? true : false}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxTwoEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[1].box : multiBoxes.two})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxTwo")} disabled={visualizar == true ? true : false}/>)}  
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
                                                                {getFieldDecorator('palleThreeEdit',{initialValue: datesGetProgramming[0].dates[2].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletThreeEdit")} disabled={visualizar == true ? true : false}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxThreeEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[2].box : multiBoxes.three})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxThree")} disabled={visualizar == true ? true : false}/>)}
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
                                                                {getFieldDecorator('palleFourEdit',{initialValue: datesGetProgramming[0].dates[3].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletFourEdit")} disabled={visualizar == true ? true : false}/>)}
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFourEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[3].box : multiBoxes.four})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxFour")} disabled={visualizar == true ? true : false}/>)}
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
                                                                {getFieldDecorator('palleFiveEdit',{initialValue: datesGetProgramming[0].dates[4].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletFiveEdit")} disabled={visualizar == true ? true : false}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxFiveEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[4].box : multiBoxes.five})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxFive")} disabled={visualizar == true ? true : false}/>)}
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
                                                                {getFieldDecorator('palleSixEdit',{initialValue: datesGetProgramming[0].dates[5].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletSixEdit")} disabled={visualizar == true ? true : false}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxSixEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[5].box : multiBoxes.six})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxSix")} disabled={visualizar == true ? true : false}/>)}
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
                                                                {getFieldDecorator('palleSevenEdit',{initialValue: datesGetProgramming[0].dates[6].pallet})(<InputNumber min={0} onChange={(value) => this.handleChangePalletEdit(value, "palletSevenEdit")} disabled={visualizar == true ? true : false}/>)}             
                                                            </Col>
                                                            <Col span={12}>
                                                                {getFieldDecorator('boxSevenEdit',{initialValue: editSumPallet == false ? datesGetProgramming[0].dates[6].box : multiBoxes.seven})(<InputNumber min={0} onChange={(value) => this.handleChangeBoxEdit(value, "boxSeven")} disabled={visualizar == true ? true : false}/>)}
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