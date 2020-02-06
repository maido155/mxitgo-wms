import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Input } from 'antd';

const { TextArea } = Input;

export default class TextAreaComponent extends PureComponent{
    render(){
        return(
            <TextArea/>
        );
    }
}