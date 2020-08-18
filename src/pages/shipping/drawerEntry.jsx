import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer,Button, Row, Col, Form, Input, Upload, Icon, message, Spin} from 'antd';
import TableModal from './tableModalEntry';
import GridModal from './gridModalEntry';
import {isMobile} from 'react-device-detect';
import Styles from './StylesShipping.css';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import moment from 'moment';

const { TextArea } = Input;
var productsEdit = [];

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
        currentLoader: false,
        dataProducts: [],
        typeProduct: "",
        visisbleProducts: false ,
        product: "",
        temperatureProduct: "",
        urlImageProduct: "",
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
            quantities: 0,
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-2",
            quantities: 0,
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-3",
            quantities: 0,
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-4",
            quantities: 0,
            temperature: "",
            urlImage: ""
        },
        {
            id: "PRODUCT-5",
            quantities: 0,
            temperature: "",
            urlImage: ""
        }
    ]};
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
    handleEntry = e => {
        e.preventDefault();
        const { imageUrl } = this.state;
        const { oShippingItem } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(imageUrl == undefined){
                console.log("mensaje imagen");
                return;
            }
            var products = [];
            for(var i = 0; i < productsEdit.length; i++){
                if(productsEdit[i].temperature != "" && productsEdit[i].urlImage != ""){
                    var product = {
                        amount: productsEdit[i].quantities,
                        product: productsEdit[i].id,
                        productName: productsEdit[i].nameProduct,
                        temp: productsEdit[i].temperature,
                        picture: productsEdit[i].urlImage
                    }
                    products.push(product)
                }else{
                    console.log("mensaje datos");
                }
            }
            values["urlImageGeneral"] = imageUrl;
            values["createdBy"] = localStorage.getItem('userName'),
            values["date"] = moment().format("YYYY-MM-DD") + "T00:00:00.000Z";
            values["products"] = products;
            values["WMS-1-PK"] = oShippingItem.idShipping
            values["WMS-1-SK"] = oShippingItem.idShipping.substr(4)
            this.props.saveEntryShipping(values);
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
                        if(products[i].id == oShippingItem.products[0][k].product && products[i].id == dataProduct[j].id){
                            if(dataProduct[j].quantities == 0){
                                var dataProdu = {
                                    quantities: oShippingItem.products[0][k].amount,
                                    id: products[i].id,
                                    name: products[i].name,
                                    temperature: "",
                                    urlImage: "",
                                }
                            }else{
                                var dataProdu = {
                                    quantities: dataProduct[j].quantities,
                                    id: products[i].id,
                                    name: products[i].name,
                                    nameProduct: oShippingItem.products[0][k].productName,
                                    temperature: dataProduct[j].temperature,
                                    urlImage: dataProduct[j].urlImage
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
    render() {
        const formItemLayout = {
            labelCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 9 },lg: { span: 8 },xl: { span: 7 }},
            wrapperCol: {xs: { span: 24 },sm: { span: 24 },md: { span: 15 },lg: { span: 16 },xl: { span: 17  }}
        };
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'camera'} />
            </div>
        );
        let currentLoader = this.props.loading === undefined ? false : this.props.loading;
        const { oShippingItem } = this.props;
        const { dataSource, imageUrl } = this.state;
        this.setState({ currentLoader });
      return (
        <div>
            <Drawer
                title={formatMessage({ id: 'shipping.shippingEntry.title' })}
                width={isMobile ? "100%" : "70%"}
                onClose={this.props.closeEntry}
                visible={this.props.visibleEntry}
                bodyStyle={{ paddingBottom: 80 }}
                getContainer={isMobile ? false : true} 
            >
                <Form {...formItemLayout} onSubmit={this.handleEntry} className={Styles.comments}>
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
                                />
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.comments' })}>
                                    {getFieldDecorator('textEntry',{ rules: [{ required: true, message: "as" }]})(<TextArea/>)}
                                </Form.Item>
                                <Form.Item label={formatMessage({ id: 'shipping.shippingconfirmation.photo' })}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload> 
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
                        <Button onClick={this.props.closeEntry} style={{ marginRight: 8 }} type="danger">
                            <FormattedMessage id="shipping.button.cancel"/>
                        </Button>
                        <Button type="primary" htmlType="submit">
                            <FormattedMessage id="shipping.button.conf"/>
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </div>
      );
    }
  }
export default Form.create()(drawerEntry);