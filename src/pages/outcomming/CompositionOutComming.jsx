import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Drawer, Button } from 'antd';
import TableCompostion from './TableComposition';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Assignment from './AssignmentOutComming';
import {isMobile} from 'react-device-detect';

export default class CompositionOutComming extends PureComponent {
    state ={
        visibleAssign: false,
    }
    showDrawerAssig = (_this) => {
        _this.props.getOutcommingByEntry(_this.props.currentOutcomming.key,_this.props.productKey); 
        _this.setState({
          visibleAssign: true,
        });
    };
    onDrawerAssig = () => {
        this.setState({
          visibleAssign: false,
        });
    };
    render() {
        const { disableButtonAssign } = this.props;
        return (
            <div>
                <Drawer
                    title={formatMessage({ id: 'outComming.label.composition-outcomming' })}
                    placement="right"
                    width={isMobile ? "100%" : "70%"}
                    closable={true}
                    onClose={this.props.closeTwo}
                    visible={this.props.visibleTwo}
                    getContainer={false} 
                >
                    <TableCompostion loading = {this.props.loading} compositionData ={this.props.compositionData}/>
                    
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
                        { disableButtonAssign === false &&
                            <Button style={{marginRight: 8,}} onClick={()=>{this.showDrawerAssig(this)}}>
                                <FormattedMessage id="outComming.button.composition-outcomming-assing"/>
                            </Button>
                        }
                        <Button onClick={this.props.closeTwo} type="primary">
                            <FormattedMessage id="outComming.button.close-assignment-outcomming"/>
                        </Button>
                    </div>
                </Drawer>
                <Assignment 
                    loading = {this.props.loading}
                    productDesc = {this.props.productDesc}
                    datesProductAll = {this.props.datesProductAll}
                    visibleOne={this.state.visibleAssign} 
                    currentOutcomming={this.props.currentOutcomming}
                    closeOne={this.onDrawerAssig}
                    postOutcomming= {this.props.postOutcomming}
                    restartOutcomming= {this.props.restartOutcomming}
                    recordKey= {this.props.recordKey}
                    visibleAssignProduct={this.props.visibleAssignProduct} 
                    setVisibleAssignProduct={this.props.setVisibleAssignProduct}
                    setCurrentShipping={this.props.setCurrentShipping}
                    
                    pallets={this.props.pallets}
                    box={this.props.box}
                    currentValuePallet={this.props.currentValuePallet}
                    currentValueBox={this.props.currentValueBox}
                    isFirstTime={this.props.isFirstTime}
                    shipment={this.props.shipment}
                    
                    dataOutcommingsByEntry={this.props.dataOutcommingsByEntry}

                    boxesRequired={this.props.boxesRequired}
                    assignedBox={this.props.assignedBox}
                    dayDatedatesOutcomming={this.props.dayDatedatesOutcomming}
                    datesOutcomming={this.props.datesOutcomming}

                    visibleBuy={this.props.visibleBuy}
                    setVisibleBuy={this.props.setVisibleBuy}
                    onCloseVisibleBuy={this.props.onCloseVisibleBuy}
                />
            </div>
        );            
    }
}