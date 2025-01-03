import { Button, Flex, Typography } from 'antd';

import React from 'react';
import { history } from 'umi';

const FormList: React.FC = () => {
  return <div >
    <Flex 
      justify='space-between'
      style={{
        marginBottom:10
      }}>
      <Button type='primary' onClick={() => {
        history.push('/form/edit/123');
      }}>
      新建表单
      </Button>
    </Flex>
    <Typography.Title level={5}>我的表单</Typography.Title>

  </div>;
};

export default FormList;