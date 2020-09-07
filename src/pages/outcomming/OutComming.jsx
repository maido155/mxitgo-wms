import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import TableOutComming from './TableOutComming';

export default class OutComming extends PureComponent {
    state = {
        visibleAsignar: false,
        visibleAsignarComposition: false,
        visibleComposition: false,
        visibleAssignmentProduct: false,
        condition: false
    }
    showAsignar = (condition) => {
        if(condition === 'tGeneral'){
            this.setState({ visibleAsignar: true, condition: false})
        }else{
            this.setState({visibleAsignarComposition: true, condition: true})
        }
    }
    closeAsignar = () => {
        this.setState({ visibleAsignar: false, visibleAsignarComposition: false})
    }
    //---------------
    showComposition = () => {
        this.setState({ visibleComposition: true})
    }
    closeComposition = () => {
        this.setState({ visibleComposition: false})
    }
    //---------------
    showAssignmentProduct = () => {
        this.setState({ visibleAssignmentProduct: true})
    }
    closeAssignmentProduct = () => {
        this.setState({ visibleAssignmentProduct: false})
    }
    render(){
        return(
            <PageHeaderWrapper>
                <Card>
                    <TableOutComming
                        showAsignar={this.showAsignar}
                        visibleAsignar={this.state.visibleAsignar}
                        closeAsignar={this.closeAsignar}

                        showComposition={this.showComposition}
                        visibleComposition={this.state.visibleComposition}
                        visibleAsignarComposition={this.state.visibleAsignarComposition}
                        closeComposition={this.closeComposition}

                        showAssignmentProduct={this.showAssignmentProduct}
                        visibleAssignmentProduct={this.state.visibleAssignmentProduct}
                        closeAssignmentProduct={this.closeAssignmentProduct}

                        condition={this.state.condition}
                    /> 
                </Card>
            </PageHeaderWrapper>
        )
    }
}