import { Input, theme } from 'antd';
import React, { useCallback } from 'react';
import { ComponentItem, useComponentListStore } from '../../stores/componentListStore';
import { ComponentConfig, useComponentConfigStore } from '../../stores/componentConfigStore';
import { DragComponentType } from '../../const';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { TopicGap } from '../TopicGap';
import { v4 as uuid } from 'uuid';
export interface TopicProps {
    componentItem:ComponentItem
     model:'edit' | 'enter'
}
export const Topic:React.FC<TopicProps> = (props) => {
  const {componentItem,model} = props;

  const {token} = theme.useToken();

  const componentConfigs = useComponentConfigStore(state => state.componentConfigs);

  
  const {componentListInsert} = useComponentListStore(state => ({componentListInsert:state.componentListInsert}));

  const onDrop = useCallback( (item: any,monitor:DropTargetMonitor<unknown, unknown>) => {
    const itemAcceptType = monitor.getItemType();
    if(itemAcceptType === DragComponentType.ComponentConfig){
      const componentConfig:ComponentConfig = item;
      componentListInsert({
        beforeId:componentItem.id,
        componentItem:{
          id:uuid(),
          componentName:componentConfig.name,
        }
      })
    }else if(itemAcceptType === DragComponentType.Component){
      const component:ComponentItem = item;
      console.log(componentItem.id,component.id);
      
      if(componentItem.id !== component.id){
        console.log('拖拽');
            
      }else{
        console.log('拖拽自身');
            
      }
        
    }
  },[componentItem.id,componentListInsert])


  const onIsOver = useCallback((monitor:DropTargetMonitor<unknown, unknown>) => {
    const itemAcceptType = monitor.getItemType();
    if(itemAcceptType === DragComponentType.Component){
      const item:ComponentItem = monitor.getItem();
      return item.id !== componentItem.id;
    }
    return monitor.isOver();
  },[componentItem.id])

  const [{isDragging},drag,dragPreview] = useDrag({
    type:DragComponentType.Component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item:() => componentItem,
    previewOptions:{
      captureDraggingState:true
    }
  })

  const [{isOver},drop] = useDrop({
    accept: [DragComponentType.ComponentConfig,DragComponentType.Component],
    collect: (monitor) => {
      return ({
        isOver:onIsOver(monitor)
      })
    },
    drop: onDrop,
   
  },[onDrop,onIsOver])



  return <>
    <TopicGap 
      style={isOver ? {backgroundColor: token.colorPrimary} : undefined}
      onDrop={onDrop}
      onIsOver={onIsOver}
    />
    <div 
      className='topic-container'
      ref={(node) => {
        drop(node)
        dragPreview(node)
      }}
      data-component-id={componentItem.id}
      style={{
        opacity:isDragging ? 0.5 : 1
      }}
    >
      <span ref={drag} >234</span>
      <div>
        <Input value={'题目' + componentItem.id} />
        <Input value={'题干'} />
      </div>
      <div>
        {React.createElement(componentConfigs[componentItem.componentName].component)}
      </div>
 
    </div>
  </>
}