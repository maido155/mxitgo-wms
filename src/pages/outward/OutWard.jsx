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
                            <div>
                                <CalendarOutWard dateOne={24} dateTwo={24}/>
                            </div>
                            <br/>
                            <div>
                                <RadioGroupOutWard dateThree={7} dateFour={13}/>   
                            </div>
                            <br/>
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
                            <div>
                                <CalendarOutWard dateOne={3} dateTwo={14}/>
                            </div>
                            <br/>
                            <div>
                                <RadioGroupOutWard dateThree={3} dateFour={7}/>
                            </div>
                            <br/>
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
                        <div>
                            <CalendarOutWard dateOne={2} dateTwo={8}/>
                        </div>
                        <br/>
                        <div>
                            <RadioGroupOutWard dateThree={2} dateFour={4}/>  
                        </div>
                        <br/>
                        <div>
                            <TabsOutWard/>
                        </div>
                    </Card>
            </PageHeaderWrapper>
        );            
    }
}