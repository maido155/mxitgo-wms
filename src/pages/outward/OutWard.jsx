import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {isMobileOnly, isTablet} from 'react-device-detect';
import CalendarOutWard from './CalendarOutWard';
import RadioGroupOutWard from './RadioGroupOutWard';
import TabsOutWard from './TabsOutWard';

import { Card } from 'antd';

export default class OutWard extends PureComponent {
    render() {
        if(isMobileOnly){
            return (
                <PageHeaderWrapper>
                        <Card>
                            <div style={{marginBottom:"5%"}}>
                                <CalendarOutWard dateOne={24} dateTwo={24}/>
                            </div>
                            <div style={{marginBottom:"5%"}}>
                                <RadioGroupOutWard dateThree={7} dateFour={13}/>   
                            </div>
                            <div>
                                <TabsOutWard/>
                            </div>
                        </Card>
                </PageHeaderWrapper>
            );
        }
        if(isTablet){
            return (
                <PageHeaderWrapper>
                        <Card>
                            <div style={{marginBottom:"3%"}}>
                                <CalendarOutWard dateOne={3} dateTwo={14}/>
                            </div>
                            <div style={{marginBottom:"3%"}}>
                                <RadioGroupOutWard dateThree={3} dateFour={7}/>
                            </div>
                            <div>
                                <TabsOutWard/>
                            </div>
                        </Card>
                </PageHeaderWrapper>
            );
        }
        return (
            <PageHeaderWrapper>
                    <Card>
                        <div style={{marginBottom:"2%"}}>
                            <CalendarOutWard dateOne={2} dateTwo={8}/>
                        </div>
                        <div style={{marginBottom:"2%"}}>
                            <RadioGroupOutWard dateThree={2} dateFour={4}/>  
                        </div>
                        <div>
                            <TabsOutWard/>
                        </div>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}