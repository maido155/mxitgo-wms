import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Card, Table, Icon, Divider, Button, Spin} from 'antd';
import {isMobile} from 'react-device-detect';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import ModalNewUser from './ModalNewUser';
import { connect } from 'dva';

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    allUsers:user.allUsers,
}))

export default class UsersLayout extends PureComponent {
    state = { 
        visible: false,
        loading: false
    };
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };
    componentDidMount() {
        this.props.dispatch({
           type: 'user/fetchAllUsers',
           payload: {
               payload: {
                   Authorization: sessionStorage.getItem('idToken')
               }
           },
       });
    }
    render(){
        const { allUsers, loading } = this.props;
        const columns = [
            {
              title: 'Nombre',
              dataIndex: 'nameUser',
              key: 'nameUser',
              width: isMobile ? 130 : 140,
          
            },
            {
              title: 'Apellido paterno',
              dataIndex: 'familyName',
              key: 'familyName',
              width: isMobile ? 130 : 130,
            },
            {
              title: 'Apellido materno', 
              dataIndex: 'middleName',
              key: 'middleName',
              width: isMobile ? 130 : 130,
            },
            {
                title: 'Correo electrónico',
                dataIndex: 'mail', 
                key: 'mail',
                width: isMobile ? 300 : 270,
            }, 
            { 
                title: 'Teléfono',
                dataIndex: 'phone',
                key: 'phone',
                width: isMobile ? 150 : 130,
            },
            {
                title: 'Acciones',
                key: 'action',
                fixed: 'right',
                width: isMobile ? 70 : 150,
                render: () => (
                    <span>
                        <a>
                            {isMobile
                                ? <Icon type="edit"/>
                                : <span><Icon type="edit" /><FormattedMessage id="shipping.label.table-shipping.edit"/></span>
                            }
                        </a>
                        <Divider type="vertical"/>
                        <a>
                            {isMobile
                                ? <Icon type="delete" />
                                : <span><Icon type="delete" /><FormattedMessage id="shipping.label.table-shipping.delete"/></span>
                            }
                        </a>
                    </span>
                )
            }
        ];
        return(
            <PageHeaderWrapper>
                <Card>
                    <Spin tip={"Cargando..."} spinning={loading}>
                        <ModalNewUser visible={this.state.visible} cancel={this.handleCancel}/>
                        <div align="right">
                            <Button type="primary" shape="circle" onClick={this.showModal}>+</Button>
                        </div>
                        <Table style={{marginTop: "1rem"}} size="small" columns={columns} dataSource={allUsers} scroll={isMobile ? {x: 960, y: 400} : {x: 900 , y: 220}} pagination={false}/>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}