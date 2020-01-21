import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Select, notification, message, Row, Col, Button  } from 'antd';
import styles from './Armando.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const {Option} = Select;
const key = 'updatable';
const {Meta} = Card;

const openMessage = (value) => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: `Welcome ${value}`, key, duration: 2 });
  }, 1000);
};

function openNotification(value) {
  notification.open({
    message: 'Notification:',
    description:
      `Are you ${value}?`,
    onClick: () => {
      openMessage(value);
      console.log("hello");
      const numbre = 12;
      console.log(numbre);
    }  
  });
};

export default () => (
  <PageHeaderWrapper>
    <Card>
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={openNotification}
        >
          <Option value="armando">Armando</Option>
          <Option value="hector">Hector</Option>
          <Option value="carlos">Carlos</Option>
          <Option value="miguel">Miguel</Option>
          <Option value="diego">Diego</Option>
        </Select>
      </div>

      <br/>

      <div>
        <Row>
          <Col span={12}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={<img alt="example" src="https://www.superama.com.mx/Content/images/products/img_large/0750106410132L1.jpg" />}
              >
              <Meta title="Corona" description="https://cervezacorona.es" /> 
            </Card>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={<img alt="example" src="https://www.superama.com.mx/Content/images/products/img_large/0750106419274L1.jpg" />}
              >
              <Meta title="Victoria" description="https://cervezavictoria.com.mx" /> 
            </Card>
          </Col>
        </Row> 
      </div> 

      <br/>
      
      <div>
        <Button type="primary">Primary</Button>  
      </div> 
    </Card>
  </PageHeaderWrapper>
);
