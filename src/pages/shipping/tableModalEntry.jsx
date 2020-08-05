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
      dataIndex: 'ubicacion',
      key: 'ubicacion',
      width: 100,
    },
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.output' }),
      dataIndex: 'formattedDepartureDate',
      key: 'formattedDepartureDate',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.arrival' }),
      dataIndex: 'formattedDeliveryDate',
      key: 'formattedDeliveryDate',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.label.table-shipping.entry' }),
      dataIndex: 'formattedEntryDate',
      key: 'formattedEntryDate',
      width: 100,
    },
    
    {
      title: formatMessage({ id: 'shipping.shippingconfirmation.driver' }),
      dataIndex: 'chofer',
      key: 'chofer',
      width: 100,
    },
  ];
  
  const data = [
   {
        id: 'TE10112801',
        ubicacion: 'Teapa',
        premium: 1200,
        gold: 38,
        segunda: 39,
        mano: 79,
        dedo: 800,
        salida: 'Mie 13-07',
        llegada: 'Jue 14-07',
        entrada: 'Vie 15-07',
        chofer: 'Ramòn',
      },
     
  ];

  class tableModalEntry extends PureComponent {


    



      
    render() {

        

        this.props.data.formattedEntryDate = this.props.data.entryDate?.format("YYYY-MM-DD");
        this.props.data.formattedDeliveryDate = this.props.data.deliveryDate?.format("YYYY-MM-DD");
        this.props.data.formattedDepartureDate = this.props.data.departureDate?.format("YYYY-MM-DD");

        return (
          <Table columns={columns} dataSource={[this.props.data]} scroll={{x: 'max-content'}} pagination={false}/>  
        );
        
    }      
  }
  export default tableModalEntry;