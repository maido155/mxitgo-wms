import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer,Button, Row, Col, Form, Input, Upload, Icon, message, Spin, notification, Modal} from 'antd';
import TableModal from './tableModalEntry';
import GridModal from './gridModalEntry';
import {isMobile} from 'react-device-detect';
import Styles from './StylesShipping.css';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import moment from 'moment';

const { TextArea } = Input;
var productsEdit = [];

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
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

const openNotificationWithImage = type => {
    notification[type]({
      message: formatMessage({ id: 'shipping.drawerEntry.messagePhoto' }),
    });
};

class drawerEntry extends PureComponent {
    state = {
        loading: false,
        currentLoader: false,
        dataProducts: [],
        typeProduct: "",
        visisbleProducts: false ,
        product: "",
        temperatureProduct: "",
        urlImageProduct: "",
        fileList: [],
        previewVisible: false,
        previewImage: '',
        dataSource:[
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.premium'/>,
                id:"PRODUCT-2"
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.gold'/>,
                id:"PRODUCT-1"
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.second'/>,
                id:"PRODUCT-3"
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.hand'/>,
                id:"PRODUCT-5"
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.finger'/>,
                id:"PRODUCT-4"
            }
        ],
        dataProduct: [{
            id: "PRODUCT-1",
            quantities: '0',
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-2",
            quantities: '0',
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-3",
            quantities: '0',
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-4",
            quantities: '0',
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-5",
            quantities: '0',
            temperature: "",
            urlImage: ""
        }
    ]};
    handleEntry = e => {
        e.preventDefault();
        const { fileList } = this.state;
        const { oShippingItem } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            if(fileList.length == 0){
                openNotificationWithImage('warning')
                return;
            }
            let getProductInsert = productsEdit.filter(function(data){
                return data.temperature !== ""
            })
            if(getProductInsert.length === 0){
                this.props.showMessageFeatures('warning')
                return;
            }
            let products = productsEdit.map(function(data){
                return {
                    amount: data.quantitiesCaptured,
                    product: data.id,
                    productName: data.nameProduct,
                    temp: data.temperature,
                    picture: data.urlImage 
                }
            });
            let imagesGeneral = fileList.map(function(data){
                return {
                    dataImage: data.thumbUrl
                }
            })
            values["urlImageGeneral"] = imagesGeneral;
            values["createdBy"] = localStorage.getItem('userName'),
            values["date"] = moment().format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["products"] = products;
            values["WMS-1-PK"] = oShippingItem.idShipping
            values["WMS-1-SK"] = oShippingItem.idShipping.substr(4)
            values["skWh"] = oShippingItem.warehouse
            this.props.saveEntryShipping(values);
            const { dataProduct } = this.state;
            let productsCancel = [];
            for(var i = 0; i < dataProduct.length; i++){
                let data = {
                    id: dataProduct[i].id,
                    quantities: '0',
                    temperature: "",
                    urlImage: "",
                }
                productsCancel.push(data);
            }
            this.setState({dataProduct: productsCancel, fileList: []})
            this.props.form.resetFields();
        });
    }
    productsEntry = (products) => {
        const { oShippingItem } = this.props;
        const { dataProduct } = this.state;
        const productsList = [];
        if(oShippingItem.products.length != 0){
            for(var i = 0; i < products.length; i++){
                for(var k = 0; k < oShippingItem.products[0].length; k++){
                    for(var j = 0; j < dataProduct.length; j++){
                        if(products[i].id === oShippingItem.products[0][k].product && products[i].id === dataProduct[j].id){
                            if(dataProduct[j].quantities === '0'){

                                if(oShippingItem.products[0][k].confAmount !== undefined){
                                    var dataProdu = {
                                        quantitiesCaptured: oShippingItem.products[0][k].amount,
                                        id: products[i].id,
                                        name: products[i].name,
                                        temperature: "",
                                        urlImage: "",
                                        quantities: oShippingItem.products[0][k].confAmount,
                                        nameProduct: oShippingItem.products[0][k].productName,
                                    }
                                }else{
                                    var dataProdu = {
                                        quantitiesCaptured: dataProduct[j].quantities,
                                        id: products[i].id,
                                        name: products[i].name,
                                        temperature: "",
                                        urlImage: "",
                                        quantities: oShippingItem.products[0][k].amount,
                                        nameProduct: oShippingItem.products[0][k].productName,
                                    }

                                }
                            }else{
                                var dataProdu = {
                                    quantitiesCaptured: dataProduct[j].quantities,
                                    id: products[i].id,
                                    name: products[i].name,
                                    nameProduct: oShippingItem.products[0][k].productName,
                                    temperature: dataProduct[j].temperature,
                                    urlImage: dataProduct[j].urlImage,
                                    quantities: oShippingItem.products[0][k].amount
                                }
                            }
                            productsList.push(dataProdu);
                        }
                    }
                }
            }
        }
        productsEdit = productsList;
        return productsList;
    }
    handleProduct = (dataProducts) => {
        const { dataProduct, typeProduct } = this.state;
        let getProduct = dataProduct.map(function(dataPro){
            return dataPro.id;
        }).indexOf(typeProduct);
        let newState = Object.assign({}, this.state);
        newState.dataProduct[getProduct].quantities = dataProducts.entryProduct;
        newState.dataProduct[getProduct].temperature = dataProducts.temperatureProduct;
        newState.dataProduct[getProduct].urlImage = dataProducts.urlImage;
        this.setState({ 
            dataProduct : newState.dataProduct,
        })
    }
    /****************************/
    showDrawerProducts = (product) => {
        this.setState({
          visisbleProducts: true,
          typeProduct: product
        });
    };
    onCloseProducts = () => {
        this.setState({
          visisbleProducts: false,
        });
    };
    onCloseDrawerPrincipal = () => {
        const { dataProduct } = this.state;
        let productsCancel = [];
        for(var i = 0; i < dataProduct.length; i++){
            let data = {
                id: dataProduct[i].id,
                quantities: '0',
                temperature: "",
                urlImage: "",
            }
            productsCancel.push(data);
        }
        this.setState({ imageUrl: "", dataProduct: productsCancel})
        this.props.form.resetFields();
        this.props.closeEntry();
    }
    onPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }  
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    }
    handleCancelModal = () => this.setState({ previewVisible: false });
    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 9 },lg: { span: 8 },xl: { span: 7 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 15 },lg: { span: 16 },xl: { span: 17  }}
        };
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        let currentLoader = this.props.loading === undefined ? false : this.props.loading;
        const { oShippingItem } = this.props;
        const { dataSource, imageUrl, fileList,  previewVisible, previewImage} = this.state;
        this.setState({ currentLoader });
        
        if (this.props.close == true) {
            this.props.closeEntry();
            this.props.changedClose();
        }
      return (
        <div>
            <Drawer
                title={formatMessage({ id: 'shipping.shippingEntry.title' })}
                width={isMobile ? "100%" : "70%"}
                onClose={this.onCloseDrawerPrincipal}
                visible={this.props.visibleEntry}
                bodyStyle={{ paddingBottom: 80 }}
                getContainer={isMobile ? false : true} 
            >
                <Form {...formItemLayout} className={Styles.comments}>
                    <Spin spinning={this.state.currentLoader}>    
                        <TableModal 
                            oShippingItem={oShippingItem}
                        />
                        <Row type="flex" justify="center" style={{marginTop: "2rem", marginBottom: "5rem"}}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <GridModal 
                                    oShippingItem={oShippingItem}
                                    dataSource={dataSource}
                                    productsEntry={this.productsEntry}
                                    handleProduct={this.handleProduct}
                                    showDrawerProducts={this.showDrawerProducts}
                                    visisbleProducts={this.state.visisbleProducts}
                                    onCloseProducts={this.onCloseProducts}
                                    dataProduct={this.state.dataProduct}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.comments' })}>
                                    {getFieldDecorator('textEntry',{ initialValue:  oShippingItem == undefined || oShippingItem.commentEntry == undefined ? "" : oShippingItem.commentEntry, 
                                    rules: [{ required: false, message: <FormattedMessage id='shipping.drawerEntry.messageComment'/> }]})(<TextArea disabled={oShippingItem == undefined || oShippingItem.commentEntry == undefined ? false : true}/>)}
                                </Form.Item>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.photo' })}>
                                    <Upload
                                        listType="picture-card"
                                        fileList={oShippingItem.commentEntry !== undefined ? oShippingItem.picture : fileList}
                                        onPreview = {this.onPreview}
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                        disabled={oShippingItem == undefined || oShippingItem.commentEntry == undefined ? false : true}
                                    >
                                        {
                                            fileList.length >= 8 
                                                ? null 
                                                : uploadButton
                                        }
                                    </Upload> 
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelModal} width={'50%'}>
                                        <img alt="example" style={{ width: '100%', paddingTop: '1rem' }} src={previewImage} />
                                    </Modal>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Spin>
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
                        <Button onClick={this.onCloseDrawerPrincipal} style={{ marginRight: 8 }} type="danger">
                            <FormattedMessage id="shipping.button.cancel"/>
                        </Button>
                        { oShippingItem == undefined || oShippingItem.commentEntry == undefined &&
                            <Button type="primary" onClick={this.handleEntry}>
                                <FormattedMessage id="shipping.button.conf"/>
                            </Button>
                        }
                    </div>
                </Form>
            </Drawer>
        </div>
      );
    }
  }
export default Form.create()(drawerEntry);