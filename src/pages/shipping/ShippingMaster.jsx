import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CalendarShippingMaster from './CalendarShippingMaster';
import RadioGroupShippingMaster from './RadioGroupShippingMaster';
import TableShippingMaster from './TableShippingMaster';
import {isMobileOnly, isTablet} from 'react-device-detect'; 
import { Card, Divider } from 'antd';

export default class ShippingMaster extends PureComponent {
    render() { 
        if(isMobileOnly){
            return(
                <PageHeaderWrapper>
                    <Card>
                        <div>
                            <CalendarShippingMaster 
                                dataOne={24} dataTwo={24} dataThree={24} dataFour={"center"} dataFive={"center"} 
                                dataSix={"center"} dataSeven={"0.5rem"}
                            />
                        </div>
                        <br/>
                        <div>
                            <RadioGroupShippingMaster dataEight={7} dataNine={13}/>
                        </div>
                        <Divider/>
                        <div>
                            <TableShippingMaster/>
                        </div>
                    </Card>
                </PageHeaderWrapper>
            ); 
        }
        if(isTablet){
            return(
                <PageHeaderWrapper>
                    <Card>
                        <div>
                            <CalendarShippingMaster 
                                dataOne={5} dataTwo={14} dataThree={5} dataFour={"right"} dataFive={"center"} 
                                dataSix={"right"} dataSeven={""}
                            />
                        </div>
                        <br/>
                        <div>
                            <RadioGroupShippingMaster dataEight={3} dataNine={7}/>
                        </div>
                        <Divider/>
                        <div>
                            <TableShippingMaster/>
                        </div>
                    </Card>
                </PageHeaderWrapper>
            ); 
        }
        return(
            <PageHeaderWrapper>
                <Card>
                    <div>
                        <CalendarShippingMaster 
                            dataOne={7} dataTwo={9} dataThree={7} dataFour={"right"} dataFive={"center"} 
                            dataSix={"right"} dataSeven={""}
                        />
                    </div>
                    <br/>
                    <div>
                        <RadioGroupShippingMaster dataEight={2} dataNine={4}/>
                    </div>
                    <Divider/>
                    <div>
                        <TableShippingMaster/>
                    </div>
                </Card>
            </PageHeaderWrapper>
        ); 
    }
}