import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {  Form, Select} from 'antd';
import { _ } from 'lodash';
import { Radio } from 'antd';

export default class SelectProduct extends PureComponent{
    render(){
        if(this.props.datesProductAll===undefined){
            return (
                <span> loading...</span>
            );
        }
        let productsFilter=this.props.datesProductAll.filter(item=> item.type=="Primary")
        return(
            
                <Select 
                        showSearch 
                        style={{ width: 140 }} 
                        placeholder={formatMessage({id: "component-placeholder-product"})} 
                        optionFilterProp="children" 
                        onSelect={this.props.handleProduct}
                        onFocus={this.onFocusProd} onBlur={this.onBlurProd} onSearch={this.onSearchProd} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {productsFilter.map(item => (<Option key={item["WMS-1-SK"]} value={item["WMS-1-SK"]}>{item.productName}</Option>))}
                    </Select>
                
            
        
        );
    }
}