import React, { PureComponent } from 'react';
import { List } from 'antd';
import DrawerProducts from './drawerEntryProducts';

const dataSource = [
    {
        name: 'Premium'
    },
    {
        name: 'Gold'
    },
    {
        name: 'Segunda'
    },
    {
        name: 'Mano'
    },
    {
        name: 'Dedo'
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
                <List.Item key={item.id}actions={[<a onClick={this.showDrawerProducts} key={`a-${item.id}`}>Propiedades</a>,]}>
                    <List.Item.Meta title={item.name}/>
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