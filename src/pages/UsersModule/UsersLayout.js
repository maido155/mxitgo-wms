import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Card, Table, Icon, Divider, Button, Spin} from 'antd';
import {isMobile} from 'react-device-detect';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import ModalNewUser from './ModalNewUser';
import DeleteModal from '../generalComponents/ModalDeleteComponent';
import { connect } from 'dva';

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    allUsers:user.allUsers,
    saveUser: user.saveUser,
    closeUser: user.closeUser,
    dataUser: user.dataUser,
    updateUser: user.updateUser
}))

export default class UsersLayout extends PureComponent {
    state = { 
        visible: false,
        edit: false
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false
        });
        this.res();
    };
    res = () => {
        this.props.dispatch({
            type: 'user/cleanUser',
            payload: {},
        });
        setTimeout(() => {
            this.setState({
                edit: false,
            }); 
        }, 1000);
    }
    componentDidMount() {
        this.props.dispatch({
           type: 'user/fetchAllUsers',
           payload: {
               payload: {
                   GET:{
                    Authorization: sessionStorage.getItem('idToken')
                   }
               }
           },
       });
    }
    saveNewUser = values => {
        this.props.dispatch({
            type: 'user/saveNewUser',
            payload: {
                payload: {
                    GET: {
                        Authorization: sessionStorage.getItem('idToken')
                    },
                    POST: {
                        name: values.name,
                        family_name: values.family_name,
                        middle_name: values.middle_name,
                        phone_number: values.phone_number,
                        email: values.email,
                        Authorization: sessionStorage.getItem('idToken')
                    }
                },
            },
        });
    }
    updateNewUser = values => {
        this.props.dispatch({
            type: 'user/updateNewUser',
            payload: {
                payload: {
                    GET: {
                        email: localStorage.getItem('email'),
                        Authorization: sessionStorage.getItem('idToken')
                    },
                    PUT: {
                        name: "name",
                        valueName: values.name,
                        family: "family_name",
                        valueFamiy: values.family_name,
                        middle: "middle_name",
                        valueMiddle: values.middle_name,
                        phone: "phone_number",
                        valuePhone: values.phone_number,
                        username: values.email,
                        Authorization: sessionStorage.getItem('idToken')
                    }
                },
            },
        });
    }
    editModal = (mail) => {
        this.props.dispatch({
            type: 'user/fetchUser',
            payload: {
                payload: {
                    email: mail,
                    Authorization: sessionStorage.getItem('idToken')
                }
            },
        });
        this.showModal();
        this.setState({
            edit: true,
        });
    }
    changedSuccess = () => {
        this.props.dispatch({
            type: 'user/changedSuccessUser',
            payload: {},
        });
    }
    changedClosed = () => {
        this.props.dispatch({
            type: 'user/changedClosedUser',
            payload: {},
        });
    }
    render(){
        const { allUsers, loading, saveUser, closeUser, dataUser, updateUser } = this.props;
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
                render: (record) => (
                    <span>
                        <a onClick={() => this.editModal(record.mail)}>
                            {isMobile
                                ? <Icon type="edit"/>
                                : <span><Icon type="edit"/><FormattedMessage id="shipping.label.table-shipping.edit"/></span>
                            }
                        </a>
                        <Divider type="vertical"/>
                        <a>
                            <DeleteModal/>
                        </a>
                    </span>
                )
            }
        ];
        return(
            <PageHeaderWrapper>
                <Card>
                    <Spin tip={"Cargando..."} spinning={loading}>
                        <ModalNewUser 
                            visible={this.state.visible} 
                            cancel={this.handleCancel} 
                            loading={loading}
                            saveNewUser={this.saveNewUser}
                            saveUser={saveUser}
                            closeUser={closeUser}
                            changedSuccess={this.changedSuccess}
                            changedClosed={this.changedClosed}
                            edit={this.state.edit} 
                            dataUser={dataUser} 
                            updateNewUser={this.updateNewUser}
                            updateUser={updateUser}
                        />
                        <div align="right">
                            <Button type="primary" shape="circle" onClick={this.showModal}>+</Button>
                        </div>
                        <Table style={{marginTop: "1rem"}} size="small" columns={columns} dataSource={allUsers} scroll={isMobile ? {x: 960, y: 400} : {x: 900 , y: 185}} pagination={false}/>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}