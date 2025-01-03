import { Input } from 'antd';
import { ComponentConfigState } from './stores/componentConfigStore';

export const initComponentConfigs:ComponentConfigState['componentConfigs'] = [
  {
    name:'文本组件',
    group:'基础组件',
    component:Input
  },
  {
    name:'文本组件2',
    group:'基础组件',
    component:Input
  }
]