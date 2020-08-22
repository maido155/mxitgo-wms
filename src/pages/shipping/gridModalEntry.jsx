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
            //I18N ***************************************************************************************************** Cantidad en linea 22
            <div>
                <List
                    dataSource={this.props.productsEntry(dataSource)}
                    bordered
                    renderItem={item => (
                    <List.Item key={item.id} 
                    actions={
                        item.quantitiesCaptured == 0
                        ? [<a onClick={() => {this.drawerProductInformation(item.id)}} key={`a-${item.id}`}><Icon type="eye"/></a>]
                        : [<a onClick={() => {this.drawerProductInformation(item.id)}} key={`a-${item.id}`}><Icon type="eye"/></a>, <a><Icon type="check"/></a>]
                    }>
                        <List.Item.Meta title={item.name} 
                            description={<div><FormattedMessage id='shipping.gridModalEntry.amount'/>{item.quantities}<br /><FormattedMessage id='shipping.gridModalEntry.captured'/> {item.quantitiesCaptured} </div>  }/> 
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