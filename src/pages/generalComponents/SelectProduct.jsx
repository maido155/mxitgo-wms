import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {  Form, Select} from 'antd';
import { _ } from 'lodash';
import { Radio } from 'antd';

export default class SelectProduct extends PureComponent{
    render(){
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 9 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 9 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
          };
        if(this.props.datesProductAll===undefined){
            return (
                <span> loading...</span>
            );
        }
        return(
            
                <Select 
                        showSearch 
                        style={{ width: 140 }} 
                        placeholder="Select product" 
                        optionFilterProp="children" 
                        onSelect={this.props.handleProduct}
                        onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.props.datesProductAll.map(item => (<Option key={item["WMS-1-SK"]} value={item["WMS-1-SK"]}>{item.productName}</Option>))}
                    </Select>
                
            
        
        );
    }
}