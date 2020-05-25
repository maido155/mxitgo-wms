import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Card, Table, Icon, Divider, Button} from 'antd';
import {isMobile} from 'react-device-detect';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import ModalNewUser from './ModalNewUser';

export default class UsersLayout extends PureComponent {
    state = { 
        visible: false 
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
    render(){
        const columns = [
            {
              title: 'Nombre',
              dataIndex: 'name',
              key: 'name',
              width: isMobile ? 120 : 150,
          
            },
            {
              title: 'Apellido paterno',
              dataIndex: 'firstLast',
              key: 'firstLast',
              width: isMobile ? 120 : 150,
            },
            {
              title: 'Apellido materno', 
              dataIndex: 'secondLast',
              key: 'secondLast',
              width: isMobile ? 120 : 150,
            },
            {
                title: 'Correo electrónico',
                dataIndex: 'mail', 
                key: 'mail',
                width: isMobile ? 170 : 170,
            }, 
            { 
                title: 'Teléfono',
                dataIndex: 'phone',
                key: 'phone',
                width: isMobile ? 120 : 150,
            },
            {
                title: 'Acciones',
                key: 'action',
                fixed: 'right',
                width: isMobile ? 60 : 150,
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
        const data = [
            {
              name: 'Héctor Ulises',
              firstLast: 'Robledo',
              secondLast: "Oropeza",
              mail: 'hectoorn.n@gmail.com',
              phone:  "4494681489",
            }
        ];
        return(
            <PageHeaderWrapper>
                <Card>
                    <ModalNewUser visible={this.state.visible} cancel={this.handleCancel}/>
                    <div align="right">
                        <Button type="primary" shape="circle" onClick={this.showModal}>+</Button>
                    </div>
                    <Table style={{marginTop: "1rem"}} size="small" columns={columns} dataSource={data} scroll={isMobile ? {x: 710} : {x: 900}} pagination={false}/>
                </Card>
            </PageHeaderWrapper>
        );
    }
}