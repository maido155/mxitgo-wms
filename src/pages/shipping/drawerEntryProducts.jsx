import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button, Form, InputNumber,Upload, Icon, message, Input } from 'antd';
import {isMobile} from 'react-device-detect';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
        const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
        return isJpgOrPng && isLt2M;
}

class drawerEntryProducts extends PureComponent {
    state = {
        loading: false,
    };
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
    };

    handleEntryProduct = e => {
        e.preventDefault();
        const { imageUrl } = this.state;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(imageUrl == undefined){
                console.log("mensaje imagen");
                return;
            }
            values["urlImage"] = imageUrl;
            this.props.handleProduct(values);
            this.props.form.resetFields();
            this.setState({imageUrl: undefined})
            this.props.onCancel();
        });
    }
    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
        };
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'camera'} />
            </div>
        );
        const { imageUrl } = this.state;
      return (
        <div>
            <Drawer
                title={formatMessage({ id: 'shipping.entryProducts.title' })}
                width={isMobile ? "100%" : "40%"}
                onClose={this.props.onCancel}
                visible={this.props.visibleDrawer}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form {...formItemLayout} onSubmit={this.handleEntryProduct} style={{marginTop: "5rem"}} >
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.amounts' })}>
                        {getFieldDecorator('entryProduct',{rules: [{ required: true, message: "Fecha no seleccionada" }] })(<InputNumber style={{ width: "100%"}}/>)}
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.temperature' })}>
                    {getFieldDecorator('temperatureProduct',{rules: [{ required: true, message: "Fecha no seleccionada" }] })(<Input/>)}
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.photo' })}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
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
                        <Button onClick={this.props.onCancel} style={{ marginRight: 8 }} type="danger">
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Programar
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </div>
      );
    }
  }
export default Form.create()(drawerEntryProducts);