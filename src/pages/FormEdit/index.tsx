import { EditArea } from '@/components/EditArea';
import { FormEditPageHeader } from '@/components/FormEditPageHeader';
import React, { useState } from 'react';
import styles from './index.less';
import { IconFont } from '@/components/IconFont';
import { theme } from 'antd';
import { ComponentConfigProvider } from './stores/componentConfigStore';
import { initComponentConfigs } from './const';
import TopicType from './components/TopicType';
const FormEdit:React.FC = () => {
  const [activeSideBar,setActiveSideBar] = useState<string>('type');

  const {token} = theme.useToken();

  
  return <div className={styles.formEdit}>
    <FormEditPageHeader className={styles.formEditPageHeader} />
    <div className={styles.formEditContent}>
      <div className={styles.sideBar}>
        <div className={styles.sideBarItem} 
          style={{color:activeSideBar === 'type' ? token.colorPrimary : ''}}
          onClick={() => {
            setActiveSideBar('type');
          }}>
          <IconFont name='icon-tixing' className={styles.sideBarItemIcon} />
            题型
        </div>
        <div className={styles.sideBarItem} 
          style={{color:activeSideBar === 'synopsis' ? token.colorPrimary : ''}}
          onClick={() => {
            setActiveSideBar('synopsis');
          }}>
          <IconFont  name='icon-dagang' className={styles.sideBarItemIcon} />
            大纲
        </div>
      </div>
      <div className={styles.formEditContentLeft}>
        <TopicType />
      </div>
      <div className={styles.formEditContentCenter}>
        <EditArea />
      </div>
      <div className={styles.formEditContentRight}>
        34
      </div>
    </div>
  </div>;
};


/**
 * 连接且只在渲染组件时初始化store
 * @param Component 
 * @returns 
 */
const formEditWithStore = <T extends object>(Component: React.FC<T>) => {
  return (props: T) => {
    return <ComponentConfigProvider componentConfigState={{componentConfigs:initComponentConfigs}}>
      <Component {...props} />
    </ComponentConfigProvider>
  }
}

export default formEditWithStore(FormEdit);
