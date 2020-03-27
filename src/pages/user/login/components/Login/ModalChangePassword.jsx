import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Icon, Input, Upload, Button,Row,Col, Modal, Select, message, LocaleProvider,Password
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item;
const Option = Select.Option;

const Dragger = Upload.Dragger;

const ModalChangePassword = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
    
            this.state = {
                confirmDirty: false,
                visibleFormCode: false,
                disabledBtnSendMail: false
            };
        }
        
        validateToOldPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value == form.getFieldValue('newUserPassword')) {
              callback('The password should different to the old password!');
            } else {
              callback();
            }
        }        
        compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('newUserPassword')) {
              callback('Two passwords that you enter is inconsistent!');
            } else {
              callback();
            }
        }
        validateToNextPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
              form.validateFields(['userConfirmPassword'], { force: true });
            }
            callback();
        }
        handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        }
        handleNewPasswordBlur = (e) => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        }
        onClickChangePassword = (e) => {
            const { onChangePassword } = this.props;
            this.setState({visibleFormCode:true, disabledBtnSendMail:true});
            onChangePassword();
        }
        onClickConfirmCode = (_this) => {
            const { onConfirmCode } = this.props;
            let code        = _this.props.form.getFieldValue('code');
            let newPassword = _this.props.form.getFieldValue('newPassword');
            let email       = _this.props.form.getFieldValue('email');
            if(code!=''&&newPassword!=''){
                onConfirmCode(code,newPassword,email);
            }
        }
        
        render() {
            const { visible, onCancel, onConfirmCode, form } = this.props;
            const { getFieldDecorator } = form;
            const {visibleFormCode,disabledBtnSendMail} = this.state;
          
            //const options = this.props.presalesList.map(d => <Option key={d.userid}>{d.userName}</Option>);


            return (
                <LocaleProvider locale={en_US}>
                    
                <Modal
                    visible={visible}
                    title="Forgot your password?"
                    // okText="Change"
                    cancelText="Cancel"
                    onCancel={onCancel}
                    okButtonProps={{ style: { display: 'none' } }}
                    // onOk={onChangePassword}
                >



                <Form layout="inline">
                    <FormItem label="Email">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', required: true, message: 'Please input email!',
                        }],
                        })(
                            <Input type="email" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem> 
                    <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.onClickChangePassword} disabled={disabledBtnSendMail}>
                        Send Email
                    </Button>
                    </Form.Item>
                    { visibleFormCode==true &&
                      <div>
                                    <FormItem label="Code">
                                        {getFieldDecorator('code', {
                                            rules: [{
                                              required: true, message: 'Please input the code!',
                                        }],
                                        })(
                                            <Input type="text" onBlur={this.handleConfirmBlur}/>
                                        )}
                                    </FormItem>
                                     <FormItem label="New Password">
                                        {getFieldDecorator('newPassword', {
                                            rules: [{
                                                required: true, message: 'Please input the new password!',
                                        }],
                                        })(
                                            // <Input type="text" onBlur={this.handleConfirmBlur}/>
                                            <Input.Password onBlur={this.handleConfirmBlur}/>
                                        )}
                                    </FormItem>                                     

                                    
                                
                                    {/* <FormItem label="New Password">
                                        {getFieldDecorator('newPassword', {
                                            rules: [{
                                                required: true, message: 'Please input the new password!',
                                        }],
                                        })(
                                            <Input type="text" onBlur={this.handleConfirmBlur}/>
                                        )}
                                    </FormItem>   */}
                                    <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={onConfirmCode}>
                                        Change Password
                                    </Button>
                                    </Form.Item> 
                      </div>
                    }
                </Form>
                    
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalChangePassword;