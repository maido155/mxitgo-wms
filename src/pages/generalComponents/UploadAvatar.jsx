import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Upload, Button, Icon} from 'antd';
import AvatarAccount from './AvatarAccount';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Styles from './StylesGeneral.css';

export default class UploadAvatar extends PureComponent{
  render(){
    return(  
      <div>
        <Upload
          onChange={this.props.changeImagen}
          showUploadList={false}
        >
          <AvatarAccount dataImagen={this.props.stateImage}/>
          <Button className={Styles.avatar}>
            <Icon type="upload"/><FormattedMessage id="accountSettings.label.upload-image"/>
          </Button>
        </Upload>
      </div>  
    );
  }
}