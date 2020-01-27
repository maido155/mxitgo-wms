import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import TableShippingMaster from './TableShippingMaster';

import {
    Tabs
} from 'antd';

const { TabPane } = Tabs;

class TabsShippingMaster extends PureComponent{
    render(){
        return(
            <Tabs defaultActiveKey="1">
                <TabPane tab="Gold" key="1">
                    <TableShippingMaster/>
                </TabPane>
                <TabPane tab="Premium" key="2">
                    Premium
                </TabPane>
            </Tabs>
        );
    }
}

export default TabsShippingMaster;