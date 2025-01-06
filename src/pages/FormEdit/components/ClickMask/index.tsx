import { ComponentItem } from '@/components/FormRender/stores/componentListStore';
import { useUpdateEffect } from 'ahooks';
import { theme } from 'antd';
import { useCallback, useState } from 'react';

export interface HoverMaskProps {
    containerClassName:string
    componentId:string
    componentListMap:Record<string,ComponentItem>
}
export const ClickMask:React.FC<HoverMaskProps> = (props) => {
  const {componentId,containerClassName} = props;

  const {token} = theme.useToken();

  const calculatePosition = useCallback(() => {
    const defaultPosition = {
      top:0,
      left:0,
      width:0,
      height:0
    }
    const container = document.querySelector(`.${containerClassName}`);
    const hoverComponent = document.querySelector(`[data-component-id="${componentId}"]`);
    if(!container || !hoverComponent){
      return defaultPosition
    }
    const hoverComponentRect = hoverComponent.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const position = {
      top:hoverComponentRect.top - containerRect.top,
      left:hoverComponentRect.left - containerRect.left,
      width:hoverComponentRect.width,
      height:hoverComponentRect.height
    }
    return position;
  },[componentId, containerClassName])

  const [position,setPosition] = useState(() =>calculatePosition());

  
  useUpdateEffect(() => {
    setPosition(calculatePosition());
  },[componentId, containerClassName])

  return <div style={{
    pointerEvents:'none',
    position:'absolute',
    top:position.top,
    left:position.left,
    width:position.width,
    height:position.height,
    border:`1px dashed ${token.colorPrimary}`,
    boxSizing:'border-box',
    borderRadius:token.borderRadius
  }} />
}