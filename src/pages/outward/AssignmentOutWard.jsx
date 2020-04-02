import React, { PureComponent } from 'react';
import Table from './TableAssignment';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash'; 
import { Drawer,Row, Col, Button, Icon, Divider } from 'antd';
import {isMobile} from 'react-device-detect';

export default class AssignmentOutWard extends PureComponent {;
    render() {
        return (
            <Drawer
                title={formatMessage({ id: 'outWard.label.assignment-outward' })}
                placement="right"
                width={isMobile ? "100%" : "70%"}
                closable={true}
                onClose={this.props.closeOne}
                visible={this.props.visibleOne}
                getContainer={false} 
            >
                <Row type="flex" justify="center">
                    <Col xs={24} sm={1} md={1} lg={1} xl={1} style={{textAlign: "center"}}>
                        <Icon type="shopping-cart" />
                    </Col>
                    <Col xs={24} sm={12} md={9} lg={7} xl={5} style={{textAlign: "center"}}>
                        <FormattedMessage id="outWard.label.products-assignment-outward"/>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={6} xl={3} style={{textAlign: "center"}}>
                        <Button type="danger"><FormattedMessage id="outWard.button.assignment-outward"/></Button>
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Col span={24}>
                        <Table/>
                    </Col>
                </Row>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button style={{marginRight: 8,}} onClick={this.props.closeOne}>
                        <FormattedMessage id="outWard.button.cancel-assignment-outward"/>
                    </Button>
                    <Button onClick={this.props.closeOne} type="primary">
                        <FormattedMessage id="outWard.button.ok-assignment-outward"/>
                    </Button>
                </div>
            </Drawer>
        );            
    }
}