import { Input } from 'antd';
import { ComponentConfigState } from './componentConfigStore';

export const initComponentConfigs:ComponentConfigState['componentConfigs'] = {
  '文本组件':{
    name:'文本组件',
    group:'基础组件',
    component:Input
  },
  '文本组件2':{
    name:'文本组件2',
    group:'基础组件',
    component:Input
  },
  '下拉组件':{
    name:'下拉组件',
    group:'选择组件',
    component:Input
  },
  '单选组件':{
    name:'单选组件',
    group:'选择组件',
    component:Input
  },
  '多选组件':{
    name:'多选组件',
    group:'选择组件',
    component:Input
  },
  '日期组件':{
    name:'日期组件',
    group:'日期组件',
    component:Input
  },
  '时间组件':{
    name:'时间组件',
    group:'日期组件',
    component:Input
  }

}