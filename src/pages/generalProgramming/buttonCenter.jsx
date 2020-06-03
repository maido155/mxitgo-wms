import { Button, Radio, Icon,label } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 

import { FormattedMessage} from 'umi-plugin-react/locale';

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
      <div style={{marginTop: "4%", marginBottom: "4%", marginLeft:"4%"}}>
          <label style={{ marginLeft:"4%"}}><FormattedMessage id="general.buttoon-center.center"/> </label>
        <Radio.Group value={size} onChange={this.handleSizeChange} style={{marginTop: "4%", marginBottom: "4%", marginLeft:"4%"}} >
          <Radio.Button value="large">Vallejo</Radio.Button>
          <Radio.Button value="default">Cuautitlán</Radio.Button>
          <Radio.Button value="small">Reparto</Radio.Button>
        </Radio.Group>
        <label></label>
      </div>
    );
  }
}
  
export default ButtonCenter