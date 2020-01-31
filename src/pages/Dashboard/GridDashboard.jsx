import React, { PureComponent } from 'react';
import {Row, Col,Typography,Card, Tooltip,Progress} from 'antd';

import {isMobile} from "react-device-detect";


const { Text, Title } = Typography;

class gridDashboard extends PureComponent {
  
  render() {
    const {dataOne, dataTwo, dataThree, dataFour,dataFive, dataSix} = this.props
        if(isMobile){
            return (
                <div>
                    <Row type="flex" justify="space-around">
                    
                    <Col > <Text strong>Miercoles</Text></Col>
                    <Col ><Text strong>Jueves</Text></Col>
                    <Col ><Text strong>Viernes</Text></Col>
                    <Col ><Text strong>Sabado</Text></Col>
                   
                  </Row>
                </div>
            );
        }
        return (
        <div>
            <Row type="flex" justify="space-between">
            <Col span={dataOne}></Col>
            <Col span={dataTwo}><Title level={dataThree}>Miercoles</Title></Col>
            <Col span={dataTwo}><Title level={dataThree}>Jueves</Title></Col>
            <Col span={dataTwo}><Title level={dataThree}>Viernes</Title></Col>
            <Col span={dataTwo}><Title level={dataThree}>Sabado</Title></Col>
            <Col span={dataTwo}><Title level={dataThree}>Domingo</Title></Col>
            <Col span={dataTwo}><Title level={dataThree}>Lunes</Title></Col>
            <Col span={dataTwo}><Title level={dataThree}>Martes</Title></Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={dataTwo}>
              <Card style={{ width: dataSix }} size='small'>
                <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
              <Col span={dataTwo}>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
              <Col span={dataTwo}>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
              <Col span={dataTwo}>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
              <Col span={dataTwo}>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
              <Col span={dataTwo}>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
              <Col span={dataTwo}>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                <p>Claneados : </p>
                <p>Confirmados : </p>
                <p>cancelados : </p>
              </Card>
              </Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}><Title level={4}>Totales</Title></Col>
          </Row>
          <Row>
              <Col span={5}></Col>
              <Col span={5}>
              <Card style={{ width: dataSix }} size='small'>
              <p>Necesidad Gold: </p>
               
              <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
              <Col span={5}></Col>
              <Col span={5}>
              <Card style={{ width: dataSix }} size='small'>
              <p>Necesidad Premium: </p>
                
              <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}>
              <Card style={{ width: dataSix }} size='small'>
              <p>Total Necesidades: </p>
                
                <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={18} />
               </Tooltip>
                </Card>
              </Col>
          </Row>
        </div>
        );
    }
}
export default gridDashboard;