import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Card, Button} from 'antd';
import TableGeneralProgramming from './TableGeneralProgramming';
import ModalGeneralProgramming from './ModalGeneralProgramming';
import RightContent from '@/components/GlobalHeader/RightContent';




export default class generalProgramming extends PureComponent{

    render(){

        return(
         <PageHeaderWrapper>
             <Card>
            <div align="right">
            <ModalGeneralProgramming/>
            </div>
            <div>
            <TableGeneralProgramming/>
            </div>
             </Card>

         </PageHeaderWrapper>



        );
    }

}