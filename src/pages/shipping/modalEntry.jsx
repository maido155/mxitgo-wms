import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button,Divider,Modal,Icon, Row} from 'antd';
import Tabla from './tableModalEntry';
import RadioGroupModal from './radioGroupModalEntry';
import GridModal from './gridModalEntr';
import {isMobile} from "react-device-detect";


import 'moment/locale/en-au';

class modalEntry extends PureComponent {
state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { loading } = this.state;
    if(isMobile){
     return (
      <span>
        <Button type="primary" size="small" onClick={this.showModal}>
        <Icon type="plus" />
            Nueva Entrada
        </Button>
        <Modal
          width= '100%'
          title="Nueva Entrada"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="danger" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
          //imports Tabla and Tabs From respective js
        >
            <div>
          <Tabla/> 
          <Divider/>
         
          <RadioGroupModal dataEight={1} dataNine={15}/>
          
          </div>
          <div>
          <GridModal  dataOne={16} dataTwo={3} dataThree={10} dataFour={4}/>
        </div>
        </Modal>
      </span>
    );
  }


return (
    <span>
      <Button type="primary" size="large" onClick={this.showModal}>
      <Icon type="plus" />
          Nueva Entrada
      </Button>
      <Modal
        width= '80%'
        title="Nueva Entrada"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" type="danger" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            Submit
          </Button>,
        ]}
        //imports Tabla and Tabs From respective js
      >
          <div>
        <Tabla/> 
        <Divider/>
        <RadioGroupModal dataEight={7} dataNine={13}/>
        </div>
        <div>
          <GridModal  dataOne={8} dataTwo={2} dataThree={10} dataFour={4}/>
        </div>
      </Modal>
    </span>
  );
}
}

export default modalEntry;