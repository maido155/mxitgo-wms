import React, { PureComponent } from 'react';
import TableAssignment from './TableAssignment';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash';
import { Drawer, Row, Col, Button, Icon, Divider } from 'antd';
import { isMobile } from 'react-device-detect';


export default class AssignmentOutComming extends PureComponent {
    onReset = (_this) => {
        _this.props.restartOutcomming(_this.props.currentOutcomming.key);
    }
    render() {
        let { dataOutcommingsByEntry } = this.props;
        console.log("AssignmentOutComming");
        console.log(dataOutcommingsByEntry);
        return (
            <div>
                <Drawer
                    title={`${formatMessage({ id: 'outComming.label.assignment-outcomming' })} -  ${this.props.productDesc}  `}
                    placement="right"
                    width={isMobile ? "100%" : "70%"}
                    closable={true}
                    onClose={this.props.closeOne}
                    visible={this.props.visibleOne}
                    getContainer={isMobile ? false : true}
                >
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={1} md={1} lg={1} xl={1} style={{ textAlign: "center" }}>
                            <Icon type="shopping-cart" />
                        </Col>
                        <Col xs={24} sm={12} md={9} lg={7} xl={5} style={{ textAlign: "center" }}>
                            <FormattedMessage id="outComming.label.products-assignment-outcomming" />
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={6} xl={3} style={{ textAlign: "center" }}>
                            <Button
                                disabled={this.props.recordKey == "" ? true : false}
                                type="danger"
                                onClick={() => { this.onReset(this) }}>
                                <FormattedMessage id="outComming.button.assignment-outcomming" />
                            </Button>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <TableAssignment
                                loading={this.props.loading}
                                postOutcomming={this.props.postOutcomming}
                                datesProductAll={this.props.datesProductAll}
                                currentOutcomming={this.props.currentOutcomming}
                                dataOutcommingsByEntry={dataOutcommingsByEntry}

                                //Props for Assign Product Drawer
                                visibleAssignProduct={this.props.visibleAssignProduct}
                                currentShipping={this.props.currentShipping}
                                onCloseDrawerAssigProduct={this.props.onCloseDrawerAssigProduct}
                                setDrawerAssignProduct={this.props.setDrawerAssignProduct}
                            />
                        </Col>
                    </Row>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '3px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button type="danger" onClick={this.props.closeOne}>
                            <FormattedMessage id="outComming.button.close-assignment-outcomming" />
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}