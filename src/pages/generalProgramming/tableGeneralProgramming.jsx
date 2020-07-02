import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon } from 'antd';
import { FormattedMessage} from 'umi-plugin-react/locale';
import DrawerNew from './drawerGeneralProgramming';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
}; 

class TableGeneralProgramming extends PureComponent{
    render(){
        const { datesPrograming, cancelProgramming, visibleNewDrawer, onCloseNewDrawer, showEditDrawer } = this.props;
        const columns = [{
            title: 'Semana',
            dataIndex: 'Week',
            key: 'Week',
            width: isMobile ? 100 :100
        },
        {
            title: 'Tipo de producto',
            dataIndex: 'Product',
            key: 'Product',
            width: isMobile ? 130 :100
        },
        {
            title: 'Cliente',
            dataIndex: 'Client',
            key: 'Client',
            width: isMobile ? 90 :100
        },
        {
            title: 'Cajas',
            dataIndex: 'Box',
            key: 'Box',
            width: isMobile ? 90 :100
        },
        {
            title: 'Pallets',
            dataIndex: 'Pallets',
            key: 'Pallets',
            width: isMobile ? 90 :100
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: isMobile ? 100 :100
        },
        {
            title: <FormattedMessage id="general.table.actions-mobil"/>,
            key: 'action',
            fixed: 'right',
            width: isMobile ? 120 : 350,
            render: (record) => (
                <span>
                    <a onClick={() => {showEditDrawer(record.Sk)}}>
                        {isMobile
                            ? <Icon type="edit"/>
                            : <span><Icon type="edit"/>Editar</span>
                        }
                    </a >
                    <Divider type="vertical" />
                    <a onClick={()=>{cancelProgramming(record.Sk)}}>
                        {isMobile
                            ? <Icon type="edit"/>
                            : <span><Icon type="edit"/>Eliminar</span>
                        }
                    </a >
                    <Divider type="vertical" />
                    <a>
                        {isMobile
                            ? <Icon type="arrows-alt"/>
                            : <span><Icon type="arrows-alt" />Pendiente</span>
                        }
                    </a>
                    <Divider type="vertical" />
                    <a>
                        {isMobile
                            ? <Icon type="eye"/>
                            : <span><Icon type="eye"/>Visualizar</span>
                        }
                    </a>
                </span>
            )
        }];
        return(
            <div>
                <Table  style={{marginTop: "2%"}} size="small" rowSelection={rowSelection} columns={columns} dataSource={datesPrograming} scroll={isMobile ? {x: 720} : {x: 950}}/>
            </div>
        );
    }
}

export default TableGeneralProgramming;