import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Col,Row,Card, Typography,Input, Alert,Table,Tabs,Button, Icon, Modal } from 'antd';
import { connect } from 'dva';
import Modales from './modalEntry';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);




export default () => (
  <PageHeaderWrapper>
    
 
   
  </PageHeaderWrapper>
);
