import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer } from 'antd';

export default class  DrawerAssignmentProduct extends PureComponent {
    render(){
        return(
            <Drawer
                title={"Assignment Product"}
                placement="right"
                width={"70%"}
                closable={true}
                onClose={this.props.closeAssignmentProduct}
                visible={this.props.visibleAssignmentProduct}
                getContainer={true}
            >
            </Drawer>
        )
    }
}