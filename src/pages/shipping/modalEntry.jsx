import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import {Button,Divider,Modal,Icon,Form, Row,Col} from 'antd';
import TableModal from './tableModalEntry';
import RadioGroupComponent from '../generalComponents/RadioGroupComponent';
import { formatMessage } from 'umi-plugin-react/locale';
import GridModal from './gridModalEntry';

class ModalEntry extends PureComponent {
  render() {
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 9 },md: { span: 9 },lg: { span: 9 },xl: { span: 9 }},
      wrapperCol: {xs: { span: 24 },sm: { span: 15 },md: { span: 15 },lg: { span: 15 },xl: { span: 15  }}
    };
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
        <Form {...formItemLayout} style={{marginTop: "1rem"}}>
          <Row type="flex" justify="center">
            <Col xs={24} sm={16} md={16} lg={16} xl={16}>
              <Form.Item label={formatMessage({ id: 'outWard.label.product' })}>
                <RadioGroupComponent/>
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