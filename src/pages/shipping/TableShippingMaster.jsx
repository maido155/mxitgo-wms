import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {isMobile} from 'react-device-detect';
import { Table, Divider, Icon, Typography } from 'antd';
import ModalDeleteComponent from '../generalComponents/ModalDeleteComponent';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import ModalProductTable from '../generalComponents/ModalProductTable';
import Styles from './StylesShipping.css';

const { Text } = Typography;

export default class TableShippingMaster extends PureComponent{
  state={
    visibleModalProduct: false
  };
  showModal = () => {
    this.setState({
      visibleModalProduct: true,
    });
  };
  handleOk = e => {
    this.setState({
      visibleModalProduct: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visibleModalProduct: false,
    });
  };

    render(){
      let columns = [
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.id' }),
          dataIndex: 'id',
          key: 'id',
          width: 140,
          render: text => <a>{text}</a>
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.shipping' }),
          dataIndex: 'envio',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.arrival' }),
          dataIndex: 'llegada',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.entry' }),
          dataIndex: 'entrada',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.premium' }),
          dataIndex: 'premium',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.gold' }),
          dataIndex: 'gold',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.second' }),
          dataIndex: 'segunda',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.hand' }),
          dataIndex: 'mano',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.finger' }),
          dataIndex: 'dedo',
          width: 100
        },
        {
          title: formatMessage({ id: 'shipping.label.table-shipping.status' }),
          dataIndex: 'status',
          width: 100
        }
      ];

      const data = [
        {
          key: '1',
          id: 'TE0101023912231',
          envio: 'Lunes',
          llegada: 'Martes',
          entrada: 'Miercoles',
          premium: <Text type="danger" onClick={this.showModal} className={Styles.producto}>1200/1150</Text>,
          // premium:'1200/1150',
          gold:'39/39',
          segunda:'0/39',
          mano: '0/39',
          dedo: '0/39',
          status: 'Pendiente'
        },
        {
          key: '2',
          id: 'TE0101023912232',
          envio: 'Martes',
          llegada: 'Miercoles',
          entrada: 'Jueves',
          premium:'300/-',
          gold:'220/-',
          segunda:'220/-',
          mano: '220/-',
          dedo: '220/-',
          status: 'Terminado'
        },
        {
          key: '3',
          id: 'TE0101023912233',
          envio: 'Miercoles',
          llegada: 'Jueves',
          entrada: 'Viernes',
          premium:'24/-',
          gold:'43/-',
          segunda:'43/-',
          mano: '43/-',
          dedo: '43/-',
          status: 'Proceso'
        }
      ];

      if(isMobile){
        columns.push(
          {
            title: formatMessage({ id: 'shipping.label.table-shipping.actions' }),
            key: 'action',
            fixed: 'right',
            width: 130,
            render: () => (
              <span>
                  <a onClick={this.props.clickFirstTable}>
                    <Icon type="edit" />
                  </a>
                <Divider type="vertical" />
                  <a onClick={this.props.clickthirdTable}>
                    <Icon type="check" />
                  </a>
                <Divider type="vertical" />
                  <ModalDeleteComponent/>
                <Divider type="vertical" />
                  <a onClick={this.props.clickModal}><Icon type="form" /></a>
              </span>
            ),
          }
        );
      }else{
        columns.push(
          {
            title: formatMessage({ id: 'shipping.label.table-shipping.actions' }),
            key: 'action',
            fixed: 'right',
            width: 340,
            render: () => (
              <span>
                  <a onClick={this.props.clickFirstTable}>
                    <Icon type="edit" /><FormattedMessage id="shipping.label.table-shipping.edit"/>
                  </a>
                <Divider type="vertical" />
                  <a onClick={this.props.clickthirdTable}>
                    <Icon type="check" /><FormattedMessage id="shipping.label.table-shipping.confirm"/>
                  </a>
                <Divider type="vertical" />
                  <ModalDeleteComponent/>
                <Divider type="vertical" />
                <a onClick={this.props.clickModal}><Icon type="form" />
                  <FormattedMessage id="shipping.label.table-shipping.delete"/>
                </a>
              </span>
            ),
          }
        );
      }

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',
          name: record.name,
        }),
        };

        return(
          <div>
            <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={data} 
              scroll={{ x: 1300, y: 300 }} pagination={false}
            />
            <ModalProductTable
            visipleModal ={this.state.visibleModalProduct}
            ok = {this.handleOk}
            cancel = {this.handleCancel} 
          />
          </div>
        );
    }
}