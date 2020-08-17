import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Table} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const columns = [
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.id' }),
      dataIndex: 'idShipping',
      key: 'idShipping',
      width: 110,
    },
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.ubication' }),
      dataIndex: 'destinity',
      key: 'destinity',
      width: 100,
    },
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.output' }),
      dataIndex: 'departureDate',
      key: 'departureDate',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.arrival' }),
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.entry' }),
      dataIndex: 'entryDate',
      key: 'entryDate',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.shippingconfirmation.driver' }),
      dataIndex: 'Operator',
      key: 'Operator',
      width: 100,
    },
  ]; 

class tableModalEntry extends PureComponent {
  render() {
    const { oShippingItem } = this.props;
    if(oShippingItem.idShipping != undefined){
      var data = [{
        idShipping: oShippingItem.idShipping,
        destinity: oShippingItem.destinity,
        deliveryDate: oShippingItem.deliveryDate.substr(0,10),
        entryDate: oShippingItem.entryDate.substr(0,10),
        departureDate: oShippingItem.departureDate.substr(0,10),
        Operator: oShippingItem.Operator
      }]
    }else{
      var data = [];
    }
    return (
      <Table columns={columns} dataSource={data} scroll={{x: 'max-content'}} pagination={false}/>  
    );     
  }      
}
  export default tableModalEntry;