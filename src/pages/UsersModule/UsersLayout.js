import { Card, Table } from 'antd';
import React, { PureComponent } from 'react';
import { _ } from 'lodash';  
import TableUsers from './TableUsers';
import ModalNewUser from './ModalNewUser';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default class UsersLayout extends PureComponent{

    render(){

        return(
            <PageHeaderWrapper>
             <Card>
             <div align="right">
            <ModalNewUser/>
            </div>
            <div>
                 <TableUsers/>
                 </div>
             </Card>
             </PageHeaderWrapper>


        );
    }

}