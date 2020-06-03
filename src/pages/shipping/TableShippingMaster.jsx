import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Table, Icon, Divider, Typography } from 'antd';
import ConfirmationShipping from './ConfirmationShipping';
import DrawerEntry from './drawerEntry';
import ModalDeleteComponent from '../generalComponents/ModalDeleteComponent';
import ModalProductTable from '../generalComponents/ModalProductTable';
import {isMobile} from 'react-device-detect';
import Styles from './StylesShipping.css';
import { _ } from 'lodash'; 

const { Text } = Typography;
class TableShippingMaster extends PureComponent {
  state={
      visibleConfirmationShipping: false,
      visibleModalProduct: false,
      visibleEntry: false,
      loadingModal: false
  }

  showConfirmationShipping = () =>{
    this.setState({
        visibleConfirmationShipping: true
    });
  };

  onCloseConfirmationShipping = () =>{
    this.setState({
        visibleConfirmationShipping: false
    });
  };

  showEntry = () => {
    this.setState({
      visibleEntry: true
    });
  };

  handleCancelEntry = () => {
    this.setState({ visibleEntry: false });
  };

  handleOk = () => {
    this.setState({ loadingModal: true });
    setTimeout(() => {
      this.setState({ loadingModal: false, visibleEntry: false });
    }, 3000);
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
        width: isMobile ? 120 : 140,
        render: text => <a>{text}</a>
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.shipping' }),
        dataIndex: 'envio',
        width: isMobile ? 70 : 90,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.arrival' }),
        dataIndex: 'llegada',
        width: isMobile ? 70 : 90,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.entry' }),
        dataIndex: 'entrada',
        width: isMobile ? 70 : 90,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.premium' }),
        dataIndex: 'premium',
        width: isMobile ? 130 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.gold' }),
        dataIndex: 'gold',
        width: isMobile ? 110 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.second' }),
        dataIndex: 'segunda',
        width: isMobile ? 130 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.hand' }),
        dataIndex: 'mano',
        width: isMobile ? 120 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.finger' }),
        dataIndex: 'dedo',
        width: isMobile ? 120 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.status' }),
        dataIndex: 'status',
        width: isMobile ? 90 : 100,
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.actions' }),
        key: 'action',
        fixed: 'right',
        width: isMobile ? 100 : 340,
        render: () => (
          <span>
              <a onClick={this.props.showShippingPrograming}>
                {isMobile 
                  ?  <Icon type="edit"/>
                  : <span><Icon type="edit" /><FormattedMessage id="shipping.label.table-shipping.edit"/></span>
                }
              </a>
            <Divider type="vertical"/>
              <a onClick={this.showConfirmationShipping}>
                {isMobile 
                  ? <Icon type="check"/>
                  : <span><Icon type="check" /><FormattedMessage id="shipping.label.table-shipping.confirm"/></span>
                }
              </a>
            <Divider type="vertical"/>
              <ModalDeleteComponent/>
            <Divider type="vertical"/>
            <a onClick={this.showEntry}>
              {isMobile 
                  ? <Icon type="form"/>
                  : <span><Icon type="form"/><FormattedMessage id="shipping.label.table-shipping.entry"/></span>
              }
            </a>
          </span>
        ),
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
        <ConfirmationShipping
          visibleConfirmationShipping={this.state.visibleConfirmationShipping}
          onCloseConfirmationShipping={this.onCloseConfirmationShipping}
        />
        <ModalProductTable
          visipleModal ={this.state.visibleModalProduct}
          ok = {this.handleOk}
          cancel = {this.handleCancel} 
        />
        <DrawerEntry
          visibleEntry={this.state.visibleEntry}
          successModal={this.handleOk}
          handleCancelEntry={this.handleCancelEntry}
          loadingModal={this.state.loadingModal}
        />
        <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={data} scroll={ isMobile ? {x: 1300} : { x: 1350}} pagination={false}/>
      </div>
    );
  }
}

export default TableShippingMaster;