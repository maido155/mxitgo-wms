import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Form, Input, Divider, Select } from 'antd';
import Upload from '../generalComponents/UploadAvatar';
import Styles from './StylesAccount.css';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    userByEmail:user.userByEmail
}))

class AccountSettings extends PureComponent{
    
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

    render(){

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 8 },xl: { span: 7 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };

        const { form, loading, user: { user },userByEmail } = this.props;
        const { getFieldDecorator } = form;
    
        
          if(userByEmail.length > 0){
            const number = userByEmail.phone_number;
            const numberPhone = number.substr(4);
            const ladaPhone = number.substr(-14,4);
          }

          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: "",
          })(
            <Select onChange={this.handleChange}>
              <Option value="+521">+521</Option>
              <Option value="+522">+522</Option>
            </Select>,
          );

        return(
            <PageHeaderWrapper  title="Account Settings">
                <Card>
                    <Form {...formItemLayout}>
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
                                    {getFieldDecorator('phone_number', { initialValue: "",
                                        rules: [{ required: true, message: 'Por favor ingrese su número de teléfono!' },
                                        { pattern: /^\d{10}$/, message: 'Formato invalido!'}],})
                                        (<Input addonBefore={prefixSelector}/>)}
                                </Form.Item>
                            </Col>
                            <Col lg={12} xl={12}>
                                <Form.Item label="Correo Electronico:">
                                    <Input disabled defaultValue={userByEmail.email}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
        </PageHeaderWrapper>
        );
    }
}

export default Form.create()(AccountSettings);