import React, { PureComponent } from 'react';
import {Row, Col,Typography,Card, Tooltip,Progress, Divider} from 'antd';

import { FormattedMessage} from 'umi-plugin-react/locale';




const { Text, Title } = Typography;

class GridDashboard extends PureComponent {
  
  render() {
    const {xs,sm,md,lg,xl,txs,tsm,tmd,tlg,txl, dataThree, dataFour,dataFive, dataSix, dataSeven} = this.props
      
        return (
        <div>

          {/* <Row type="flex" justify="space-around">
              <Col span={6}></Col>
              <Col span={12}><Title level={4}>Totales</Title></Col>
          </Row>
          
          <Row type="flex" justify="center" align-content="center">
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center"}}>
                <Card style={{ width: dataSix }} size='medium '>
                <p>Necesidad Gold: </p>
                <p><Title level={dataFour}>{this.props.programmingTotalPRODUCT1}</Title></p>
                </Card>
              </Col>
              
              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center"}}>
                <Card style={{ width: dataSix }} size='medium'>
                <p>Necesidad Premium: </p>
                <p><Title level={dataFour} >{this.props.programmingTotalPRODUCT2}</Title></p>
                </Card>
              </Col>

              <Col xs={txs} sm={tsm} md={tmd} lg={tlg} xl={txl} style={{textAlign: "center"}}>
                <Card style={{ width: dataSix }} size='small'>
                  <p>Total Necesidades: </p>
                  <p><Title level={dataFour}>{this.props.programmingTotal.programmingTotal}</Title></p>
                  <Tooltip >
                    <Progress percent={this.props.programmingTotal.new} successPercent={this.props.programmingTotal.confirmed} showInfo={false} strokeWidth={dataSeven} />
                  </Tooltip>
                </Card>
              </Col>
          </Row> */}
        
          
          {/* <Divider/> */}
          <Row type="flex" justify="space-around">
         
              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.wednesday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Wednesday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Wednesday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Wednesday.plannedPercentage} successPercent={this.props.Wednesday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Wednesday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Wednesday.programmed} </Text>
                <Text type={this.props.Wednesday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Wednesday.cancelled}</Text>
              </Card>
              </Col>

              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.thursday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Thursday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Thursday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Thursday.plannedPercentage} successPercent={this.props.Thursday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Thursday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Thursday.programmed} </Text>
                <Text type={this.props.Thursday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Thursday.cancelled}</Text>
              </Card>
              </Col>

              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.friday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Friday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Friday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Friday.plannedPercentage} successPercent={this.props.Friday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Friday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Friday.programmed} </Text>
                <Text type={this.props.Friday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Friday.cancelled}</Text>
              </Card>
              </Col>

              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.saturday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Saturday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Saturday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Saturday.plannedPercentage} successPercent={this.props.Saturday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Saturday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Saturday.programmed} </Text>
                <Text type={this.props.Saturday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Saturday.cancelled}</Text>
              </Card>
              </Col>

              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.sunday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Sunday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Sunday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Sunday.plannedPercentage} successPercent={this.props.Sunday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Sunday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Sunday.programmed} </Text>
                <Text type={this.props.Sunday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Sunday.cancelled}</Text>
              </Card>
              </Col>

              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.monday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Monday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Monday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Monday.plannedPercentage} successPercent={this.props.Monday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Monday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Monday.programmed} </Text>
                <Text type={this.props.Monday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Monday.cancelled}</Text>
              </Card>
              </Col>

              <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Title level={dataThree}><FormattedMessage id="dashboard.title.tuesday"/></Title>
              <Card style={{ width: dataFive, height: "10rem" }} size='small'>
               
               <Title type={this.props.Tuesday.cancelled > 0 ? "danger": "normal"} level={dataFour}>{this.props.Tuesday.programmed}</Title>
                <Tooltip >
                   <Progress percent={this.props.Tuesday.plannedPercentage} successPercent={this.props.Tuesday.confirmedPercentage} showInfo={false} strokeWidth={dataSeven} />
               </Tooltip>
                <Text><FormattedMessage id="dashboard.text.planned"/>{this.props.Tuesday.planned} </Text>
                <Text><FormattedMessage id="dashboard.text.confirmed"/>{this.props.Tuesday.programmed} </Text>
                <Text type={this.props.Tuesday.cancelled > 0 ? "danger": "normal"}><FormattedMessage id="dashboard.text.canceled"/> {this.props.Tuesday.cancelled}</Text>
              </Card>
              </Col>

          </Row>
          <Divider/>
          
        </div>
        );
    }
}
export default GridDashboard;