import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer, Button, Form, InputNumber,Upload, Icon, message, Input, Typography } from 'antd';
import {isMobile} from 'react-device-detect';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

const { Text } = Typography;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error(<FormattedMessage id='shipping.drawerEntry.messageErrorJPG'/>);
    }
        const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error(<FormattedMessage id='shipping.drawerEntry.messageErrorSize'/>);
    }
        return isJpgOrPng && isLt2M;
}

var disabledInputs = false;

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
            // if(imageUrl == undefined){
            //     message.warning(formatMessage({ id: 'shipping.drawerEntry.messagePhoto' }));
            //     return;
            // }
            values["urlImage"] = imageUrl;
            this.props.handleProduct(values);
            this.props.form.resetFields();
            this.setState({imageUrl: undefined})
            this.props.onCancel();
        });
    }
    typeProductName = (data, dataProduct) => {
        const { typeProduct } = this.props;
        if(data.commentEntry != undefined){
            if(data.products.length != 0){
                var getProducto = data.products[0].filter(function(data){
                    return data.product == typeProduct;
                })
                disabledInputs = true;
                return getProducto.length == 0 ? "" : getProducto[0].amount === '0' ? '' : getProducto[0].amount
            }
        }else{
            disabledInputs = false;
            let getProduct = dataProduct.filter(function(data){
                return data.id === typeProduct
            })
            return getProduct.length === 0 ? '' : getProduct[0].quantities === '0' ? '' : getProduct[0].quantities
        }
    }
    typeTemName = (data,dataProduct) => {
        const { typeProduct } = this.props;
        if(data.commentEntry != undefined){
            if(data.products.length != 0){
                var getProducto = data.products[0].filter(function(data){
                    return data.product == typeProduct;
                })
                disabledInputs = true;
                return getProducto.length == 0 ? "" : getProducto[0].temp
            }
        }else{
            disabledInputs = false;
            let getProduct = dataProduct.filter(function(data){
                return data.id === typeProduct
            })
            return getProduct.length === 0 ? '' : getProduct[0].temperature
        }
    }
    typePictureName = (data, uploadButton, dataProduct) => {
        const { typeProduct } = this.props;
        const { imageUrl } = this.state;
        if(data.commentEntry != undefined){
            if(data.products.length != 0){
                var getProducto = data.products[0].filter(function(data){
                    return data.product == typeProduct;
                })
                disabledInputs = true;
                return getProducto.length === 0
                    ? uploadButton
                    : getProducto[0].pictureProduct === ''
                        ? uploadButton
                        : <img src={getProducto[0].pictureProduct} alt="avatar" style={{ width: '100%' }}/>
            }
        }else{
            disabledInputs = false;
            let getProduct = dataProduct.filter(function(data){
                return data.id === typeProduct
            })
            return  getProduct.length === 0
                ? imageUrl 
                    ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> 
                    : uploadButton
                : getProduct.length === 1 && getProduct[0].urlImage === '' || getProduct[0].urlImage === undefined
                    ? imageUrl
                        ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> 
                        : uploadButton
                    : <img src={getProduct[0].urlImage} alt="avatar" style={{ width: '100%' }}/>
        }
    }
    onCloseDrawer = () => {
        this.props.form.resetFields();
        this.props.onCancel();
        this.setState({
            imageUrl: undefined
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
        };
        const { oShippingItem, typeProduct, quantities, dataProduct } = this.props;
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
                onClose={this.onCloseDrawer}
                visible={this.props.visibleDrawer}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form {...formItemLayout} onSubmit={this.handleEntryProduct} style={{marginTop: "5rem"}} >
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.confirmed' })}>
                        <Text strong>{quantities}</Text>  
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.amounts' })}>
                        {getFieldDecorator('entryProduct',{ initialValue: this.typeProductName(oShippingItem, dataProduct), 
                        rules: [{ required: true, message: <FormattedMessage id='shipping.drawerEntry.amountMissing'/> }] })(<InputNumber style={{ width: "100%"}} disabled={disabledInputs}/>)}
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.temperature' })}>
                        {getFieldDecorator('temperatureProduct',{ initialValue: this.typeTemName(oShippingItem, dataProduct),
                        rules: [{ required: true, message: <FormattedMessage id='shipping.drawerEntry.temperatureMissing'/> }] })(<Input disabled={disabledInputs}/>)}
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.photo' })}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                            disabled={disabledInputs}
                        >
                            {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                            {this.typePictureName(oShippingItem, uploadButton,dataProduct)}
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
                        <Button onClick={this.onCloseDrawer} style={{ marginRight: 8 }} type="danger">
                            <FormattedMessage id="shipping.button.cancel"/> 
                        </Button>
                        { oShippingItem == undefined || oShippingItem.commentEntry == undefined &&
                            <Button type="primary" htmlType="submit">
                                <FormattedMessage id="shipping.entryProduct.button.progra"/>
                            </Button>
                        }
                    </div>
                </Form>
            </Drawer>
        </div>
      );
      //I18N ***************************************************************************************************** CANCELAR Y PROGRAMAR BOTONES Y FECHAS NO SELECCIONADAS
    }
  }
export default Form.create()(drawerEntryProducts);