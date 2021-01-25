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
        const { typeProduct, partialEdit, typePartial } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            if(typePartial === "new"){

                values["urlImage"] = imageUrl;

            }else{

                if(imageUrl === undefined){

                    values["urlImage"] = partialEdit[0].urlImage

                }else{

                    values["urlImage"] = imageUrl;
                    
                }

            }
            
            this.props.showTablePartial(values, typeProduct, partialEdit, typePartial)
            this.props.form.resetFields();
            this.setState({imageUrl: undefined})
            this.props.onCancel();
        });
    }
    typeProductName = (oShippingItem, dataProduct, typePartial, partialProducts,partialEdit) => {

        const { typeProduct } = this.props;

        if(oShippingItem.commentEntry != undefined){

            disabledInputs = true;

            if(partialEdit.length !== 0){

                
                let getProduct = partialProducts.filter(function(data){
                    return data.idPartial === partialEdit[0].idPartial
                })

                return  getProduct.length === 0  ? '' :  getProduct[0].entryProduct

            }

        }else{

            disabledInputs = false;

            if(typePartial === "new"){

                return ''

            }else{

                let getProduct = partialProducts.filter(function(data){
                    return data.idPartial === partialEdit[0].idPartial
                })

                return  getProduct.length === 0  ? '' :  getProduct[0].entryProduct

            }
        }
    }
    typeTemName = (oShippingItem, dataProduct, typePartial, partialProducts,partialEdit) => {

        const { typeProduct } = this.props;

        if(oShippingItem.commentEntry != undefined){

            disabledInputs = true;

            if(partialEdit.length !== 0){

                let getProduct = partialProducts.filter(function(data){
                    return data.idPartial === partialEdit[0].idPartial
                })
    
                return getProduct.length === 0 ? '' : getProduct[0].temperatureProduct

            }

        }else{

            disabledInputs = false;

            if(typePartial === "new"){

                return ''

            }else{

                let getProduct = partialProducts.filter(function(data){
                    return data.idPartial === partialEdit[0].idPartial
                })
    
                return getProduct.length === 0 ? '' : getProduct[0].temperatureProduct

            }
        }
    }
    typePictureName = (oShippingItem, uploadButton,dataProduct, typePartial, partialProducts,partialEdit) => {

        const { typeProduct } = this.props;
        const { imageUrl } = this.state;

        if(oShippingItem.commentEntry != undefined){

            disabledInputs = true;

            if(partialEdit.length !== 0){

                let getProduct = partialProducts.filter(function(data){
                    return data.idPartial === partialEdit[0].idPartial
                })

                return getProduct.length === 0 || getProduct[0].urlImage === undefined
                ? imageUrl
                    ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/>
                    : uploadButton
                : getProduct[0].urlImage === ""
                    ? uploadButton
                    : <img src={getProduct[0].urlImage} alt="avatar" style={{ width: '100%' }}/>

            }

        }else{

            disabledInputs = false;

            if(typePartial === "new"){

                return imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : uploadButton

            }else{

                let getProduct = partialProducts.filter(function(data){
                    return data.idPartial === partialEdit[0].idPartial
                })

                return getProduct.length === 0 || getProduct[0].urlImage === undefined
                    ? imageUrl
                        ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/>
                        : uploadButton
                    : <img src={getProduct[0].urlImage} alt="avatar" style={{ width: '100%' }}/>

            }
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
        const { oShippingItem, typeProduct, quantities, dataProduct, typePartial,partialProducts,partialEdit } = this.props;
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
                        {getFieldDecorator('entryProduct',{ initialValue: this.typeProductName(oShippingItem, dataProduct, typePartial, partialProducts,partialEdit), 
                        rules: [{ required: true, message: <FormattedMessage id='shipping.drawerEntry.amountMissing'/> }] })(<InputNumber style={{ width: "100%"}} disabled={disabledInputs}/>)}
                    </Form.Item>
                    <Form.Item label={formatMessage({ id: 'shipping.entryProducts.temperature' })}>
                        {getFieldDecorator('temperatureProduct',{ initialValue: this.typeTemName(oShippingItem, dataProduct, typePartial, partialProducts,partialEdit),
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
                            {this.typePictureName(oShippingItem, uploadButton,dataProduct, typePartial, partialProducts,partialEdit)}
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