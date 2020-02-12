import { Button, Radio, Icon,label } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 

class ButtonProduct extends PureComponent {
  state = {
    size: 'large',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div style={{marginTop: "4%"}}>
        <label  style={{ marginLeft:"7%"}}>Producto: </label>
        <Radio.Group value={size} onChange={this.handleSizeChange} style={{marginTop: "4%", marginBottom: "4%", marginLeft:"3%"}}>
          <Radio.Button value="large">Gold</Radio.Button>
          <Radio.Button value="default">Premium</Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}
 
export default ButtonProduct