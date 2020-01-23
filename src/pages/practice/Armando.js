import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import Modal  from './Modal';

import {
    Table, Card, Spin, Form, Button, Icon, LocaleProvider, Input, Select, Row, Col, notification,Modal
} from 'antd';






import 'moment/locale/en-au';


@Form.create()
@connect(({ armando, loading }) => ({
    armando,
    loading: loading.models.armando,
    videogames:armando.videogames
}))



export default class Companies extends PureComponent {

    state = {
        loading: false,
        visible: false,
    }
    showModal = () => {
        this.setState({ visible: true });
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          form.resetFields();
          this.setState({ visible: false });
          let info = values;
          this.sendVideoGames(info);
        });
      };
    
      saveFormRef = formRef => {
        this.formRef = formRef;
      };
    componentDidMount() {
         this.props.dispatch({
            type: 'armando/fetchVideoGames',
            payload: {
                payload: {
                    consolesId:1
                }
            },
        });
    }
sendVideoGames =(info) => {
    this.props.dispatch({
       type: 'armando/generteVideoGames',
       payload:{
           payload:{
               GET:{
                consolesId:1,
               },
               POST:{
                digital: info.digital,
                price: info.price,
                size: info.size,
                videogameName: info.videogameName,
                year: info.year,
                gender:
                    [{
                        clasification: info.clasification,
                        online: info.online,
                        type: info.type
                    }]
               }
               
               
           },
       },
   });
}
    render() {
        const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
            class extends React.Component {
              render() {
                const { visible, onCancel, onCreate, form } = this.props;
                const { getFieldDecorator } = form;
                return (
          
                  <Modal
                    visible={visible}
                    title="Add New VideoGame"
                    okText="Insert"
                    onCancel={onCancel}
                    onOk={onCreate}
                  >
                    <Form layout="vertical">
          
                      <Form.Item label="Name">
                        {getFieldDecorator('videogameName', {
                          rules: [{ required: true, message: 'Write Name!' }],
                        })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Price">
                          {getFieldDecorator('price', {
                          rules: [{ required: true, message: 'Write Price!' }],
                          })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Digital">
                        {getFieldDecorator('digital', {
                          rules: [{ required: true, message: 'Write True or False!' }],
                        })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Size">
                          {getFieldDecorator('size', {
                          rules: [{ required: true, message: 'Write Size!' }],
                          })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Year">
                          {getFieldDecorator('year', {
                          rules: [{ required: true, message: 'Write Year!' }],
                          })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Clasification">
                          {getFieldDecorator('clasification', {
                          rules: [{ required: true, message: 'Write Clasification!' }],
                          })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Online">
                          {getFieldDecorator('online', {
                          rules: [{ required: true, message: 'Write True or False!' }],
                          })(<Input />)}
                      </Form.Item>
          
                      <Form.Item label="Type">
                          {getFieldDecorator('type', {
                          rules: [{ required: true, message: 'Write Type!' }],
                          })(<Input />)}
                      </Form.Item>
          
                    </Form>
          
                  </Modal>
                );
              }
            },
          );
          
        const { loading, armando: { armando },videogames } = this.props;
        const columns = [
            {
              title: 'Id',
              dataIndex: 'consolesId',
              key: 'consolesId',
            },
            {
              title: 'videogame Id',
              dataIndex: 'videogamesId',
              key: 'videogamesId',
            },
            {
              title: 'Digital',
              dataIndex: 'digital',
              key: 'digital',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Name',
                dataIndex: 'videogameName',
                key: 'videogameName',
            },
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
            },
            {
                title: 'Clasification',
                dataIndex: 'clasification',
                key: 'clasification',
                render: (text, record) => {
                    return(
                        <span>{record.gender[0].clasification}</span>
                    )
                }

            },
          ];
        return (
            <PageHeaderWrapper>
                    <Card title={<span><Icon type="bank" />  Practice</span>} style={{ 'margin': '0px' }}>
                        <div>
                            <Row>
                                <Col span={18}>
                                </Col>
                                <Col span={6}>
                                    {/* <Button type="primary" block onClick={this.sendVideoGames}>
                                        <Icon type="plus" />
                                        New
                                    </Button> */}
        <Button type="primary" block onClick={this.showModal}>
            <Icon type="plus" />
            New
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
                                    <br/>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col span={24}>
                                <Spin tip="Loading videogames" spinning={loading}>
                                    <Table
                                        dataSource= {videogames}
                                        columns={columns}
                                        scroll={{x:1000}}
                                    />
                                    </Spin>
                                </Col>
                            </Row>
                        </div>
                    </Card>
            </PageHeaderWrapper>
        );
    }
}