import React, { PureComponent } from 'react';
import TableAssignment from './TableAssignment';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash';
import { Drawer, Row, Col, Button, Icon, Divider } from 'antd';
import { isMobile } from 'react-device-detect';


export default class AssignmentOutComming extends PureComponent {
    state = {
        boxesAssgn: 0,
        buttonAssign: false,
        buttonReset: true
    }

    onReset = (_this) => {
        const { datesOutcomming, currentOutcomming } = this.props;
        let getOutComming = datesOutcomming.filter(function(data){
            return data.dayDate === currentOutcomming.dayDate;
        })
        _this.props.restartOutcomming(getOutComming[0].key);
    }
    boxesRequired = (boxes, assignedBox) => {
        const { dayDatedatesOutcomming, datesOutcomming } = this.props;
        let getOutComming = datesOutcomming.filter(function(data){
            return data.dayDate === dayDatedatesOutcomming;
        })
        let boxesShow = getOutComming.length === 0 || getOutComming === undefined ? 0 : getOutComming[0].assignedBox;

        if( boxesShow === parseInt(boxes)){
            this.setState({
                buttonAssign: true
            })
        }else{
            this.setState({
                buttonAssign: false
            }) 
        }

        if(boxesShow === 0 || parseInt(boxesShow) === 0){
            this.setState({
                buttonReset: true
            })   
        }else{
            this.setState({
                buttonReset: false
            }) 
        }

        return boxesShow + ' de ' + boxes + ' cajas asignadas'
    }
    render() {
        let { dataOutcommingsByEntry, boxesRequired, assignedBox, currentOutcomming } = this.props;
        const { buttonReset } = this.state;
        return (
            <Drawer
                title={`${formatMessage({ id: 'outComming.label.assignment-outcomming' })} -  ${this.props.productDesc}  `}
                placement="right"
                width={isMobile ? "100%" : "70%"}
                closable={true}
                onClose={this.props.closeOne}
                visible={this.props.visibleOne}
                getContainer={false}
            >
                <Row type="flex" justify="center">
                    <Col xs={24} sm={1} md={1} lg={1} xl={1} style={{ textAlign: "center" }}>
                        <Icon type="shopping-cart" />
                    </Col>
                    <Col xs={24} sm={12} md={9} lg={7} xl={5} style={{ textAlign: "center" }}>
                        {this.boxesRequired(boxesRequired, assignedBox)}
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={6} xl={3} style={{ textAlign: "center" }}>
                        <Button
                            disabled={buttonReset}
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
                            visibleAssignProduct={this.props.visibleAssignProduct}
                            setVisibleAssignProduct={this.props.setVisibleAssignProduct}
                            
                            pallets={this.props.pallets}
                            box={this.props.box}
                            currentValuePallet={this.props.currentValuePallet}
                            currentValueBox={this.props.currentValueBox}
                            isFirstTime={this.props.isFirstTime}
                            shipment={this.props.shipment}

                            boxesRequired={boxesRequired}
                            assignedBox={this.props.assignedBox}
                            datesOutcomming={this.props.datesOutcomming}
                            dayDatedatesOutcomming={this.props.dayDatedatesOutcomming}
                            
                            setCurrentShipping={this.props.setCurrentShipping}
                            dataOutcommingsByEntry={dataOutcommingsByEntry}

                            buttonAssign={this.state.buttonAssign}
                        />
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
                    <Button onClick={this.props.closeOne}>
                        <FormattedMessage id="outComming.button.close-assignment-outcomming" />
                    </Button>
                </div>
            </Drawer>
        );
    }
}