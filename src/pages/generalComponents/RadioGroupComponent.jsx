import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash';
import { Radio } from 'antd';

export default class RadioGroupComponent extends PureComponent{
    render(){
        return(
            <Radio.Group defaultValue="a">
                <Radio.Button value="a"><FormattedMessage id="outComming.label.radio-group-gold"/></Radio.Button>
                <Radio.Button value="b"><FormattedMessage id="outComming.label.radio-group-premium"/></Radio.Button>
            </Radio.Group>
        );
    }
}