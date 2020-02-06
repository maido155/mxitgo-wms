import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Radio } from 'antd';

export default class RadioGroupComponent extends PureComponent{
    render(){
        return(
            <Radio.Group defaultValue="a">
                <Radio.Button value="a">Gold</Radio.Button>
                <Radio.Button value="b">Premium</Radio.Button>
            </Radio.Group>
        );
    }
}