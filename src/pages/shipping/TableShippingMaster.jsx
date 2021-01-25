import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Table, Icon, Divider, Typography, Button } from 'antd';
import ConfirmationDrawer from './ConfirmationShipping';
import Entry from './drawerEntry'; //ADD
import { isMobile } from 'react-device-detect';
import Styles from './StylesShipping.css';
import moment from 'moment';
import { _ } from 'lodash';



const { Text } = Typography;

class TableShippingMaster extends PureComponent {



  formatDate = (mydate) => {
    let dateFormat = moment(mydate.slice(0, 10)).format('dddd');
    return dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1)
  };
  dates = (planned, confirmed) => {
    if (confirmed < planned) {
      return "danger"
    } else if (confirmed > planned) {
      return "warning"
    }
  }
  render() {
    const { datesTableShipping, deleteShipping, disableWarehouse,operatorAll } = this.props;
    let columns = [
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.id' }),
        dataIndex: 'WMS-1-PK',
        key: 'WMS-1-PK',
        width: isMobile ? 120 : 140,
        render: (record) => (
          record.substr(7)
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.des' }),
        dataIndex: 'destinity',
        key: 'destinity',
        width: isMobile ? 120 : 150,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.shipping' }),
        dataIndex: 'departureDate',
        width: isMobile ? 70 : 90,
        render: (text, record) => (
          <span>{this.formatDate(record.departureDate)}</span>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.arrival' }),
        dataIndex: 'deliveryDate',
        width: isMobile ? 70 : 90,
        render: (text, record) => (
          <span>{this.formatDate(record.deliveryDate)}</span>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.entry' }),
        dataIndex: 'entryDate',
        width: isMobile ? 70 : 90,
        render: (text, record) => (
          <span>{this.formatDate(record.entryDate)}</span>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.premium' }),
        dataIndex: 'PRODUCT-2',
        width: isMobile ? 130 : 100,
        render: (text, record) => (
        <Text type={this.dates(record.products[2].planned,record.products[2].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[2].product)}} className={Styles.producto}>{record.products[2].planned}/{record.products[2].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.gold' }),
        dataIndex: 'PRODUCT-1',
        width: isMobile ? 110 : 100,
        render: (text, record) => (
                <Text type={this.dates(record.products[3].planned,record.products[3].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[3].product)}} className={Styles.producto}>{record.products[3].planned}/{record.products[3].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.second' }),
        dataIndex: 'PRODUCT-3',
        width: isMobile ? 130 : 100,
        render: (text, record) => (
                <Text type={this.dates(record.products[1].planned,record.products[1].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[1].product)}} className={Styles.producto}>{record.products[1].planned}/{record.products[1].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.hand' }),
        dataIndex: 'PRODUCT-5',
        width: isMobile ? 120 : 100,
        render: (text, record) => (
                <Text type={this.dates(record.products[4].planned,record.products[4].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[4].product)}} className={Styles.producto}>{record.products[4].planned}/{record.products[4].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.finger' }),
        dataIndex: 'PRODUCT-4',
        width: isMobile ? 120 : 100,
        render: (text, record) => (
          <Text type={this.dates(record.products[0].planned,record.products[0].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[0].product)}} className={Styles.producto}>{record.products[0].planned}/{record.products[0].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.status' }),
        dataIndex: 'status',
        width: isMobile ? 90 : 90,
        render: (text, record) => (
          <span>
            {record.status === "NEW"
              ? <FormattedMessage id="shipping.label.table-shipping.status.new" />
              : record.status === "ENTRY"
                  ?<FormattedMessage id="shipping.label.table-shipping.status.entry" />
                  : record.status === "CONFIRMED"
                      ?<FormattedMessage id="shipping.label.table-shipping.status.confirmed" />
                      : <FormattedMessage id="shipping.label.table-shipping.status.no-status" />
            } 
          </span>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.actions' }),
        key: 'action',
        fixed: 'right',
        width: isMobile ? 100 : 390,
        render: (record) => (
          <>
            {record.status == "NEW"
              ?
                <>
                  <Button type="link" onClick={() => { this.props.showDrawerShipping("EDIT",record) }} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="edit" />
                      : <><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></>
                    }
                  </Button>
                  <Divider type="vertical"/>
                  <Button type="link" onClick={() =>{this.props.showConfirmation("CONF", record)}} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="check" />
                      : <><Icon type="check" /> <FormattedMessage id="shipping.label.table-shipping.confirm"/></>
                    }
                  </Button>
                  <Divider type="vertical"/>
                  <Button type="link" onClick={()=>{deleteShipping(record["WMS-1-PK"])}} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                      {isMobile
                        ? <Icon type="delete"/>
                        : <><Icon type="delete"/><FormattedMessage id="general.table.delete"/></>
                      }
                    </Button>
                  <Divider type="vertical"/>
                  <Button type="link" disabled={true} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="form" />
                      : <><Icon type="form" /> <FormattedMessage id="shipping.label.table-shipping.entry" /></>
                    }
                  </Button>
                </>
              : record.status == "CONFIRMED"
                ?
                <>
                  <Button type="link" disabled={true} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="edit" />
                      : <><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></>
                    }
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" onClick={() => { this.props.showConfirmation("CONF", record) }} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="eye" />
                      : <><Icon type="eye" /> <FormattedMessage id="shipping.label.table-shipping.confirm" /></>
                    }
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" disabled={true} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="delete" />
                      : <><Icon type="delete" /><FormattedMessage id="general.table.delete" /></>
                    }
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" onClick={() => { this.props.showEntry(record["WMS-1-PK"], record.status) }} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="form" />
                      : <><Icon type="form" /> <FormattedMessage id="shipping.label.table-shipping.entry" /></>
                    }
                  </Button>
                </>
                :
                <>
                  <Button type="link" disabled={true} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="edit" />
                      : <><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></>
                    }
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" disabled={true} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="check" />
                      : <><Icon type="check" /> <FormattedMessage id="shipping.label.table-shipping.confirm" /></>
                    }
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" disabled={true} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="delete" />
                      : <><Icon type="delete" /><FormattedMessage id="general.table.delete" /></>
                    }
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" onClick={() => { this.props.showEntry(record["WMS-1-PK"], record.status) }} style={{paddingRight: '1px', paddingLeft: '1px'}}>
                    {isMobile
                      ? <Icon type="eye" />
                      : <><Icon type="eye" /> <FormattedMessage id="shipping.label.table-shipping.entry" /></>
                    }
                  </Button>
                </>
            }
          </>
        ),
      }
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };

    return (
      <div>
        <ConfirmationDrawer
          //Props Drawer Confirmation
          visibleConfirmation={this.props.visibleConfirmation}
          closeConfirmation={this.props.closeConfirmation}
          oShippingItem={this.props.oShippingItem}
          loading={this.props.loading}
          operatorAll={this.props.operatorAll}
          warehouses={this.props.warehouses}
          warehouseIds={this.props.warehouseIds}
          lineData={this.props.lineData}
          lineMode={this.props.lineMode}
          insertWarehouse={this.props.insertWarehouse}
          replaceWarehouse={this.props.replaceWarehouse}
          masterMode={this.props.masterMode}
          confirmShipping={this.props.confirmShipping}
          products={this.props.products}
          close={this.props.close}
          isSuccess={this.props.isSuccess}
          changedSuccess={this.props.changedSuccess}
          changedClose={this.props.changedClose}
          updateShippingSuccess={this.props.updateShippingSuccess}
          showMessage={this.props.showMessage}

          //Props New Line
          visibleNewLineConfirm={this.props.visibleNewLineConfirm}
          showNewLineConfirm={this.props.showNewLineConfirm}
          closeNewLineConfirm={this.props.closeNewLineConfirm}
          mode={this.props.mode}
          productsAll={this.props.productsAll}
          locationTreeData={this.props.locationTreeData}
          disableWarehouse={disableWarehouse}
        />
        <Entry
          visibleEntry={this.props.visibleEntry}
          closeEntry={this.props.closeEntry}
          loading={this.props.loading}
          oShippingItem={this.props.oShippingItem}
          saveEntryShipping={this.props.saveEntryShipping}
          changedSuccess={this.props.changedSuccess}
          updateShippingSuccess={this.props.updateShippingSuccess}
          closeDrawerShipping={this.props.closeDrawerShipping}
          close={this.props.close}
          masterMode={this.props.masterMode}
          isSuccess={this.props.isSuccess}
          changedClose={this.props.changedClose}
          showMessageFeatures={this.props.showMessageFeatures}

          showPartial={this.props.showPartial}
          closePartial={this.props.closePartial}
          visiblePartial={this.props.visiblePartial}

          insertpartialProducts={this.props.insertpartialProducts}
          partialProducts={this.props.partialProducts}
          deletepartialProducts={this.props.deletepartialProducts}
          modalDeletePartial={this.props.modalDeletePartial}

        />
        <Table size="small"
          // rowSelection={rowSelection}
          columns={columns} dataSource={datesTableShipping} scroll={isMobile ? { x: 1300 } : { x: 1350 }} pagination={false} />
      </div>
    );
  }
}

export default TableShippingMaster;