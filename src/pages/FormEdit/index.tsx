import { FormEditPageHeader } from '@/components/FormEditPageHeader';
import React, { useState } from 'react';
import styles from './index.less';
import { IconFont } from '@/components/IconFont';
import { theme } from 'antd';

import TopicType from './components/TopicType';
import { storeHoc } from '@/components/FormRender/stores';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormEditContentCenterBody } from './components/FormEditContentCenterBody';
const FormEdit:React.FC = () => {
  const [activeSideBar,setActiveSideBar] = useState<string>('type');

  const {token} = theme.useToken();

  
  return <DndProvider backend={HTML5Backend}>
    <div className={styles.formEdit}>
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
          <FormEditContentCenterBody />
        </div>
        <div className={styles.formEditContentRight}>
        组件属性
        </div>
      </div>
    </div>
  </DndProvider> 
};



export default storeHoc(FormEdit);
