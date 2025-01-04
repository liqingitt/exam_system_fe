import React, { useMemo } from 'react';
import styles from './index.less'
import { ComponentConfig, useComponentConfigStore } from '@/components/FormRender/stores/componentConfigStore';
const TopicType:React.FC = () => {
  const componentConfigs = useComponentConfigStore(state => state.componentConfigs)
  const componentGroupConfigs = useMemo(() => {
    return Object.values(componentConfigs).reduce((cur,next) => {
      if(cur[next.group]){
        cur[next.group].push(next)
      }else{
        cur[next.group] = [next]
      }
      return cur
    },{} as Record<string,Array<ComponentConfig>>)
  },[componentConfigs])
  return <div className={styles.topicType}>
    {Object.keys(componentGroupConfigs).map(group => {
      return <div key={group} className={styles.topicTypeGroup}>
        <div className={styles.topicTypeGroupTitle}>{group}</div>
        <div className={styles.topicTypeGroupContent}>
          {componentGroupConfigs[group].map(component => {
            return <div className={styles.topicTypeGroupItem} key={component.name}>{component.name}</div>
          })}
        </div>
       
      </div>
    })}
  </div>;
};

export default TopicType;