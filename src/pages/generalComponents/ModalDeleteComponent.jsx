import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal} from 'antd';

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
              Eliminar
            </a>
        );
    }
}