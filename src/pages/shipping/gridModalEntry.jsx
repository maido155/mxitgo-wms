import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerProducts from './drawerEntryProducts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const dataSource = [
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.premium'/>,
        quantities: '1200'

    }, 
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.gold'/>,
        quantities: '38'
    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.second'/>,
        quantities: '39'
    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.hand'/>,
        quantities: '79'
    },
    {
        name: <FormattedMessage id='shipping.tablecomponent.label.finger'/>,
        quantities: '800'
    }
]
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