import React from 'react';
import { DragComponentType } from '../../const';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { theme } from 'antd';

export interface TopicGapProps {
    style?:React.CSSProperties
    onDrop: (item: any,monitor:DropTargetMonitor<unknown, unknown>) => void
    onIsOver: (monitor:DropTargetMonitor<unknown, unknown>) => boolean
}
export const TopicGap:React.FC<TopicGapProps> = (props) => {
  const {style,onDrop,onIsOver} = props;
  const {token} = theme.useToken();
  const [{isOver},drop] = useDrop({
    accept: [DragComponentType.ComponentConfig,DragComponentType.Component],
    collect: (monitor) => ({
      isOver:onIsOver(monitor)
    }),
    drop: onDrop,
  },[onIsOver,onDrop])
  return <div ref={drop} style={{width:'100%',height:10,backgroundColor:isOver ? token.colorPrimary : '#fff',...style,}} />
}
