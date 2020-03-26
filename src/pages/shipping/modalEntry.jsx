import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Button, Modal, Row, Col }from 'antd';
import TableModal from './tableModalEntry';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import GridModal from './gridModalEntry';

class ModalEntry extends PureComponent {
  render() {
    return (
      <Modal
        title="Nueva Entrada"
        centered
        width= "80%"
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
      >
        <TableModal/>
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={24} lg={19} xl={15}>
            <GridModal/>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ModalEntry;