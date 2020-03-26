import React, { PureComponent } from 'react';
import { Table, Input, Form } from 'antd';

class gridModalEntry extends React.Component {
    state = {
        dataSource: [
            {
                key: '0',
                features: 'Cantidades',
                premium: <Input/>,
                gold: <Input/>,
                second: <Input/>,
                hand: <Input/>,
                finger: <Input/>
            },
            {
                key: '1',
                features: 'Temperatura',
                premium: <Input/>,
                gold: <Input/>,
                second: <Input/>,
                hand: <Input/>,
                finger: <Input/>
            },
            {
                key: '2',
                features: 'Fotos',
                premium: <Input/>,
                gold: <Input/>,
                second: <Input/>,
                hand: <Input/>,
                finger: <Input/>
            },
        ],
        // count: 2,
    };

    columns = [
        {
            title: '',
            dataIndex: 'features',
            width: 100
        },
        {
            title: 'Premium',
            dataIndex: 'premium',
            align: 'center',
            width: 100
        },
        {
            title: 'Gold',
            dataIndex: 'gold',
            align: 'center',
            width: 100
        },
        {
            title: 'Segunda',
            dataIndex: 'second',
            align: 'center',
            width: 100
        },
        {
            title: 'Mano',
            dataIndex: 'hand',
            align: 'center',
            width: 100
        },
        {
            title: 'Dedo',
            dataIndex: 'finger',
            align: 'center',
            width: 100
        }
    ];

    render() {
        const { dataSource } = this.state;
        return (
            <Table 
                style={{marginTop: "2rem"}} 
                size="small" 
                columns={this.columns} 
                dataSource={dataSource} 
                pagination={false} 
                bordered={false}
                scroll={{x: 600}}
            />
        );
    }
}

export default gridModalEntry;