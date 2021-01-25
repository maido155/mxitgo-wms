import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import DrawerPartial from './drawerPartials'

var typeProduct = "";
var quantitiesShow = '';

class gridModalEntry extends React.Component {
    drawerProductInformation = (data,quantities) => {
        this.props.showPartial(data, this.props.dataProduct, this.props.oShippingItem);
        typeProduct = data;
        quantitiesShow = quantities;
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
                <DrawerPartial
                    closePartial={this.props.closePartial}
                    visiblePartial={this.props.visiblePartial}
                    typeProduct={typeProduct}
                    quantities={quantitiesShow}
                    dataProduct={dataProduct}
                    handleProductPar={this.props.handleProductPar}
                    onCancel={this.props.onCloseProducts}
                    oShippingItem={oShippingItem}
                    visibleDrawer={this.props.visisbleProducts}
                    showDrawerProducts={this.props.showDrawerProducts}
                    insertpartialProducts={this.props.insertpartialProducts}
                    partialProducts={this.props.partialProducts}
                    typePartial={this.props.typePartial}
                    modalDeletePartial={this.props.modalDeletePartial}
                />
          </div>
        );
    }
}

export default gridModalEntry;