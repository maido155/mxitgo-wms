import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerProducts from './drawerEntryProducts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';


class gridModalEntry extends React.Component {
    render() {
        const { dataSource } = this.props;
        return (
            <div>
                <List
                    dataSource={this.props.productsEntry(dataSource)}
                    bordered
                    renderItem={item => (
                    <List.Item key={item.id}actions={[<a onClick={() => {this.props.showDrawerProducts(item.id)}} key={`a-${item.id}`}><Icon type="eye"/></a>,]}>
                        <List.Item.Meta title={item.name} description={'Cantidad: ' + item.quantities}/>
                    </List.Item>
                    )}
                />
                <DrawerProducts
                    visibleDrawer={this.props.visisbleProducts}
                    onCancel={this.props.onCloseProducts}
                    handleProduct={this.props.handleProduct}
                />
          </div>
        );
    }
}

export default gridModalEntry;