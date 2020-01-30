import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Card, Button} from 'antd';
import TableGeneralProgramming from './tableGeneralProgramming';
import ModalGeneralProgramming from './modalGeneralProgramming';
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