import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import RangePickerComponent from '../generalComponents/RangePickerComponent';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import TabsOutComming from './TabsOutComming';
import { Card, Form, Row, Col, Menu, Dropdown, Button, message, Tooltip, Divider} from 'antd';
import TableOutComming from './TableOutComming';
import { connect } from 'dva';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

@connect(({ outcomming, loading }) => ({
    outcomming,
    loading: loading.models.outcomming,
}))
export default class OutComming extends PureComponent {
    
    onConfirm = (id) => {
         
        this.props.dispatch({
            type: 'outcomming/confirmOutcomming',
            payload: {SK: id, operation: "UPDATE_STATUS", status: "CONFIRMED"}
        })

    };

    
    
    render() {
 
          
          function handleMenuClick(e) {
            message.info('Click on menu item.');
            console.log('click', e);
          }

        this.name = "hola";

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 7 },md: { span: 9 },lg: { span: 9 },xl: { span: 5 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 14 },md: { span: 15 },lg: { span: 15 },xl: { span: 15 }}
        };

        const menuProduct = (
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                Gold
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Premium
              </Menu.Item>
            </Menu>
          );

          const menuClient = (
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                Vallejo
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Cuauhtitlan
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Reparto
              </Menu.Item>
            </Menu>
          );

        return (
            <PageHeaderWrapper>
                    <Card>
                        <Form {...formItemLayout}>
                            <Row type="flex" justify="center"> 
                                <Col xs={24} sm={23} md={17} lg={16} xl={16}>
                                    <Form.Item label={formatMessage({ id: 'outComming.label.week' })}>
                                        <RangePickerComponent/>
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Row type="flex" justify="center">
                               <Col xs={24} sm={23} md={2} lg={2} xl={2}  >
                                    <Form.Item>
                                        <Dropdown overlay={menuProduct}>
                                            <Button>
                                                Product <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                </Col>
                               <Col xs={24} sm={23} md={1} lg={1} xl={1}  >
                               </Col>
                                <Col  xs={24} sm={23} md={2} lg={2} xl={2} >
                                    <Form.Item>
                                            <Form.Item>
                                                <Dropdown overlay={menuClient}>
                                                    <Button>
                                                        Client <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                            
                                
                                            </Form.Item>
                                    </Form.Item>  
                                </Col>
                            </Row>

                            {/* <Row type="flex" justify="center">
                            <Col xs={24} sm={23} md={8} lg={8} xl={8}  >
                                    <Form.Item>
                                        <Dropdown overlay={menuProduct}>
                                            <Button>
                                                Product <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col  xs={24} sm={23} md={8} lg={8} xl={8} >
                                    <Form.Item>
                                            <Form.Item>
                                                <Dropdown overlay={menuClient}>
                                                    <Button>
                                                        Client <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                            
                                
                                            </Form.Item>
                                    </Form.Item>  
                                </Col>
                            </Row> */}
                            <Row type="flex" justify="center">
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <TableOutComming onConfirm = {this.onConfirm}/>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}