import { FormRender } from '@/components/FormRender'
import styles from './index.less'
import { DragComponentType } from '@/components/FormRender/const';
import { useDrop } from 'react-dnd';
import { ComponentConfig } from '@/components/FormRender/stores/componentConfigStore';
import { ComponentItem, useComponentListStore } from '@/components/FormRender/stores/componentListStore';
import { v4 as uuid } from 'uuid';
import { theme } from 'antd';
import { useMemo, useState } from 'react';
import { HoverMask } from '../HoverMask';
import { ClickMask } from '../ClickMask';
export const FormEditContentCenterBody:React.FC = () => {

  const {token} = theme.useToken();

  const {componentListPush,componentList} = useComponentListStore(state => ({
    componentListPush:state.componentListPush,
    componentList:state.componentList
  }));

  const componentListMap = useMemo(() => {
    return componentList.reduce((pre,cur) => {
      pre[cur.id] = cur;
      return pre;
    },{} as Record<string,ComponentItem>)
  },[componentList])
  
  const [hoverComponentId,setHoverComponentId] = useState<string | null>(null);

  const [clickComponentId,setClickComponentId] = useState<string | null>(null);

  const findEventComponentId = (path: EventTarget[]) => {
    for(let i = path.length - 1; i >= 0; i--){
      const element = path[i] as HTMLElement;
      if(element.dataset?.componentId){
        return element.dataset.componentId;
      }
    }
    return null;
  }

  const [{isOver},drop] = useDrop({
    accept: [DragComponentType.Component,DragComponentType.ComponentConfig],
    collect: (monitor) => ({
      isOver: !!monitor.isOver({shallow:true})
    }),
    drop: (item: any,monitor) => {
      if(monitor.didDrop()){
        return
      }
      const itemAcceptType = monitor.getItemType();
      if(itemAcceptType === DragComponentType.ComponentConfig){
        const componentConfig:ComponentConfig = item;
        componentListPush({
          id:uuid(),
          componentName:componentConfig.name,
        });
      }else{
        const component:ComponentItem = item;
        console.log(component);
      }
    }
  })
  return <div
    className={styles.formEditContentCenterBody} 
    ref={drop} 
    onMouseOver={(event) => {
      const path =  event.nativeEvent.composedPath();
      setHoverComponentId(findEventComponentId(path));
    }} 
    onMouseLeave={() => {
      setHoverComponentId(null);
    }}
    onClick={(event) => {
      const path =  event.nativeEvent.composedPath();
      setClickComponentId(findEventComponentId(path));
    }}
  >
    <FormRender model='edit' />
    <div style={{backgroundColor:isOver ? token.colorPrimary : '#fff',height:10,width:'100%'}} />
    {hoverComponentId ? <HoverMask
      containerClassName={styles.formEditContentCenterBody}
      componentId={hoverComponentId} componentListMap={componentListMap} /> 
      : null}
    {clickComponentId ? <ClickMask
      containerClassName={styles.formEditContentCenterBody}
      componentId={clickComponentId} componentListMap={componentListMap} /> 
      : null}
  </div>
}