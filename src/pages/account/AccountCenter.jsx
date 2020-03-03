import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Avatar from '../generalComponents/AvatarAccount';
import { Card, Row, Col, Typography, Divider, Icon } from 'antd';
import { connect } from 'dva';
import Styles from './StylesAccount.css';

const { Title, Text } = Typography;

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    userByEmail:user.userByEmail
}))

export default class AccountCenter extends PureComponent{
    componentDidMount() {
        this.props.dispatch({
           type: 'user/fetchUserByEmail',
           payload: {
               payload: {
                   email:"lopezarmando1112@gmail.com"
               }
           },
       });
    }
    render(){
        const { loading, user: { user },userByEmail } = this.props;
        return(
            <PageHeaderWrapper>
                <Card>
                    <Row justify="center" className={Styles.avatar}> 
                        <Col xs={8} sm={10} md={10} lg={10} xl={10}></Col>
                        <Col xs={8} sm={3} md={3} lg={3} xl={3}><Avatar/></Col>
                        <Col xs={9} sm={10} md={10} lg={10} xl={10}></Col>
                    </Row>
                    <Row justify="center" className={Styles.name}> 
                        <Col xs={4} sm={6} md={6} lg={6} xl={8}></Col>
                        <Col xs={14} sm={13} md={13} lg={13} xl={7}>
                            <Title level={4}>
                                {userByEmail.name + " " + userByEmail.family_name + " " + userByEmail.middle_name}
                            </Title>
                        </Col>
                        <Col xs={4} sm={5} md={5} lg={5} xl={8}></Col>
                    </Row>
                    <Divider/>
                    <Row justify="center" className={Styles.mail}> 
                        <Col xs={2} sm={1} md={1} lg={1} xl={1}><Icon type="mail"/></Col>
                        <Col xs={22} sm={23} md={23} lg={23} xl={23}>
                            <Text>{userByEmail.email}</Text>
                        </Col>
                    </Row>
                    <Row justify="center"> 
                        <Col xs={2} sm={1} md={1} lg={1} xl={1}><Icon type="mobile"/></Col>
                        <Col xs={22} sm={23} md={23} lg={23} xl={23}>
                            <Text>{userByEmail.phone_number}</Text>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}