import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button,Divider,Modal,Icon,Form, Row,Col} from 'antd';
import TableModal from './tableModalEntry';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import GridModal from './gridModalEntry';
import {isMobile} from "react-device-detect";


import 'moment/locale/en-au';

class ModalEntry extends PureComponent {
  render() {
  if(isMobile){
    
    return (
     <span>
      
      <Modal
        width= '100%'
        title="Nueva Entrada"
        visible={this.props.visibleModal}
        onOk={this.props.successModal}
        onCancel={this.props.cancelModal}
        footer={[
          <Button key="back" type="danger" onClick={this.props.cancelModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={this.props.loadingModal} onClick={this.props.successModal}>
            Submit
          </Button>,
        ]}
         //imports Tabla and Tabs From respective js
       >
           <div>
         <TableModal/> 
         <Divider/>
         <Row type="flex" justify="center">
                <Col xs={24} sm={12} md={12} lg={12} xl={5}>
                   <Form.Item label="">
                       <RadioGroupComponent/>
                   </Form.Item>
               </Col>
             </Row>
         
         </div>
         <div>
         <GridModal  dataOne={16} dataTwo={4} dataThree={20} dataFour={4} whidthPhoto={45} paddingCols={"0.1rem"}/>
       </div>
       </Modal>
     </span>
   );
 }

 const formItemLayout = {
  labelCol: {xs: { span: 24 },sm: { span: 9 },md: { span: 9 },lg: { span: 9 },xl: { span: 9 }},
  wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
      };
   return (
    <span>
      <Modal
        width= '80%'
        title="Nueva Entrada"
        visible={this.props.visibleModal}
        onOk={this.props.successModal}
        onCancel={this.props.cancelModal}
        footer={[
          <Button key="back" type="danger" onClick={this.props.cancelModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={this.props.loadingModal} onClick={this.props.successModal}>
            Submit
          </Button>,
        ]}
        //imports Tabla and Tabs From respective js
      >
        <div>
        <TableModal/> 
        <Divider/>
        <Row type="flex" justify="center">
                <Col xs={24} sm={12} md={12} lg={12} xl={5}>
                   <Form.Item label="">
                       <RadioGroupComponent/>
                   </Form.Item>
               </Col>
             </Row>
        </div>
        <div>
          <GridModal  dataOne={8} dataTwo={2} dataThree={10} dataFour={4} whidthPhoto= {90} paddingCols={"0.5rem"}/>
        </div>

      </Modal>
    </span>
  );
}
}

export default ModalEntry;