import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerProducts from './drawerEntryProducts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';


class gridModalEntry extends React.Component {
    state = { visisbleProducts: false };

    showDrawerProducts = () => {
      this.setState({
        visisbleProducts: true,
      });
    };
  
    onCloseProducts = () => {
      this.setState({
        visisbleProducts: false,
      });
    };
    render() {
        const { oShippingItem } = this.props;
        const dataSource = [
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.premium'/>,
                quantities: oShippingItem == undefined || oShippingItem.products.length == 0 ? 0 : oShippingItem.products[0][2].amount
        
            }, 
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.gold'/>,
                quantities: oShippingItem == undefined || oShippingItem.products.length == 0 ? 0 : oShippingItem.products[0][3].amount
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.second'/>,
                quantities: oShippingItem == undefined || oShippingItem.products.length == 0 ? 0 : oShippingItem.products[0][1].amount
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.hand'/>,
                quantities: oShippingItem == undefined || oShippingItem.products.length == 0 ? 0 : oShippingItem.products[0][4].amount
            },
            {
                name: <FormattedMessage id='shipping.tablecomponent.label.finger'/>,
                quantities: oShippingItem == undefined || oShippingItem.products.length == 0 ? 0 : oShippingItem.products[0][0].amount
            }
        ]
        return (
            <div>
            <List
                dataSource={dataSource}
                bordered
                renderItem={item => (
                <List.Item key={item.id}actions={[<a onClick={this.showDrawerProducts} key={`a-${item.id}`}><Icon type="eye"/></a>,]}>
                    <List.Item.Meta title={item.name} description={'Cantidad: ' + item.quantities}/>
                </List.Item>
                )}
            />
            <DrawerProducts
                visibleDrawer={this.state.visisbleProducts}
                onCancel={this.onCloseProducts}/>
          </div>
        );
    }
}

export default gridModalEntry;