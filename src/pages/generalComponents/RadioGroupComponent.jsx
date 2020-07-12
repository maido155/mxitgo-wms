import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash';
import { Radio } from 'antd';

export default class RadioGroupComponent extends PureComponent{
    render(){
        return(
            <Radio.Group defaultValue="PRODUCT-2" onChange={(oEvent)=>{this.props.onChange(oEvent)}}>
                <Radio.Button value="PRODUCT-1"><FormattedMessage id="outComming.label.radio-group-gold"/></Radio.Button>
                <Radio.Button value="PRODUCT-2"><FormattedMessage id="outComming.label.radio-group-premium"/></Radio.Button>
            </Radio.Group>
        );
    }
}