import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import { Drawer, Button, Form, InputNumber, TreeSelect, message } from 'antd';
import { isMobile } from 'react-device-detect';
import { _ } from 'lodash';

const { TreeNode } = TreeSelect;
const NewLine = Form.create()(
    class extends React.Component {
        state = {
            e: [],
            whNew: [],
            treeData: [
                {
                    title: 'Chiapas',
                    value: 'CHI',
                    key: '0-0',
                    childLevel1: [
                        {
                            title: 'La Escondida',
                            value: 'WH-1',
                            key: 'WH-1'
                        }
                    ]
                },
                {
                    title: 'Tabasco',
                    value: 'TAB',
                    key: '0-1',
                    childLevel1: [
                        {
                            title: 'El Muelle',
                            value: 'WH-2',
                            key: 'WH-2',
                        },
                        {
                            title: 'El Buscado',
                            value: 'WH-3',
                            key: 'WH-3',
                        },
                    ],
                },
            ]
        };

        onSelect = (selectedKeys, e) => {
            this.setState({ e });
        }

        renderTreeNode = (treeData) => {
            let treeNode = [];
            if (treeData && treeData.length > 0) {

                treeData.map((ele, index) => {
                    treeNode.push(
                        <TreeNode value={ele.value} title={ele.title} key={ele.key}>
                            {this.renderChild1(ele)}
                        </TreeNode>
                    );
                });


            }
            return treeNode;
        }

        renderChild1 = (element) => {
            let childLevel1 = [];
            if (element.childLevel1) {
                element.childLevel1.map((item, i) => {
                    childLevel1.push(
                        <TreeNode parentTitle={element.title} parentValue={element.value} parentKey={element.key}
                            value={item.value} title={item.title} key={item.key}>
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
                        message.warning('Tiene que agregar un centro');
                        return;
                    }


                    var center = _self.state.e.props.parentTitle + '-' + _self.state.e.props.title;
                    var warehouseId = _self.state.e.props.eventKey;
                    var idShipping = _self.state.e.props.parentValue;

                } else {


                    var ThreeValues = {};

                    _self.state.treeData.forEach((oTreedataState, iTreeDataIndex) => {

                        var bIsWarehouseInParent = false;

                        oTreedataState.childLevel1.forEach((oChildLevel, iChildLevelIndex) => {

                            if (oChildLevel.key === _self.props.lineData.warehouseId) {

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


                var premium = values.premium;
                var finger = values.finger;
                var gold = values.gold;
                var hand = values.hand;
                var second = values.second;
                var date = new Date();
                var datesGeneralNewLine = {
                    dateCreated: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
                    createdByNew: localStorage.getItem('userName'),
                }

                //var warehouseIds = _self.props.warehouseIds;

                var products = [{ product: "premium", "premium": "premium", amount: premium }, { product: "gold", "gold": "gold", amount: gold }, { product: "second", "second": "second", amount: second }, { product: "hand", "hand": "hand", amount: hand }, { product: "finger", "finger": "finger", amount: finger }];

                //products = [..._self.props.products, products];



                if (_self.props.lineMode === "NEW") {

                    //warehouseIds.push(warehouseId);
                    //this.setState({ idShipping, datesGeneralNewLine, products, warehouseName });
                    //_self.props.insertWarehouse({ uiKey: warehouseUIKey, warehouseId, center: warehouse, "premium": premium, "gold": gold, "second": second, "hand": hand, "finger": finger });
                } else {
                    //this.setState({ idShipping, datesGeneralNewLine, products, warehouseName });
                    //_self.props.replaceWarehouse({ uiKey: warehouseUIKey, warehouseId, center: warehouse, "premium": premium, "gold": gold, "second": second, "hand": hand, "finger": finger });
                }

                _self.props.handleSubmitNewLine(_self.props.lineMode, { idShipping, datesGeneralNewLine }, { warehouseLine: { warehouseId, center, "premium": premium, "gold": gold, "second": second, "hand": hand, "finger": finger }, products: products });





                _self.props.form.resetFields();
                _self.props.onCloseNewLine();



            });

        }



        render() {
            const formItemLayout = {
                labelCol: { xs: { span: 24 }, sm: { span: 8 }, md: { span: 8 }, lg: { span: 8 }, xl: { span: 6 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 }, xl: { span: 14 } }
            };
            const { getFieldDecorator } = this.props.form;
            const { handleSubmitNewLine } = this.props;
            var { lineData } = this.props;
            if (typeof lineData == "undefined") {
                lineData = {};
            }

            return (
                <div>
                    <Drawer
                        title={formatMessage({ id: 'shipping.newline.label.title' })}
                        width={isMobile ? "100%" : "50%"}
                        closable={true}
                        onClose={this.props.onCloseNewLine}
                        visible={this.props.visibleNewLine}
                    >
                        <Form {...formItemLayout} className={Styles.formnweline}>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.center' })}>
                                {getFieldDecorator('centro',
                                    { initialValue: lineData.warehouseId, rules: [{ required: true, message: "Centro no seleccionado" }] })
                                    (
                                        <TreeSelect
                                            //value= {"WH-1"}
                                            // key={"WH-1"}
                                            showSearch
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder={formatMessage({ id: 'shipping.treeselect.label.select' })}
                                            allowClear
                                            treeDefaultExpandAll
                                            onSelect={this.onSelect}
                                        >
                                            {this.renderTreeNode(this.props.locationTreeData)}
                                        </TreeSelect>
                                    )}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.premium' })}>
                                {getFieldDecorator('premium', { initialValue: lineData.premium })
                                    (<InputNumber min={0} max={500} style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.gold' })}>
                                {getFieldDecorator('gold', { initialValue: lineData.gold })
                                    (<InputNumber min={0} max={500} style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.second' })}>
                                {getFieldDecorator('second', { initialValue: lineData.second })
                                    (<InputNumber min={0} max={500} style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.hand' })}>
                                {getFieldDecorator('hand', { initialValue: lineData.hand })
                                    (<InputNumber min={0} max={500} style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.finger' })}>
                                {getFieldDecorator('finger', { initialValue: lineData.finger })
                                    (<InputNumber min={0} max={500} style={{ width: '100%' }} />)}
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
                                <Button type="danger" onClick={this.props.onCloseNewLine} className={Styles.cancelarfooter}>
                                    <FormattedMessage id="shipping.button.cancel" />
                                </Button>
                                <Button type="primary" onClick={this.handleSubmitLine}>
                                    <FormattedMessage id="shipping.button.program" />
                                </Button>
                            </div>
                        </Form>
                    </Drawer>
                </div>
            );
        };
    }
);
export default NewLine;