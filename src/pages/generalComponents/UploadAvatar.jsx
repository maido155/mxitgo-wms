import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Upload, Button, Icon} from 'antd';
import AvatarAccount from './AvatarAccount';
import Styles from './StylesGeneral.css';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadAvatar extends PureComponent{
  state = {
  };

  handleChange = info => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl
        }),
      );
    }
  };

  render(){
    const { imageUrl } = this.state;
    return(  
      <div>
        <Upload
          onChange={this.handleChange}
          showUploadList={false}
        >
          <AvatarAccount dataImagen={imageUrl}/>
          <Button className={Styles.avatar}>
            <Icon type="upload"/>Cargar Imagen
          </Button>
        </Upload>
      </div>  
    );
  }
}