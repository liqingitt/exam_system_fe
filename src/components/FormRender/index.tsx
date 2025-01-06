import React from 'react';
import { useComponentListStore } from './stores/componentListStore';
import { Topic } from './components/Topic';

/**
 * 使用该组件时，务必在外层组件中包裹 storeHoc 与 react-dnd 包裹
 */

export interface FormRenderProps {
  model:'edit' | 'enter'
}

export const FormRender:React.FC<FormRenderProps> = (props) => {
  const {model} = props;


  const componentList = useComponentListStore(state => state.componentList);
  
  return <div>
    {
      componentList.map(component => {
        return <Topic key={component.id} componentItem={component} model={model} />
      })
    }
  </div>;
};