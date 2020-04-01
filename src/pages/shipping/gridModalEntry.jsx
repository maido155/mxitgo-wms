import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import DrawerProducts from './drawerEntryProducts';

const dataSource = [
    {
        name: 'Premium',
        quantities: '1200'

    },
    {
        name: 'Gold',
        quantities: '38'
    },
    {
        name: 'Segunda',
        quantities: '39'
    },
    {
        name: 'Mano',
        quantities: '79'
    },
    {
        name: 'Dedo',
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