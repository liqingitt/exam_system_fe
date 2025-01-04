import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragComponentType } from './const';
import { ComponentConfig } from './stores/componentConfigStore';

/**
 * 使用该组件时，务必在外层组件中包裹 storeHoc 与 react-dnd 包裹
 */

export interface FormRenderProps {
  model:'edit' | 'enter'
}

export const FormRender:React.FC<FormRenderProps> = (props) => {
  const {model} = props;
  const [{isOver},drop] = useDrop({
    accept: DragComponentType.ComponentConfig,
    drop: (item: ComponentConfig) => {
      console.log(item)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })
  const [{isDragging},drag] = useDrag({
    type: DragComponentType.Component,
    item: {
      ddd:234
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    canDrag: () => model !== 'enter'
  })

  
  return <div 
    ref={(node) => {
      drag(drop(node))
    }}
    style={{
      opacity: isDragging ? 0.5 : 1,
      backgroundColor: isOver ? '#f0f0f0' : 'transparent'
    }}>
    324
  </div>;
};