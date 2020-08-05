import React, { PureComponent } from 'react';
import { Row, Form, DatePicker, Select,Col} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';


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

class FilterFormOutcomingForm extends PureComponent {
    state = {
        pallets: 0,
        box: 0,
        isFirstTime: true,
        // newBoxValue: 0,
        currentValuePallet: 0,
        currentValueBox: 0
    }

    componentDidMount() {}

    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 12 },sm: { span: 12 },md: { span: 10 },lg: { span: 10 },xl: { span: 10 }},
            wrapperCol: {xs: { span: 12 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14 }}
        };
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.datesProductAll===undefined)
       if(this.props.datesProductAll===undefined){
            return (
                <span>loading...</span>
            );
        } 
       /*  const menuProduct = (
            <Menu onClick={(e)=>{this.handleProduct(e,this)}}>

                {this.props.datesProductAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.productName}</Menu.Item>))}

            </Menu>
          );

          const menuClient = (
            <Menu onClick={(e)=>{this.handleClient(e,this)}} >
                {this.props.datesCustomerAll.map(item => (<Menu.Item key={item["WMS-1-SK"]}>{item.clientName}</Menu.Item>))}
            </Menu>
          ); */

        
        return (
            

                
                
                <Form style={{paddingRight:"2rem"}} layout="inline" >    
                        <Form.Item {...formItemLayout} label={formatMessage({id: "general.calendar.week"})}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: 120 }} 
                            disabledDate={disabledDate} onChange={(date,dateString)=>{this.props.onChangeWeek(date,dateString,this)}}/>
                        </Form.Item>
                            <Form.Item {...formItemLayout} label={formatMessage({id: "general.buttoon-product.product"})} >
                                {getFieldDecorator('productNew',
                                    {
                                        rules: [
                                        {   
                                            message: formatMessage({id: "general.modal-product"}) 
                                        }]
                                    })
                                    (<Select 
                                        showSearch 
                                        style={{ width: 140 }} 
                                        placeholder="Select product" 
                                        optionFilterProp="children" 
                                        onSelect={this.props.handleProduct}
                                        onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {this.props.datesProductAll.map(item => (<Option key={item["WMS-1-SK"]} value={item["WMS-1-SK"]}>{item.productName}</Option>))}
                                    </Select>)
                                }
                            </Form.Item>
                    
                    
                            <Form.Item {...formItemLayout} label={formatMessage({id: "general.buttoon-center.center"})}>
                                {getFieldDecorator('customerNew',
                                    {rules: [
                                        {
                                            message: formatMessage({id: "general.modal-customer"}) 
                                        }] 
                                    })
                                        (<Select showSearch 
                                            style={{ width: 140 }} 
                                            placeholder="Select center" 
                                            optionFilterProp="children" 
                                            onSelect={this.props.handleClient}
                                            onFocus={this.onFocusCent} 
                                            onBlur={this.onBlurCent} onSearch={this.onSearchCent} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {this.props.datesCustomerAll.map(item => (<Option value={item["WMS-1-SK"]}>{item.clientName}</Option>))}
                                        </Select>)
                                    }
                            </Form.Item>
                    </Form>
                
                
            
        );            
    }
}

const FilterFormOutcoming = Form.create({ name: 'filterForms' })(FilterFormOutcomingForm);

export default FilterFormOutcoming;