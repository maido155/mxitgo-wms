import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Drawer, Button } from 'antd';
import Table from './TableComposition';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Assignment from './AssignmentOutWard';
import {isMobile} from 'react-device-detect';

export default class CompositionOutWard extends PureComponent {
    state ={
        visibleAssign: false,
    }
    showDrawerAssig = () => {
        this.setState({
          visibleAssign: true,
        });
    };
    onDrawerAssig = () => {
        this.setState({
          visibleAssign: false,
        });
    };
    render() {
        return (
            <div>
                <Drawer
                    title={formatMessage({ id: 'outWard.label.composition-outward' })}
                    placement="right"
                    width={isMobile ? "100%" : "70%"}
                    closable={true}
                    onClose={this.props.closeTwo}
                    visible={this.props.visibleTwo}
                    getContainer={false} 
                >
                    <Table/>
                    
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
                        <Button style={{marginRight: 8,}} onClick={this.showDrawerAssig}>
                            <FormattedMessage id="outWard.button.composition-outward-assing"/>
                        </Button>
                        <Button onClick={this.props.closeTwo} type="primary">
                            <FormattedMessage id="outWard.button.composition-outward-ok"/>
                        </Button>
                    </div>
                </Drawer>
                <Assignment visibleOne={this.state.visibleAssign} closeOne={this.onDrawerAssig}/>
            </div>
        );            
    }
}