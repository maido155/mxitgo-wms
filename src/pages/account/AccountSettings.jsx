import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Form, Input, Divider, Select, Spin, Button } from 'antd';
import Upload from '../generalComponents/UploadAvatar';
import Styles from './StylesAccount.css';
import { connect } from 'dva';

const { Option } = Select;
var numberPhone = "";
var ladaPhone = "+521";

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    userByEmail:user.userByEmail
}))

class AccountSettings extends PureComponent{
    state = {
        loading: false
    }

    componentDidMount() {
        this.props.dispatch({
           type: 'user/fetchUserByEmail',
           payload: {
               payload: {
                   email:"lopezarmando1112@gmail.com"
               }
           },
       });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            var phone_number = values.prefix + values.phone_number;
            values.phone_number = phone_number;
          if (!err) {
            console.log('Received values of form: ', values);
            this.putDataUser(values);
          }
        });
      };

      putDataUser = (values) => {
        this.props.dispatch({
            type: '',
            payload: {
                payload: {
                    GET: {
                        email:"lopezarmando1112@gmail.com",
                    },
                    PUT: {
                        name: "name",
                        valueName: values.name,
                        family: "family_name",
                        valueFamiy: values.family_name,
                        middle: "middle_name",
                        valueMiddle: values.middle_name,
                        phone: "phone_number",
                        valuePhone: values.phone_number,
                        username: values.email
                    }
                },
            },
        });
    }

    render(){

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 7 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };

        const { form, loading, user: { user },userByEmail, submitting } = this.props;
        const { getFieldDecorator } = form;
    
        const number = userByEmail.phone_number;

        if(userByEmail.length != 0){
            numberPhone = number.substr(4);
            ladaPhone = number.substr(-14,4);
        }

          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: ladaPhone,
          })(
            <Select>
              <Option value="+521">+521</Option>
              <Option value="+522">+522</Option>
            </Select>,
          );

        return(
            <PageHeaderWrapper  title="Account Settings">
                <Card>
                    <Spin tip="Loading Account" spinning={loading}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Row>
                                <Col lg={12} xl={24} className={Styles.avatar}>
                                    <Upload/>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col lg={12} xl={12}>
                                    <Form.Item label="Nombre(s):">
                                        {getFieldDecorator('name', { initialValue: userByEmail.name,
                                            rules: [{ required: true, message: 'Ingresa tu nombre!'}]})
                                        (<Input  defaultValue="hola" />)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label="Apellido Paterno:">
                                        {getFieldDecorator('family_name',{ initialValue: userByEmail.family_name,
                                            rules: [{ required: true, message: 'Ingresa tu apellido paterno!'}]})
                                        (<Input/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label="Apellido Materno:">
                                        {getFieldDecorator('middle_name',{ initialValue: userByEmail.middle_name,
                                            rules: [{ required: true, message: 'Ingresa tu apellido materno!'}]})
                                        (<Input/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label="Telefono:">
                                        {getFieldDecorator('phone_number', { initialValue: numberPhone,
                                            rules: [{ required: true, message: 'Por favor ingrese su número de teléfono!' },
                                            { pattern: /^\d{10}$/, message: 'Formato invalido!'}],})
                                            (<Input addonBefore={prefixSelector}/>)}
                                    </Form.Item>
                                </Col>
                                <Col lg={12} xl={12}>
                                    <Form.Item label="Correo Electronico:">
                                        {getFieldDecorator('email',{ initialValue: userByEmail.email, 
                                            rules: [{ required: true, message: 'Ingresa tu correo electronico!'},{ type: 'email', message: 'Este correo no es valido!'}]})
                                            (<Input disabled/>)}
                                    </Form.Item>
                                </Col>
                                {/* <Col lg={12} xl={12}>
                                    <Form.Item>
                                        <Button loading={submitting} type="primary" htmlType="submit">
                                            Guardar
                                        </Button>  
                                    </Form.Item>
                                </Col> */}
                            </Row>
                            <Row>
                                <Col span={22} className={Styles.botton}>
                                        <Button loading={submitting} type="primary" htmlType="submit">
                                            Guardar
                                        </Button>   
                                </Col>
                            </Row>
                        </Form>
                    </Spin>
                </Card>
        </PageHeaderWrapper>
        );
    }
}

export default Form.create()(AccountSettings);