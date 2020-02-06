import React, { PureComponent } from 'react';
import {Row, Col,Typography,Card, Tooltip,Progress} from 'antd';




const { Text, Title } = Typography;

class GridDashboard extends PureComponent {
  
  render() {
    const {xs,sm,md,lg,xl,txs,tsm,tmd,tlg,txl, dataThree, dataFour,dataFive, dataSix, dataSeven} = this.props
      
        return (
        <div>
            
          <Row type="flex" justify="space-around">
         
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}>Miercoles</Title>
              <Card style={{ width: dataFive }} size='small'>
               
                <p><Title type="danger" level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                <p><Text type="danger">cancelados: </Text></p>
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                <Title level={dataThree}>Jueves</Title>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title  level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}>Viernes</Title>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}>Sabado</Title>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}>Domingo</Title>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}>Lunes</Title>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}>Martes</Title>
              <Card style={{ width: dataFive }} size='small'>
              <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <p>Planeados: </p>
                <p>Confirmados: </p>
                
              </Card>
              </Col>
          </Row>
          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}><Title level={4}>Totales</Title></Col>
          </Row>
          <Row type="flex" justify="center">
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl}>
              <Card style={{ width: dataSix }} size='small'>
              <p>Necesidad Gold: </p>
               
              <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl}>
              <Card style={{ width: dataSix }} size='small'>
              <p>Necesidad Premium: </p>
                
              <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
          </Row>
          <Row type="flex" justify="center">
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center", margin:"1rem"}}>
              <Card style={{ width: dataSix }} size='small'>
              <p>Total Necesidades: </p>
                
                <p><Title level={dataFour}>1500</Title></p>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                </Card>
              </Col>
          </Row>
        </div>
        );
    }
}
export default GridDashboard;