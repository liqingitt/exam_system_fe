import { FormRender } from '@/components/FormRender'
import styles from './index.less'
import { DragComponentType } from '@/components/FormRender/const';
import { useDrop } from 'react-dnd';
import { ComponentConfig } from '@/components/FormRender/stores/componentConfigStore';
import { ComponentItem, useComponentListStore } from '@/components/FormRender/stores/componentListStore';
import { v4 as uuid } from 'uuid';
export const FormEditContentCenterBody:React.FC = () => {
  const componentListPush = useComponentListStore(state => state.componentListPush);
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
  return <div className={styles.formEditContentCenterBody} ref={drop} style={{backgroundColor:isOver ? '#f0f0f0' : '#fff'}}>
    <FormRender model='edit' />
  </div>
}