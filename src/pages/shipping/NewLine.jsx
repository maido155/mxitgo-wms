import React from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import { Drawer, Button, Form, InputNumber, TreeSelect, message } from 'antd';
import { isMobile } from 'react-device-detect';
import moment from 'moment'; //add
import { _ } from 'lodash';

const { TreeNode } = TreeSelect;

const NewLine = Form.create()(
    class extends React.Component {
        state = {
            e: [],
            whNew: [],
        };

        onSelect = (selectedKeys, e) => {
            this.setState({ e });
            this.props.newLineSelect(selectedKeys);
        }
        renderTreeNode = (treeData) => {
            const { disableWarehouse, whName, masterMode, warehouses, locationTreeData } = this.props;
            var disable = disableWarehouse;
            if(masterMode == "EDIT" && warehouses.length != 0){
                var whNameEdit = locationTreeData.filter(function(data){
                    for(var i = 0; i < data.childLevel1.length; i++){
                        if(data.childLevel1[i].key == warehouses[0].warehouseId){
                            return data.childLevel1[i].key == warehouses[0].warehouseId;
                        }
                    }
                });
                disable = whNameEdit;
            }           
            if(masterMode == "CONF" && warehouses.length != 0){
                var whNameEdit = locationTreeData.filter(function(data){
                    for(var i = 0; i < data.childLevel1.length; i++){
                        if(data.childLevel1[i].key == warehouses[0].warehouseId){
                            return data.childLevel1[i].key == warehouses[0].warehouseId;
                        }
                    }
                });
                disable = whNameEdit;
            }
            let treeNode = [];
            if (treeData && treeData.length > 0) {
                treeData.map((ele, index) => {
                    treeNode.push(
                        <TreeNode value={ele.value} title={ele.title} key={ele.key} disabled={disable.length == 0 ? false : ele.key != disable[0].key}>
                            {this.renderChild1(ele, disable)}
                        </TreeNode>
                    );
                });
            }
            return treeNode;
        }
        disabledrenderChild1 = (data, item) => {
            if(data.length == 0){
                return false;
            }else{
                if(data[0].key != item.key){
                    return true
                }else{
                    return false;
                }
            }
        }
        renderChild1 = (element, disable) => {
            let childLevel1 = [];
            if (element.childLevel1) {
                element.childLevel1.map((item, i) => {
                    childLevel1.push(
                        <TreeNode parentTitle={element.title} parentValue={element.value} parentKey={element.key} value={item.value} title={item.title} 
                            key={item.key} disabled={this.disabledrenderChild1(disable, element)}>
                            {this.renderChild2(item)}
                        </TreeNode>
                    );
                });
            }
            return childLevel1;
        }
        renderChild2 = (item) => {
            let childLevel2 = [];
            if (item.childLevel2) {
                item.childLevel2.map((child, j) => {
                    childLevel2.push(
                        <TreeNode belongto={item.value} grade={item.grade} value={child.value} title={child.title} key={child.key} />
                    );
                });
            }
            return childLevel2;
        }

        handleSubmitLine = (event) => {
            var _self = this;
            this.props.form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                if (_self.props.lineMode === "NEW") {
                    //// Get values from Three control
                    if (_self.state.e.props.parentTitle == undefined) {
                        message.warning(<FormattedMessage id='shipping.newLine.messageWarningCenter'/>); //I18N *****************************************************************************************************
                        return;
                    }
                    var center = _self.state.e.props.parentTitle + '-' + _self.state.e.props.title;
                    var warehouseId = _self.state.e.props.eventKey;
                    var idShipping = _self.state.e.props.parentValue;
                } else {
                    var ThreeValues = {};
                    _self.props.locationTreeData.forEach((oTreedataState, iTreeDataIndex) => {
                        var bIsWarehouseInParent = false;
                        oTreedataState.childLevel1.forEach((oChildLevel, iChildLevelIndex) => {
                            if (oChildLevel.key === values.centro) {
                                ThreeValues["childKey"] = oChildLevel.key;
                                ThreeValues["childTitle"] = oChildLevel.title;
                                ThreeValues["childValue"] = oChildLevel.value;
                                bIsWarehouseInParent = true;
                            }
                        });
                        if (bIsWarehouseInParent) {
                            ThreeValues["parentKey"] = oTreedataState.key;
                            ThreeValues["parentTitle"] = oTreedataState.title;
                            ThreeValues["parentValue"] = oTreedataState.value;
                        }
                    });
                    var center = ThreeValues.parentTitle + '-' + ThreeValues.childTitle;
                    var warehouseId = ThreeValues.childKey;
                    var idShipping = ThreeValues.parentValue;
                }
                var premium = values.Premium;
                var finger = values.Dedo;
                var gold = values.Gold;
                var hand = values.Mano;
                var second = values.Segunda;
                var date = new Date();
                var datesGeneralNewLine = {
                    dateCreated: moment().format(),
                    createdByNew: localStorage.getItem('userName'),
                }



                /***********************************************/
                var objproducts = this.props.productsAll
                var productsAllLine=[];
                let objWarehouse = {};
                objproducts.forEach(function(catProduct){
                        objWarehouse[catProduct['WMS-1-SK']]  = values[catProduct['WMS-1-SK']];
                });
                objWarehouse['warehouseId']= warehouseId;
                objWarehouse['center']= center;
                objproducts.forEach(function(catProduct){
                    let product={}
                    product['product'] = catProduct['WMS-1-SK'];
                    product['productName']= catProduct['productName'];
                    product['amount'] = values[catProduct['WMS-1-SK']];
                    productsAllLine.push(product);
                });
                /***********************************************/



                if (_self.props.lineMode === "NEW") {
                    //warehouseIds.push(warehouseId);
                    //this.setState({ idShipping, datesGeneralNewLine, products, warehouseName });
                    //_self.props.insertWarehouse({ uiKey: warehouseUIKey, warehouseId, center: warehouse, "premium": premium, "gold": gold, "second": second, "hand": hand, "finger": finger });
                } else {
                    //this.setState({ idShipping, datesGeneralNewLine, products, warehouseName });
                    //_self.props.replaceWarehouse({ uiKey: warehouseUIKey, warehouseId, center: warehouse, "premium": premium, "gold": gold, "second": second, "hand": hand, "finger": finger });
                }
                _self.props.handleSubmitNewLine(_self.props.lineMode, { idShipping, datesGeneralNewLine }, { objWarehouse,products:productsAllLine});
                _self.props.form.resetFields();
                if(this.props.mode == "NEW||EDIT"){
                    _self.props.closeNewLine();
                }else{
                    _self.props.closeNewLineConfirm();
                }
            });
        }
        getNewLineEdit = (item,lineData) => {
            let products = [];
            if(Object.keys(lineData).length != 0){
                for(const prop in lineData){
                    let produ = {
                        "quantity": lineData[prop],
                        "name": prop
                    }
                    products.push(produ)
                }
                let getWarehouse = products.filter(function(data){
                    return data.name == item["WMS-1-SK"];
                })
                item["quantityEdit"] = getWarehouse[0].quantity;
                return item.quantityEdit
            }
            return 0
        }
        cancelNewLine = () => {
            this.props.form.resetFields();
            this.props.newLineCancelSelect();
        }
        cancelNewLineCon = () => {
            this.props.form.resetFields();
            this.props.closeNewLineConfirm();
        }
        render() {
            const formItemLayout = {
                labelCol: { xs: { span: 24 }, sm: { span: 8 }, md: { span: 8 }, lg: { span: 8 }, xl: { span: 6 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 }, xl: { span: 14 } }
            };
            var { lineData, mode, productsAll, whName, oShippingItem } = this.props;
            const { getFieldDecorator } = this.props.form;
            if (typeof lineData == "undefined") {
                lineData = {};
            }
            return (
                <div>
                    { productsAll !== undefined && productsAll.length !== 0 &&
                        <Drawer
                            title={formatMessage({ id: 'shipping.newline.label.title' })}
                            width={isMobile ? "100%" : "50%"}
                            closable={true}
                            onClose={mode == "NEW||EDIT" ? () => {this.cancelNewLine()} : () => {this.cancelNewLineCon()}}
                            visible={mode == "NEW||EDIT" ? this.props.visibleNewLine : this.props.visibleNewLineConfirm}
                        >
                            <Form {...formItemLayout} className={Styles.formnweline}>
                                <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.center' })}>
                                    {getFieldDecorator('centro',{ initialValue: lineData.warehouseId == undefined ? "" : lineData.warehouseId, rules: [{ required: true, message: <FormattedMessage id="shipping.newLine.missingCenter" /> }] })
                                        (<TreeSelect
                                            showSearch
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder={formatMessage({ id: 'shipping.treeselect.label.select' })}
                                            allowClear
                                            treeDefaultExpandAll
                                            onSelect={this.onSelect}
                                            disabled={oShippingItem.Operator == undefined ? false : oShippingItem.Operator == "" ? false : true}
                                        >
                                            {this.renderTreeNode(this.props.locationTreeData)}
                                        </TreeSelect>
                                    )}
                                </Form.Item>
                                {productsAll.map(item => (
                                    <Form.Item label={
                                        item.productName === 'Premium'
                                        ? formatMessage({ id: 'shipping.tablecomponent.label.premium'})
                                        : item.productName === 'Gold'
                                            ? formatMessage({ id: 'shipping.tablecomponent.label.gold'})
                                            : item.productName === 'Segunda'
                                                ? formatMessage({ id: 'shipping.tablecomponent.label.second'})
                                                : item.productName === 'Mano'
                                                    ? formatMessage({ id: 'shipping.tablecomponent.label.hand'})
                                                    :item.productName === 'Dedo'
                                                        ? formatMessage({ id: 'shipping.tablecomponent.label.finger'})
                                                        : formatMessage({ id: 'shipping.tablecomponent.label.no-label'})
                                    }>
                                        {getFieldDecorator(item['WMS-1-SK'],{initialValue: this.getNewLineEdit(item,lineData),rules: [{ required: true, message: <FormattedMessage id="shipping.newLine.missingValue" /> }] })
                                        (<InputNumber min={0} max={500}  style={{ width: '100%' }} disabled={oShippingItem.Operator == undefined ? false : oShippingItem.Operator == "" ? false : true}/>)}
                                    </Form.Item>
                                ))}
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
                                    <Button type="danger" className={Styles.cancelarfooter} onClick={mode == "NEW||EDIT" ? () => {this.cancelNewLine()} : () => {this.cancelNewLineCon()}}>
                                        <FormattedMessage id="shipping.button.cancel" />
                                    </Button>
                                    { oShippingItem.Operator == undefined
                                        ?   <Button type="primary" onClick={this.handleSubmitLine}>
                                                <FormattedMessage id="shipping.button.add" />
                                            </Button>
                                        : oShippingItem.Operator == ""
                                            ?
                                                <Button type="primary" onClick={this.handleSubmitLine}>   
                                                    <FormattedMessage id="shipping.button.add" />
                                                </Button>
                                            : <a></a>
                                    }
                                </div>
                            </Form>
                        </Drawer>
                    }
                </div>
            );
        };
    }
);
export default NewLine;