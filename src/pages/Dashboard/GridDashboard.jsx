import React, { PureComponent } from 'react';
import {Row, Col,Typography,Card, Tooltip,Progress, Divider} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';




const { Text, Title } = Typography;

class GridDashboard extends PureComponent {
  
  render() {
    const {xs,sm,md,lg,xl,txs,tsm,tmd,tlg,txl, dataThree, dataFour,dataFive, dataSix, dataSeven} = this.props
      
        return (
        <div>

          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}><Title level={4}>Totales</Title></Col>
          </Row>
          
          <Row type="flex" justify="center" align-content="center">
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center"}}>
                <Card style={{ width: dataSix }} size='medium '>
                <p>Necesidad Gold: </p>
                <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center"}}>
                <Card style={{ width: dataSix }} size='medium'>
                <p>Necesidad Premium: </p>
                <p><Title level={dataFour} >1500</Title></p>
                </Card>
              </Col>

              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center"}}>
                <Card style={{ width: dataSix }} size='small'>
                  <p>Total Necesidades: </p>
                  <p><Title level={dataFour}>1500</Title></p>
                  <Tooltip >
                    <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
                  </Tooltip>
                </Card>
              </Col>
          </Row>
          
          
          <Divider/>
          <Row type="flex" justify="space-around">
         
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.wednesday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
                <Title type="danger" level={dataFour}>1500</Title>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>
                <Text type="danger"><FormattedMessage id="dashboard.text.canceled"/></Text>
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                <Title level={dataThree}><FormattedMessage id="dashboard.title.thursday"/></Title>
              <Card style={{ width: dataFive, height: "10rem"}} size='small'>
              <Title  level={dataFour}>1500</Title>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
               <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>

              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.friday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
              <Title level={dataFour}>1500</Title>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
               <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.saturday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
              <Title level={dataFour}>1500</Title>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
               <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.sunday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
              <Title level={dataFour}>1500</Title>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
               <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.monday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
              <Title level={dataFour}>1500</Title>
                <Tooltip>
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven}/>
               </Tooltip>
               <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>
                
              </Card>
              </Col>
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.tuesday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
              <Title level={dataFour}>1500</Title>
                <Tooltip >
                   <Progress percent={60} successPercent={30} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
               <Text><FormattedMessage id="dashboard.text.planned"/> </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/> </Text>
                
              </Card>
              </Col>
          </Row>
          <Divider/>
          <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}><Title level={4}><FormattedMessage id="dashboard.text.totals"/> </Title></Col>
          </Row>
          <Row type="flex" justify="center">
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl}>
              <Card style={{ width: dataSix }} size='small'>
              <p><FormattedMessage id="dashboard.text.gold-necessity"/> </p>
              
               
              <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl}>
              <Card style={{ width: dataSix }} size='small'>
              <p><FormattedMessage id="dashboard.text.premium-necessity"/> </p>
                
              <p><Title level={dataFour}>1500</Title></p>
                </Card>
              </Col>
          </Row>
          <Row type="flex" justify="center">
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center", margin:"1rem"}}>
              <Card style={{ width: dataSix }} size='small'>
              <p><FormattedMessage id="dashboard.text.total-necessity"/> </p>
             
                
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