import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Drawer, Button } from 'antd';
import Table from './TableComposition';
import Assignment from './AssignmentOutWard';

export default class CompositionOutWard extends PureComponent {
    render() {
        return (
            <Drawer
                title="Ver composición"
                placement="right"
                width={"70%"}
                closable={true}
                onClose={this.props.closeTwo}
                visible={this.props.visibleTwo}
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
                    <Button style={{marginRight: 8,}} onClick={this.props.showOne}>Asignación</Button>
                    <Assignment
                        visibleOne={this.props.visibleOne}
                        closeOne={this.props.closeOne}
                    />
                    <Button onClick={this.props.closeTwo} type="primary">Aceptar</Button>
                </div>
            </Drawer>
        );            
    }
}