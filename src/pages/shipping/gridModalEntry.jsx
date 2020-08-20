import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerProducts from './drawerEntryProducts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

var typeProduct = "";
class gridModalEntry extends React.Component {
    drawerProductInformation = data => {
        this.props.showDrawerProducts(data)
        typeProduct = data;
    }
    render() {
        const { dataSource, oShippingItem } = this.props;
        return (
            <div>
                <List
                    dataSource={this.props.productsEntry(dataSource)}
                    bordered
                    renderItem={item => (
                    <List.Item key={item.id}actions={[<a onClick={() => {this.drawerProductInformation(item.id)}} key={`a-${item.id}`}><Icon type="eye"/></a>,]}>
                        <List.Item.Meta title={item.name} description={'Cantidad: ' + item.quantities}/>
                    </List.Item>
                    )}
                />
                <DrawerProducts
                    visibleDrawer={this.props.visisbleProducts}
                    oShippingItem={oShippingItem}
                    onCancel={this.props.onCloseProducts}
                    handleProduct={this.props.handleProduct}
                    typeProduct={typeProduct}
                />
          </div>
        );
    }
}

export default gridModalEntry;