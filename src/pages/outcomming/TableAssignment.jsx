import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Button  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import  DrawerAssignmentProduct from './DrawerAssignmentProduct';

export default class TableAssignment extends PureComponent {
    render() {
        const {showAssignmentProduct, closeAssignmentProduct, visibleAssignmentProduct}=this.props;
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Address', dataIndex: 'address', key: 'address' },
            {
              title: 'Action',
              dataIndex: '',
              key: 'x',
            render: () => 
              <Button type="primary" onClick={()=>{showAssignmentProduct()}}> 
                <FormattedMessage id="outComming.button.assign"/>
              </Button>,
            },
        ];
        const data = [
            {
              key: 1,
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            },
        ];
        return(
          <div>
              <DrawerAssignmentProduct
                closeAssignmentProduct={closeAssignmentProduct}
                visibleAssignmentProduct={visibleAssignmentProduct}
              />
                <Table columns={columns} dataSource={data} pagination={false} size="small"/>
          </div>
        )
    }
}