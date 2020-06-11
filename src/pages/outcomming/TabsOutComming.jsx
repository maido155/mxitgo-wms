import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Radio } from 'antd';
import { _ } from 'lodash'; 
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class TabsOutComming extends PureComponent {
    render() {
        return (
            <Radio.Group defaultValue="a">
                <Radio.Button value="a"><FormattedMessage id="outComming.label.tabs-one"/></Radio.Button>
                <Radio.Button value="b"><FormattedMessage id="outComming.label.tabs-two"/></Radio.Button>
                <Radio.Button value="c"><FormattedMessage id="outComming.label.tabs-three"/></Radio.Button>
            </Radio.Group>
        );            
    }
}