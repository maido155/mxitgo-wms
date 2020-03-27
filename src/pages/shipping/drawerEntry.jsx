import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer,Button, Row, Col, Form, Input, Upload, Icon, message} from 'antd';
import TableModal from './tableModalEntry';
import GridModal from './gridModalEntry';
import {isMobile} from 'react-device-detect';

const { TextArea } = Input;

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

class drawerEntry extends PureComponent {
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

    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 9 },lg: { span: 8 },xl: { span: 7 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 15 },lg: { span: 16 },xl: { span: 17  }}
        };
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'camera'} />
            </div>
        );
        const { imageUrl } = this.state;
      return (
        <div>
            <Drawer
                title="Nueva Entrada"
                width={isMobile ? "100%" : "70%"}
                onClose={this.props.cancelModal}
                visible={this.props.visibleModal}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <TableModal/>
                <Row type="flex" justify="center" style={{marginTop: "2rem"}}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <GridModal/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label={'Comentarios'}>
                                <TextArea/>
                            </Form.Item>
                            <Form.Item label={'Foto'}>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload> 
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
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
                    <Button onClick={this.props.cancelModal} style={{ marginRight: 8 }} type="danger">
                        Cancelar
                    </Button>
                    <Button onClick={this.props.cancelModal} type="primary">
                        Programar
                    </Button>
                </div>
            </Drawer>
        </div>
      );
    }
  }
  
  export default drawerEntry;