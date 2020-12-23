import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Card, Table, Icon, Divider, Button, Spin, Modal, Tabs,Form } from 'antd';
import { isMobile } from 'react-device-detect';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import ModalNewUser from './ModalNewUser';
import { connect } from 'dva';
const { TabPane } = Tabs;
const { Meta } = Card;
const { confirm } = Modal;
@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
    allUsers: user.allUsers,
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
    deleteModal = (mail, name, familyName) => {
        confirm({
            title: formatMessage({ id: 'usersModule.modal_deleted.message' }) + ' ' + name +' ' + familyName + ' ?',
            okText: formatMessage({ id: 'usersModule.modal_deleted.yes' }),
            okType: 'danger',
            cancelText: formatMessage({ id: 'usersModule.modal_deleted.no' }),
            onOk: () => {
                this.props.dispatch({
                    type: 'user/deleteNewUser',
                    payload: {
                        payload: {
                            GET: {
                                Authorization: sessionStorage.getItem('idToken')
                            },
                            DELETE: {
                                userName: mail,
                                Authorization: sessionStorage.getItem('idToken')
                            }
                        },
                    },
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    callback(key) {
        console.log(key);
    }
    render() {
        const { allUsers, loading, saveUser, closeUser, dataUser, updateUser } = this.props;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 7 }, md: { span: 9 }, lg: { span: 9 }, xl: { span: 5 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 14 }, md: { span: 15 }, lg: { span: 15 }, xl: { span: 15 } }
        };

        console.log("allUsers")
        console.log(allUsers)
        const columns = [
            {
                title: formatMessage({ id: 'usersModule.table.name' }),
                dataIndex: 'nameUser',
                key: 'nameUser',
                width: isMobile ? 130 : 140,

            },
            {
                title: formatMessage({ id: 'usersModule.table.family_name' }),
                dataIndex: 'familyName',
                key: 'familyName',
                width: isMobile ? 130 : 130,
            },
            {
                title: formatMessage({ id: 'usersModule.table.middle_name' }),
                dataIndex: 'middleName',
                key: 'middleName',
                width: isMobile ? 130 : 130,
            },
            {
                title: formatMessage({ id: 'usersModule.table.email' }),
                dataIndex: 'mail',
                key: 'mail',
                width: isMobile ? 250 : 200,
            },
            {
                title: formatMessage({ id: 'usersModule.table.phone' }),
                dataIndex: 'phone',
                key: 'phone',
                width: isMobile ? 150 : 130,
            },
            {
                title: formatMessage({ id: 'usersModule.table.accions' }),
                key: 'action',
                fixed: 'right',
                width: isMobile ? 70 : 170,
                render: (record) => (
                    <span>
                        <a onClick={() => this.editModal(record.mail)}>
                            {isMobile
                                ? <Icon type="edit" />
                                : <span><Icon type="edit" /> <FormattedMessage id="shipping.label.table-shipping.edit" /></span>
                            }
                        </a>
                        <Divider type="vertical" />
                        <a onClick={() => this.deleteModal(record.mail, record.nameUser, record.familyName)}>
                            {isMobile
                                ? <Icon type="delete" />
                                : <span><Icon type="delete" /> <FormattedMessage id="shipping.label.table-shipping.delete" /></span>
                            }
                        </a>
                    </span>
                )
            }
        ];
        return (
            <div>
            <PageHeaderWrapper
                extra={
                        <div> 
                            <Form style={{paddingRight:"1rem"}} layout="inline" >
                                <Form.Item style={{padding:"0rem 1rem 0rem 7rem"}} {...formItemLayout}>
                                    <Button type="primary" shape="circle" size="large" onClick={this.showNewDrawer}>
                                        <Icon type="plus"/>
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>}>
                    <Card>
                            <Spin tip={formatMessage({ id: "usersModule.loading" })} spinning={loading}>
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
                                <Table style={{ marginTop: "2%" }} size="small" columns={columns} dataSource={allUsers} scroll={isMobile ? { x: 720 } : { x: 950 }} />
                            </Spin>
                    </Card>
                </PageHeaderWrapper>
                </div>
            
        );
    }
}