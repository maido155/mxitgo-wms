import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerProducts from './drawerEntryProducts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

var typeProduct = "";
var quantitiesShow = '';

class gridModalEntry extends React.Component {
    drawerProductInformation = (data,quantities) => {
        this.props.showDrawerProducts(data)
        typeProduct = data;
        quantitiesShow = quantities;
        console.log(quantitiesShow);
    }
    render() {
        const { dataSource, oShippingItem, dataProduct } = this.props;
        return (
            //I18N ***************************************************************************************************** Cantidad en linea 22
            <div>
                <List
                    dataSource={this.props.productsEntry(dataSource)}
                    bordered
                    renderItem={item => (
                    <List.Item key={item.id} 
                    actions={
                        item.quantitiesCaptured === '0'
                        ? [<a onClick={() => {this.drawerProductInformation(item.id, item.quantities)}} key={`a-${item.id}`}><Icon type="eye"/></a>]
                        : [<a onClick={() => {this.drawerProductInformation(item.id, item.quantities)}} key={`a-${item.id}`}><Icon type="eye"/></a>, <a style={{cursor: 'default'}}><Icon type="check"/></a>]
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
                    quantities={quantitiesShow}
                    dataProduct={dataProduct}
                />
          </div>
        );
    }
}

export default gridModalEntry;