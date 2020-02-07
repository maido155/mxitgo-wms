import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { _ } from 'lodash';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button,Divider,Modal,Icon, Row,Col} from 'antd';
import TableModal from './tableModalEntry';
import RadioGroupModal from '../generalComponents/RadioGroupComponent';
import GridModal from './gridModalEntry';
import {isMobile} from "react-device-detect";


import 'moment/locale/en-au';

class ModalEntry extends PureComponent {
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
               Cancelar
           </Button>,
           <Button key="submit" type="primary" loading={this.props.loadingModal} onClick={this.props.successModal}>
               Aceptar
           </Button>,
        ]}
         //imports Tabla and Tabs From respective js
       >
           <div>
         <TableModal/> 
         <Divider/>
         <Row type="flex" justify="center">
                   <Col span={dataEight} style={{textAlign: "center"}}>
                   </Col>
                   <Col span={dataNine} style={{textAlign: "center"}}>
                      <RadioGroupModal dataEight={1} dataNine={15}/>
                   </Col>
         </Row>
         
         </div>
         <div>
         <GridModal  dataOne={16} dataTwo={3} dataThree={10} dataFour={4}/>
       </div>
       </Modal>
     </span>
   );
 }

  render() {
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
                    <Col span={2} style={{textAlign: "center"}}>
                    </Col>
                    <Col span={22} style={{textAlign: "center"}}>
                   <RadioGroupModal/>
                   </Col>
        </Row>
        </div>
        <div>
          <GridModal  dataOne={8} dataTwo={2} dataThree={10} dataFour={4}/>
        </div>

      </Modal>
    </span>
  );
}
}

export default ModalEntry;