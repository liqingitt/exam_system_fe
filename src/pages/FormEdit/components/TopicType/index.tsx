import React, { useMemo } from 'react';
import { ComponentConfig, useComponentConfigStore } from '../../stores/componentConfigStore';

const TopicType:React.FC = () => {
  const componentConfigs = useComponentConfigStore(state => state.componentConfigs)
  const componentGroupConfigs = useMemo(() => {
    return componentConfigs.reduce((cur,next) => {
      if(cur[next.group]){
        cur[next.group].push(next)
      }else{
        cur[next.group] = [next]
      }
      return cur
    },{} as Record<string,Array<ComponentConfig>>)
  },[componentConfigs])
  return <div>
    {Object.keys(componentGroupConfigs).map(group => {
      return <div key={group}>
        <div>{group}</div>
        {componentGroupConfigs[group].map(component => {
          return <div key={component.name}>{component.name}</div>
        })}
      </div>
    })}
  </div>;
};

export default TopicType;