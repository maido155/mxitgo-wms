import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer } from 'antd';
import TableAssignment from './TableAssignment';

export default class AssignmentOutComming extends PureComponent {
    render(){
        const {closeAssignmentProduct, showAssignmentProduct, visibleAssignmentProduct, condition, visibleAsignarComposition} =this.props;
        return(
            <Drawer
                title={"Assignment"}
                placement="right"
                width={"70%"}
                closable={true}
                onClose={this.props.closeAsignar}
                visible={condition == false ? this.props.visibleAsignar : visibleAsignarComposition}
                getContainer={true}
            >
                <TableAssignment
                    closeAssignmentProduct={closeAssignmentProduct}
                    showAssignmentProduct={showAssignmentProduct}
                    visibleAssignmentProduct={visibleAssignmentProduct}
                />
            </Drawer>
        )
    }
}