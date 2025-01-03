import React from 'react';
import styles from './index.less';
import { IconFont } from '../IconFont';
import { Button, Space,theme } from 'antd';
import clsx from 'clsx';
export interface FormEditPageHeaderProps{
    className?:string
}
export const FormEditPageHeader:React.FC<FormEditPageHeaderProps> = (props) => {
  const {className} = props;
  const {token} = theme.useToken();
  return <div className={clsx(styles.formEditPageHeader,className)}>
    <div className={styles.formEditPageHeaderLeft}>
      <div className={styles.returnBtn}>
        <IconFont name='icon-arrow-left' />
      </div>
      <div className={styles.formTitle}> 
            未命名问卷
      </div>
      <div className={styles.lastSaveTime}>
        <IconFont name='icon-wancheng' />
            最后保存时间：2024-01-01 12:00:00
      </div>
    </div>
    <div className={styles.formEditPageHeaderMiddle}>
      <Space size={10} direction={'horizontal'} split={<IconFont name='icon-arrow-right' />}>
        <div className={styles.formEditPageHeaderMiddleItem} style={{color:token.colorPrimary}}>
          <IconFont name='icon-bianji' style={{fontSize:16}} />
       编辑
        </div>
        <div className={styles.formEditPageHeaderMiddleItem}>
          <IconFont name='icon-shezhi' style={{fontSize:14}} />
        设置
        </div>
      </Space>
    </div>
    <div className={styles.formEditPageHeaderRight}>
      <Button type='primary'> 发布 </Button>
    </div>
  </div>;
};

