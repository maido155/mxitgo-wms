import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesShipping.css';
import { Drawer, Button, Form, InputNumber, TreeSelect } from 'antd';
import {isMobile} from 'react-device-detect';
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
                    value: 'Chiapas1',
                    key: '0-0',
                    childLevel1: [
                        {
                            title: 'La Escondida',
                            value: 'La Escondida1',
                            key: 'WH-1'
                        }
                    ]
                },
                {
                    title: 'Tabasco',
                    value: 'Tabasco1',
                    key: '0-1',
                    childLevel1: [
                      {
                        title: 'El Muelle',
                        value: 'El Muelle1',
                        key: 'WH-2',
                      },
                      {
                        title: 'El Buscado',
                        value: 'El Buscado1',
                        key: 'WH-3',
                      },
                    ],
                },
            ]
        };

        onSelect = (selectedKeys, e) =>{
            this.setState({ e });
        }
    
        renderTreeNode = (treeData) =>{
            let treeNode = [];
            treeData.map((ele, index) => {
                treeNode.push(
                    <TreeNode value={ele.value} title={ele.title} key={ele.key}>
                        {this.renderChild1(ele)}
                    </TreeNode>
                );
            });
            return treeNode;
        }
    
        renderChild1 = (element) =>{
            let childLevel1 = [];
            if(element.childLevel1){
                element.childLevel1.map((item, i) => {
                    childLevel1.push(
                        <TreeNode fatherTitle={element.title} fatherValue={element.value}  fattherKey={element.key} 
                                  value={item.value} title={item.title} key={item.key}>
                            {this.renderChild2(item)}
                        </TreeNode>
                    );
                });
            }
            return childLevel1;
        }
    
        renderChild2 = (item) =>{
            let childLevel2 = [];
            if(item.childLevel2){
                item.childLevel2.map((child, j) => {
                    childLevel2.push(
                        <TreeNode belongto={item.value} grade={item.grade} value={child.value} title={child.title} key={child.key}/>
                    );
                });
            }
            return childLevel2;
        }

        render(){
            const formItemLayout = {
                labelCol: {xs: { span: 24 },sm: { span: 8 },md: { span: 8 },lg: { span: 8 },xl: { span: 6 }},
                wrapperCol: {xs: { span: 24 },sm: { span: 12 },md: { span: 12 },lg: { span: 12 },xl: { span: 14 }}
            };
            const { getFieldDecorator } = this.props.form;
            const { handleSubmit } = this.props;
            return(
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
                                    {rules: [{required: true, message: "Centro no seleccionado"}]})
                                (
                                    <TreeSelect
                                        showSearch
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder={formatMessage({ id: 'shipping.treeselect.label.select' })}
                                        allowClear
                                        treeDefaultExpandAll
                                        onSelect={this.onSelect}
                                        >
                                            {this.renderTreeNode(this.state.treeData)}
                                    </TreeSelect>
                                )}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.premium' })}>
                                {getFieldDecorator('premium')
                                (<InputNumber min={0} max={500} style={{ width: '100%'}}/>)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.gold' })}>
                                {getFieldDecorator('gold')
                                (<InputNumber min={0} max={500} style={{ width: '100%'}}/>)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.second' })}>
                                {getFieldDecorator('second')
                                (<InputNumber min={0} max={500} style={{ width: '100%'}}/>)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.hand' })}>
                                {getFieldDecorator('hand')
                                (<InputNumber min={0} max={500} style={{ width: '100%'}}/>)}
                            </Form.Item>
                            <Form.Item label={formatMessage({ id: 'shipping.tablecomponent.label.finger' })}>
                                {getFieldDecorator('finger')
                                (<InputNumber min={0} max={500} style={{ width: '100%'}}/>)}
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
                                    <FormattedMessage id="shipping.button.cancel"/>
                                </Button>
                                <Button type="primary" onClick={() => {handleSubmit(this.state.e)}}> 
                                    <FormattedMessage id="shipping.button.program"/>
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