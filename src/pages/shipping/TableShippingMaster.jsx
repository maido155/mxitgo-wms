import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Table, Icon, Divider, Typography, Button } from 'antd';

import DrawerEntry from './drawerEntry';
import ModalDeleteComponent from '../generalComponents/ModalDeleteComponent';

import { isMobile } from 'react-device-detect';
import moment from 'moment';
import Styles from './StylesShipping.css';
import { _ } from 'lodash';

const { Text } = Typography;
class TableShippingMaster extends PureComponent {
  state = {
    
    visibleModalProduct: false,
    visibleEntry: false,
    loadingModal: false
  }

  /*showConfirmationShipping = () => {
    this.setState({
      visibleConfirmationShipping: true
    });
  };*/

  onCloseConfirmationShipping = () => {
    this.setState({
      visibleConfirmationShipping: false
    });
  };

  showEntry = (data, date) => {
    console.log(data, date);
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

  editProgramming = () => {

    this.props.showShippingProgramingEdit();



  };

  confirmProgramming = () => {

    this.props.showShippingProgramingConfirm();



  };
  modalProducts = () => {

    this.props.showShippingProgramingConfirm();



  };

  formatDate = (mydate) =>{
    return moment(mydate).format('dddd');
  };

  dates = (planned, confirmed)=>{
    if(confirmed<planned){
      return "danger"
    }else if(confirmed>planned){
      return "warning"
    }
  }



  render() {
    const { datesTableShipping, operatorAll, deleteShipping } = this.props;
    let columns = [
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.id' }),
        dataIndex: 'WMS-1-PK',
        key: 'WMS-1-PK',
        width: isMobile ? 120 : 140,
        render: text => <a>{text}</a>
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
        dataIndex: 'amount',
        width: isMobile ? 130 : 100,
        render: (text, record) => (
        <Text type={this.dates(record.products[0].planned,record.products[0].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[0].product)}} className={Styles.producto}>{record.products[0].planned}/{record.products[0].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.gold' }),
        dataIndex: 'amount',
        width: isMobile ? 110 : 100,
        render: (text, record) => (
                <Text type={this.dates(record.products[1].planned,record.products[1].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[1].product)}} className={Styles.producto}>{record.products[1].planned}/{record.products[1].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.second' }),
        dataIndex: 'amount',
        width: isMobile ? 130 : 100,
        render: (text, record) => (
                <Text type={this.dates(record.products[2].planned,record.products[2].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[2].product)}} className={Styles.producto}>{record.products[2].planned}/{record.products[2].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.hand' }),
        dataIndex: 'amount',
        width: isMobile ? 120 : 100,
        render: (text, record) => (
                <Text type={this.dates(record.products[3].planned,record.products[3].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[3].product)}} className={Styles.producto}>{record.products[3].planned}/{record.products[3].confirmed}</Text>
        )
      },
      {
        title: formatMessage({ id: 'shipping.label.table-shipping.finger' }),
        dataIndex: 'amount',
        width: isMobile ? 120 : 100,
        render: (text, record) => (
          <Text type={this.dates(record.products[4].planned,record.products[4].confirmed)} onClick={() => { this.props.showModalProduct(record,record.products[4].product)}} className={Styles.producto}>{record.products[4].planned}/{record.products[4].confirmed}</Text>
        )
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
        width: isMobile ? 100 : 430,
        render: (record) => (
          <a>
            { record.status == "NEW"
              ? 
                <a>
                  <Button type="link" onClick={() => { this.props.showShippingProgramingEdit(record) }}>
                    {isMobile
                      ? <Icon type="edit" />
                      : <a><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></a>
                    }
                  </Button>
                  <Divider type="vertical"/>
                  <Button type="link" onClick={() =>{this.props.showConfirmationShipping(record)}}>
                    {isMobile
                      ? <Icon type="check" />
                      : <a><Icon type="check" /> <FormattedMessage id="shipping.label.table-shipping.confirm"/></a>
                    }
                  </Button>
                  <Divider type="vertical"/>
                    <a onClick={()=>{deleteShipping(record)}}>
                        {isMobile
                            ? <Icon type="delete"/>
                            : <span><Icon type="delete"/><FormattedMessage id="general.table.delete"/></span>

                        }
                    </a >
                  <Divider type="vertical"/>
                  <Button type="link" onClick={() => {this.showEntry(record["WMS-1-PK"], record.status)}} disabled={true}>
                    {isMobile
                      ? <Icon type="form" />
                      : <a><Icon type="form" /> <FormattedMessage id="shipping.label.table-shipping.entry" /></a>
                    }
                  </Button>
                </a>
              : record.status == "CONFIRMED"
                ?
                  <a>
                    <Button type="link" onClick={() => { this.props.showShippingProgramingEdit(record) }} disabled={true}>
                      {isMobile
                        ? <Icon type="edit" />
                        : <a><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></a>
                      }
                    </Button>
                    <Divider type="vertical"/>
                    <Button type="link" onClick={this.showConfirmationShipping} >
                      {isMobile
                        ? <Icon type="check" />
                        : <a><Icon type="check" /> <FormattedMessage id="shipping.label.table-shipping.confirm"/></a>
                      }
                    </Button>
                    <Divider type="vertical"/>
                    <a onClick={()=>{deleteShipping(record)}}>
                        {isMobile
                            ? <Icon type="delete"/>
                            : <span><Icon type="delete"/><FormattedMessage id="general.table.delete"/></span>

                        }
                    </a >
                    <Divider type="vertical"/>
                    <Button type="link" onClick={() => {this.showEntry(record["WMS-1-PK"], record.status)}}>
                      {isMobile
                        ? <Icon type="form" />
                        : <a><Icon type="form" /> <FormattedMessage id="shipping.label.table-shipping.entry" /></a>
                      }
                    </Button>
                  </a>
                : 
                <a>
                  <Button type="link" onClick={() => { this.props.showShippingProgramingEdit(record) }} disabled={true}>
                    {isMobile
                      ? <Icon type="edit" />
                      : <a><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></a>
                    }
                  </Button>
                  <Divider type="vertical"/>
                  <Button type="link" onClick={this.showConfirmationShipping} disabled={true}>
                    {isMobile
                      ? <Icon type="check" />
                      : <a><Icon type="check" /> <FormattedMessage id="shipping.label.table-shipping.confirm"/></a>
                    }
                  </Button>
                  <Divider type="vertical"/>
                  <a onClick={()=>{deleteShipping(record)}}>
                        {isMobile
                            ? <Icon type="delete"/>
                            : <span><Icon type="delete"/><FormattedMessage id="general.table.delete"/></span>

                        }
                    </a >
                  <Divider type="vertical"/>
                  <Button type="link" onClick={() => {this.showEntry(record["WMS-1-PK"], record.status)}}>
                    {isMobile
                      ? <Icon type="form" />
                      : <a><Icon type="form" /> <FormattedMessage id="shipping.label.table-shipping.entry" /></a>
                    }
                  </Button>
                </a>  
            }
          </a>
        ),
      }
    ];

    /*const data = [
      {
        key: '1',
        id: 'TAB20620201722',
        envio: 'Lunes',
        llegada: 'Martes',
        entrada: 'Miercoles',
        premium: <Text type="danger" onClick={this.showModal} className={Styles.producto}>1200/1150</Text>,
        gold: '39/39',
        segunda: '0/39',
        mano: '0/39',
        dedo: '0/39',
        status: 'Pendiente',

        // innerData:
        // {
        //   uikey: "0-1", // where is this one?
        //   center: "Chiapas-La Escondida", // where is this one?
        //   TypeCondition: "New", // where is this one?
        //   isMasterModified: true, // where is this one?
        //   comment: "Comentarios, really?", // Needs processing
        //   createdBy: "undefined", // where is this one?
        //   date: "16-6-2020",  // OK
        //   departureDate: "2020-06-17", // OK
        //   deliveryDate: "2020-06-18", // OK
        //   entryDate: "2020-06-15", // OK
        //   destination: "Central de abastos",
        //   products: [ /// Needs processing
        //   [{ "product": "premium", "amount": 200 },
        //   { "product": "gold", "amount": 100 },
        //   { "product": "second", "amount": 500 },
        //   { "product": "hand", "amount": 99 },
        //   { "product": "finger", "amount": 500 }]],
        //   skWh: ["WH-1"],  /// Needs processing
        //   dateNew: "13-6-2020", // where is this one?
        //   createdByNew: "undefined", // where is this one?
        //   idShipping: "CHI13620201729", // OK
        // }

      },


      {
        key: '2',
        id: 'TE0101023912232',
        envio: 'Martes',
        llegada: 'Miercoles',
        entrada: 'Jueves',
        premium: '300/-',
        gold: '220/-',
        segunda: '220/-',
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
        premium: '24/-',
        gold: '43/-',
        segunda: '43/-',
        mano: '43/-',
        dedo: '43/-',
        status: 'Proceso'
      }
    ];*/

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
      
      <div>
       
       
        <DrawerEntry
          visibleEntry={this.state.visibleEntry}
          successModal={this.handleOk}
          handleCancelEntry={this.handleCancelEntry}
          loadingModal={this.state.loadingModal}
        />
        <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={datesTableShipping} scroll={isMobile ? { x: 1300 } : { x: 1350 }} pagination={false} />
      </div>
    );
  }
}

export default TableShippingMaster;