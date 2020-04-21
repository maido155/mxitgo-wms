import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import Styles from './StylesShipping.css';
import { Form, Drawer, Button } from 'antd';
import {isMobile} from 'react-device-detect';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const NewLine = Form.create()(
    class extends React.Component {
        render(){
            const formItemLayout = {
                labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
                wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
            };
            const {form} = this.props;
            const { getFieldDecorator } = form;
            return (
                <Drawer
                    title={formatMessage({ id: 'shipping.newline.label.title' })}
                    width={isMobile ? "100%" : "50%"}
                    closable={true}
                    onClose={this.props.closeDrawer}
                    visible={this.props.visibleDrawer}
                >
                    <Form>
                        <div
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button type="danger" onClick={this.props.closeDrawer} className={Styles.cancelarfooter}>
                                <FormattedMessage id="shipping.button.cancel"/>
                            </Button>
                            <Button type="primary" onClick={this.props.closeDrawer} htmlType="submit">
                                <FormattedMessage id="shipping.button.program"/>
                            </Button>
                        </div>
                    </Form>
                </Drawer>

            );
        }
    }
);

export default NewLine;