import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import Avatar from '../generalComponents/AvatarAccount';
import Upload from '../generalComponents/UploadAvatar';
import Styles from './StylesAccount.css';

export default class AccountSettings extends PureComponent{
    render(){
        return(
            <PageHeaderWrapper>
                <Card>
                    <div>
                        <Row className={Styles.avatar}>
                            <Col>
                                <Avatar/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Upload/>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}