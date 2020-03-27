import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Drawer,Button, Row, Col} from 'antd';
import TableModal from './tableModalEntry';
import GridModal from './gridModalEntry';

class drawerEntry extends PureComponent {
    render() {
      return (
        <div>
            <Drawer
                title="Nueva Entrada"
                width={"70%"}
                onClose={this.props.cancelModal}
                visible={this.props.visibleModal}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <TableModal/>
                <Row type="flex" justify="center" style={{marginTop: "2rem"}}>
                    <Col xs={24} sm={20} md={15} lg={15} xl={15}>
                        <GridModal/>
                    </Col>
                </Row>
                <div
                    style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    }}
                >
                    <Button onClick={this.props.cancelModal} style={{ marginRight: 8 }} type="danger">
                        Cancelar
                    </Button>
                    <Button onClick={this.props.cancelModal} type="primary">
                        Programar
                    </Button>
                </div>
            </Drawer>
        </div>
      );
    }
  }
  
  export default drawerEntry;