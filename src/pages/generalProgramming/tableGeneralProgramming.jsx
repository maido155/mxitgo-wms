import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { isMobile } from 'react-device-detect';
import { Table, Divider, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

class TableGeneralProgramming extends PureComponent {
    render() {
        const { datesPrograming, cancelProgramming, visibleNewDrawer, onCloseNewDrawer, showEditDrawer, showVisualizar } = this.props;
        const columns = [{
            title: formatMessage({ id: "general.calendar.week" }),
            dataIndex: 'Week',
            key: 'Week',
            width: isMobile ? 100 : 100
        },
        {
            title: formatMessage({ id: "general.table.kingproduct" }),
            dataIndex: 'Product',
            key: 'Product',
            width: isMobile ? 130 : 100
        },
        {
            title: formatMessage({ id: "general.table.client" }),
            dataIndex: 'Client',
            key: 'Client',
            width: isMobile ? 90 : 100
        },
        {
            title: formatMessage({ id: "general.modal-label.pallets" }),
            dataIndex: 'Pallets',
            key: 'Pallets',
            width: isMobile ? 90 : 100
        },
        {
            title: formatMessage({ id: "general.modal-label.boxes" }),
            dataIndex: 'Box',
            key: 'Box',
            width: isMobile ? 90 : 100
        },
        {
            title: formatMessage({ id: "general.table.status" }),
            dataIndex: 'status',
            key: 'status',
            width: isMobile ? 100 : 100,
            render: (text, record) => (
                <FormattedMessage id="general.table.New" />
            )
        },
        {
            title: <FormattedMessage id="general.table.actions-mobil" />,
            key: 'action',
            fixed: 'right',
            width: isMobile ? 120 : 260,
            render: (record) => (
                <span>
                    <a onClick={() => { showEditDrawer(record.Sk, record.Client, record.Product) }}>
                        {isMobile
                            ? <Icon type="edit" />
                            : <span><Icon type="edit" /> <FormattedMessage id="general.table.edit" /></span>
                        }
                    </a >
                    <Divider type="vertical" />
                    <a onClick={() => { cancelProgramming(record.Sk, record.Client, record.Product) }}>
                        {isMobile
                            ? <Icon type="delete" />
                            : <span><Icon type="delete" /> <FormattedMessage id="general.table.delete" /></span>

                        }
                    </a >
                    <Divider type="vertical" />
                    <a onClick={() => { showVisualizar(record.Sk, record.Client, record.Product) }}>
                        {isMobile
                            ? <Icon type="eye" />
                            : <span><Icon type="eye" /> <FormattedMessage id="general.modal-visualize" /></span>
                        }
                    </a>
                </span>
            )
        }];
        return (
            <div>
                <Table style={{ marginTop: "2%" }} size="small"
                    // rowSelection={rowSelection}
                    columns={columns} dataSource={datesPrograming} scroll={isMobile ? { x: 720 } : { x: 950 }} />
            </div>
        );
    }
}

export default TableGeneralProgramming;