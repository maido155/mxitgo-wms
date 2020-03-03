import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Avatar } from 'antd';

export default class AvatarAccount extends PureComponent{
    render(){
        return(
            <div>
                <Avatar size={200} src={this.props.dataImagen}/>
          </div>
        );
    }
}