import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import { Table, Button  } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import AssignmentOutComming from './AssignmentOutComming';
import CompositionOutComming from './CompositionOutComming'

export default class TableOutComming extends PureComponent {
    render() {
      const { showAsignar, visibleAsignar, closeAsignar, visibleComposition, closeComposition, showComposition, closeAssignmentProduct, visibleAssignmentProduct, 
              showAssignmentProduct, visibleAsignarComposition, condition } = this.props;
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Address', dataIndex: 'address', key: 'address' },
            {
              title: 'Action',
              dataIndex: '',
              key: 'x',
            render: () => 
              <Button type="primary" onClick={()=>{showAsignar('tGeneral')}}> 
                <FormattedMessage id="outComming.button.assign"/>
              </Button>,
            },
            {
                title: 'Action2',
                dataIndex: '',
                key: 'y',
                render: () =>
                <Button type="danger" onClick={()=>{showComposition()}}> 
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
             <AssignmentOutComming
              visibleAsignar={visibleAsignar}
              closeAsignar={closeAsignar}

              closeAssignmentProduct={closeAssignmentProduct}
              showAssignmentProduct={showAssignmentProduct}
              visibleAssignmentProduct={visibleAssignmentProduct}

              condition={condition}
            />
            <CompositionOutComming
              visibleComposition={visibleComposition}
              closeComposition={closeComposition}

              showAsignar={showAsignar}
              visibleAsignarComposition={visibleAsignarComposition}
              closeAsignar={closeAsignar}

              closeAssignmentProduct={closeAssignmentProduct}
              showAssignmentProduct={showAssignmentProduct}
              visibleAssignmentProduct={visibleAssignmentProduct}

              condition={condition}
            />
            <Table columns={columns} dataSource={data} pagination={false} size="small"/>
          </div>
        )
    }
}