import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import {Button,Divider,Modal,Icon,Form, Row,Col, Radio }from 'antd';
import TableModal from './tableModalEntry';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { formatMessage } from 'umi-plugin-react/locale';
import GridModal from './gridModalEntry';

class ModalEntry extends PureComponent {
  render() {
    return (
      <Modal
        width= '80%'
        title="Nueva Entrada"
        centered
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
        <Form style={{marginTop: "1rem"}}>
          <Row type="flex" justify="center">
            <Col xs={20} sm={10} md={7} lg={6} xl={4}>
              <Form.Item>
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">Recibidos</Radio.Button>
                  <Radio.Button value="b">Merma</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <GridModal/>
      </Modal>
    );
  }
}

export default ModalEntry;