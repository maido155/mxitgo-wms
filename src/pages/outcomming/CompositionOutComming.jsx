import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutComming from './AssignmentOutComming';
import { Drawer, Button } from 'antd';

export default class CompositionOutComming extends PureComponent {
    render(){
        const { showAsignar, visibleAsignarComposition, closeAsignar, closeAssignmentProduct, showAssignmentProduct, visibleAssignmentProduct, condition } = this.props;
        return(
            <div>
                <AssignmentOutComming
                    visibleAsignarComposition={visibleAsignarComposition}
                    closeAsignar={closeAsignar}

                    closeAssignmentProduct={closeAssignmentProduct}
                    showAssignmentProduct={showAssignmentProduct}
                    visibleAssignmentProduct={visibleAssignmentProduct}

                    condition={condition}
                />
            <Drawer
                title={"composition"}
                placement="right"
                width={"70%"}
                closable={true}
                onClose={this.props.closeComposition}
                visible={this.props.visibleComposition}
                getContainer={true}
            >
                <Button type="danger" onClick={()=>{showAsignar()}}> 
                  <FormattedMessage id="outComming.button.assign"/>
                </Button>
            </Drawer>
            </div>
        )
    }
}