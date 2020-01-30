import { Button, Radio, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 

class ButtonCenter extends PureComponent {
  state = {
    size: 'large',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
          <label>Centro: </label>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Vallejo</Radio.Button>
          <Radio.Button value="default">Cuautitlán</Radio.Button>
          <Radio.Button value="small">Reparto</Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

export default ButtonCenter;