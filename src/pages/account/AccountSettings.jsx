import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Form, Input, Divider, Select, Spin, Button, Icon, message} from 'antd';
import Upload from '../generalComponents/UploadAvatar';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesAccount.css';
import { connect } from 'dva';

const { Option } = Select;
var numberPhone = "";
var ladaPhone = "+521";

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    userByEmail:user.userByEmail,
    isUpdated:user.isUpdated,
    avatarUser:user.avatarUser
}))

class AccountSettings extends PureComponent{
    
    state = {
        loading: false,
    }

    componentDidMount() {
        this.props.dispatch({
           type: 'user/fetchUserByEmail',
           payload: {
               payload: {
                   email: localStorage.getItem('email'),
                   Authorization: sessionStorage.getItem('idToken')
               }
           },
       });
    //    this.props.dispatch({
    //         type: 'user/fetchAvatarUser',
    //         payload: {
    //             payload: {
    //                 user: localStorage.getItem('email'),
    //                 Authorization: sessionStorage.getItem('idToken')
    //             }
    //         },
    //     });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let vali = localStorage.getItem('url');
            if(vali == "undefined"){
                message.error(formatMessage({ id: 'accountSettings.mode.message.err' }));
                return;
            }else{
                values["urlimage"] = this.props.avatarUser.urlImage;
                var phone_number = values.prefix + values.phone_number;
                values.phone_number = phone_number;
            }
          if (!err) {
            console.log('Received values of form: ', values);
            this.putDataUser(values);
            // this.saveAvatarUser(values);
          }
        });
      };

      putDataUser = (values) => {
        this.props.dispatch({
            type: 'user/updateDataUser',
            payload: {
                payload: {
                    GET: {
                        email: localStorage.getItem('email'),
                        Authorization: sessionStorage.getItem('idToken')
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
                        username: values.email,
                        Authorization: sessionStorage.getItem('idToken')
                    }
                },
            },
        });
    }

    // saveAvatarUser = (values) => { 
    //     this.props.dispatch({
    //         type: 'user/saveAvatarUser',
    //         payload: {
    //             payload: {
    //                 GET: {
    //                     user: localStorage.getItem('email'),
    //                     Authorization: sessionStorage.getItem('idToken')
    //                 },
    //                 POST: {
    //                     urlImage: values.urlimage,
    //                     user: localStorage.getItem('email'),
    //                     Authorization: sessionStorage.getItem('idToken')
    //                 }
    //             },
    //         },
    //     });
    // }

    UpdateValidation = () => {
        this.props.dispatch({
            type: 'user/updateValidation',
            payload: {},
        });
    }

    getBase64 = (img, callback) =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        if (info.file.status === 'done') {
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.props.dispatch({
                type: 'user/updateValidationAvatar',
                payload: {
                    Items:{
                        [0]:{
                            urlImage: imageUrl,
                            user: localStorage.getItem('email')
                        }
                    }
                },
            })
          );
        }
    };


    render(){

        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 6 },lg: { span: 10 },xl: { span: 7 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 14 },lg: { span: 14 },xl: { span: 14  }}
        };

        const { form, loading, user: { user },userByEmail,isUpdated, submitting, avatarUser } = this.props;
        const { getFieldDecorator } = form;
        const number = userByEmail.phone_number;

        if(isUpdated){
            message.success(formatMessage({ id: 'accountSettings.mode.message.save' }));
            this.UpdateValidation();
        }

        if(number != undefined){
            numberPhone = number.substr(4);
            ladaPhone = number.substr(-14,4);
        }

          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: ladaPhone,
          })(
            <Select>
              <Option value="+521"><FormattedMessage id="accountSettings.label.prefix-one"/></Option>
              <Option value="+522"><FormattedMessage id="accountSettings.label.prefix-two"/></Option>
            </Select>,
          );

        return( 
                <PageHeaderWrapper  title={formatMessage({ id: 'accountSettings.mode.message.account' })}>
                    <Card>
                        <Spin tip={formatMessage({ id: 'accountSettings.security.message.account' })} spinning={loading} >
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col lg={12} xl={24} className={Styles.avatar}>
                                        {
                                            avatarUser != undefined  
                                            ? <div>
                                                <Upload changeImagen={this.handleChange} stateImage={avatarUser.urlImage}/>
                                                {localStorage.setItem("url", this.props.avatarUser.urlImage)}
                                            </div> 
                                            : <Upload changeImagen={this.handleChange} stateImage={"https://elsignificadode.com/wp-content/uploads/blanco.jpg"}/>
        
                                        }
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row>
                                    <Col lg={12} xl={12}>
                                        <Form.Item label={formatMessage({ id: 'register.label.name' })}>
                                            {getFieldDecorator('name', { initialValue: userByEmail.name,
                                                rules: [{ required: true, message: <FormattedMessage id="register.mode.message.name"/>}]})
                                            (<Input disabled={localStorage.getItem('socialNetwork') == "true" ? true : false}/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} xl={12}>
                                        <Form.Item label={formatMessage({ id: 'register.label.lastfam' })}>
                                            {getFieldDecorator('family_name',{ initialValue: userByEmail.family_name,
                                                rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastfam"/>}]})
                                            (<Input disabled={localStorage.getItem('socialNetwork') == "true" ? true : false}/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} xl={12}>
                                        <Form.Item label={formatMessage({ id: 'register.label.lastmid' })}>
                                            {getFieldDecorator('middle_name',{ initialValue: userByEmail.middle_name,
                                                rules: [{ required: true, message: <FormattedMessage id="register.mode.message.lastmid"/>}]})
                                            (<Input disabled={localStorage.getItem('socialNetwork') == "true" ? true : userByEmail.middle_name == undefined ? true : false}/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} xl={12}>
                                        <Form.Item label={formatMessage({ id: 'register.label.phone' })}>
                                            {getFieldDecorator('phone_number', { initialValue: numberPhone,
                                                rules: [{ required: true, message: <FormattedMessage id="register.mode.message.phone"/> },
                                                { pattern: /^\d{10}$/, message: <FormattedMessage id="register.security.message.phone"/>}],})
                                                (<Input addonBefore={prefixSelector} disabled={localStorage.getItem('socialNetwork') == "true" ? true : false}/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col lg={12} xl={12}>
                                        <Form.Item label={formatMessage({ id: 'register.label.email' })}>
                                            {getFieldDecorator('email',{ initialValue: userByEmail.email, 
                                                rules: [{ required: true, message: <FormattedMessage id="register.mode.message.email"/>},
                                                { type: 'email', message: <FormattedMessage id="register.mode.message.email-inv"/>}]})
                                                (<Input disabled/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={22} className={Styles.botton}>
                                            <Button loading={submitting} type="primary" htmlType="submit">
                                                <Icon type="check" /><FormattedMessage id="accountSettings.button.save"/>
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