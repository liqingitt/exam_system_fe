import React from 'react';
import { ComponentConfig } from '@/components/FormRender/stores/componentConfigStore';
import styles from './index.less'
import { useDrag } from 'react-dnd';
import { DragComponentType } from '@/components/FormRender/const';
export interface ComponentConfigItemRenderProps {
  componentConfig: ComponentConfig
}
export const ComponentConfigItemRender:React.FC<ComponentConfigItemRenderProps> = (props) => {
  const {componentConfig} = props

  const [{isDragging},drag] = useDrag({
    type: DragComponentType.ComponentConfig,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item: componentConfig
  })

  return <div 
    style={{opacity:isDragging ? 0.5 : 1}} 
    className={styles.topicTypeGroupItem} 
    key={componentConfig.name} 
    ref={drag}>
    {componentConfig.name}
  </div>
}