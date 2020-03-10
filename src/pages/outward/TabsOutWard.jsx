import React, { PureComponent } from 'react';
import TableOutWard from './TableOutWard';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { _ } from 'lodash'; 
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class TabsOutWard extends PureComponent {
    render() {
        return (
            <Tabs type="card">
                <TabPane tab={formatMessage({ id: 'outWard.label.tabs-one' })} key="1">
                    <TableOutWard
                        visibleDrawerOne={this.props.visibleDrawerOne}
                        showDrawerOne={this.props.showDrawerOne}
                        closeDrawerOne={this.props.closeDrawerOne}
                        visibleDrawerTwo={this.props.visibleDrawerTwo}
                        showDrawerTwo={this.props.showDrawerTwo}
                        closeDrawerTwo={this.props.closeDrawerTwo}     
                    />
                </TabPane>
                <TabPane tab={formatMessage({ id: 'outWard.label.tabs-two' })} key="2">
                    <TableOutWard
                        visibleDrawerOne={this.props.visibleDrawerOne}
                        showDrawerOne={this.props.showDrawerOne}
                        closeDrawerOne={this.props.closeDrawerOne}
                        visibleDrawerTwo={this.props.visibleDrawerTwo}
                        showDrawerTwo={this.props.showDrawerTwo}
                        closeDrawerTwo={this.props.closeDrawerTwo}     
                    />
                </TabPane>
                <TabPane tab={formatMessage({ id: 'outWard.label.tabs-three' })} key="3">
                    <TableOutWard
                        visibleDrawerOne={this.props.visibleDrawerOne}
                        showDrawerOne={this.props.showDrawerOne}
                        closeDrawerOne={this.props.closeDrawerOne}
                        visibleDrawerTwo={this.props.visibleDrawerTwo}
                        showDrawerTwo={this.props.showDrawerTwo}
                        closeDrawerTwo={this.props.closeDrawerTwo}     
                    />
                </TabPane>
            </Tabs>
        );            
    }
}