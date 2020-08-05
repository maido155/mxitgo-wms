import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerEntryProducts from './drawerEntryProducts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const dataSource = [
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.premium' />,
        quantities: '1200'

    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.gold' />,
        quantities: '38'
    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.second' />,
        quantities: '39'
    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.hand' />,
        quantities: '79'
    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.finger' />,
        quantities: '800'
    }
]
class gridModalEntry extends React.Component {
    state = { visisbleProducts: false, currentProduct : "" };

    showDrawerProducts = (item) => {
        this.setState({
            visisbleProducts: true,
            currentProduct: item.id

        });
    };

    onCloseProducts = () => {




        this.setState({
            visisbleProducts: false,
            currentProduct: ""
        });
    };

    render() {




        var aDataSource = [];
        this.props.data.products.forEach(products => {


            products.forEach((oData => {
        
                let label = 'shipping.tablecomponent.label.' + oData.nombre;
                aDataSource.push(
                    {
                        name: oData.product,
                        quantities: oData.amount,
                        id : oData.product
    
                    });
    
            }
            ));

        });
        
        
        




        return (
            <div>
                <List
                    dataSource={aDataSource}
                    bordered
                    renderItem={item => (
                        <List.Item key={item.id} actions={[<a onClick={()=>this.showDrawerProducts(item)} key={`a-${item.id}`}><Icon type="eye" /></a>,]}>
                            <List.Item.Meta title={item.name} description={'Cantidad: ' + item.quantities} />
                        </List.Item>
                    )}
                />
                <DrawerEntryProducts
                    visibleDrawer={this.state.visisbleProducts}
                    onCancel={this.onCloseProducts} />
            </div>
        );
    }
}

export default gridModalEntry;