import React, { PureComponent } from 'react';
import {Tabs,Input, Row, Col} from 'antd';
import Gridvieew from './gridDashboard';

const { TabPane } = Tabs;
const InputGroup = Input.Group;

function callback(key) {
  console.log(key);
}


class tabsDashboard extends PureComponent {
    state = { size: 'small' };
    render() {
        const { size } = this.state;
        return (
            
          <span>    
            <Tabs onChange={callback} type="card" size={size}>
            <TabPane tab="Gold" key="1">
              <Gridvieew/>
            </TabPane> 
            <TabPane tab="Premium" key="2">
              <Gridvieew/>
            </TabPane> 
            </Tabs>
          </span>
    );
  }
}

export default tabsDashboard;