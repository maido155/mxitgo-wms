import React, { PureComponent } from 'react';
import {Radio,Input, Row, Col} from 'antd';
class radioDashboard extends PureComponent {
  render(){
    const {dataEight,dataNine} = this.props;
    return(
        <div>
            <Row type="flex" justify="right">
                <Col span={dataEight} style={{textAlign: "center"}}>
                </Col>
                <Col span={dataNine} style={{textAlign: "center", margin:"1rem"}}>
                    <Radio.Group defaultValue="a">
                        <Radio.Button value="a">Gold</Radio.Button>
                        <Radio.Button value="b">Premium</Radio.Button>
                   </Radio.Group>
                </Col>
            </Row>
        </div>
    );
}
}

export default radioDashboard;