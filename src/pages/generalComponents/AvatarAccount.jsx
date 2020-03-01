import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Avatar } from 'antd';

export default class AvatarAccount extends PureComponent{
    render(){
        return(
            <div>
                <Avatar size={120} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
          </div>
        );
    }
}