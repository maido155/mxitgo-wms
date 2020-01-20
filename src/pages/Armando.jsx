import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Select, notification, message  } from 'antd';
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
    }  
  });
};

export default () => (
  <PageHeaderWrapper>
    <Card>
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
    </Card>
    
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
);
