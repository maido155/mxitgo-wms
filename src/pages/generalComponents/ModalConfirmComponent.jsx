import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal} from 'antd';

const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export default class ModalConfirmComponent extends PureComponent{
    render(){
        return(
            <a onClick={showConfirm} type="dashed">
              Confirmar
            </a>
        );
    }
}