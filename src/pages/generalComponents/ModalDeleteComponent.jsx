import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal, Icon} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';

const { confirm } = Modal;

function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export default class ModalDeleteComponent extends PureComponent{
  render(){
    return(
      <a onClick={showDeleteConfirm} type="dashed">
        {isMobile ? <Icon type="delete" /> : <span><Icon type="delete" /><FormattedMessage id="shipping.label.table-shipping.delete"/></span>}
      </a>
    );
  }
}