import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Modal, Icon} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {isMobile} from 'react-device-detect';

const { confirm } = Modal;




export default class ModalDeleteComponent extends PureComponent{
  render(){

    var showDeleteConfirm = () =>{


      var okFunction = function(){

        var x = "";
        this.props.okAction(this.props.id);
      
      }.bind(this);


       confirm({
        title: 'Are you sure you want to cancel this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk : okFunction,
        onCancel() {
          console.log('Cancel');
        },
      });


    
      
    };

    var temp = () =>{

      this.props.okAction(this.props.id);

    };


    return(
      <a onClick={showDeleteConfirm} type="dashed">
        {isMobile ? <Icon type="delete" /> : <span><Icon type="delete" /><FormattedMessage id="shipping.label.table-shipping.delete"/></span>}
      </a>
    );
  }
}