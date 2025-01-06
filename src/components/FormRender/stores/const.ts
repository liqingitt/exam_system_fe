import { Checkbox, DatePicker, Input, InputNumber, Radio, Select } from 'antd';
import { ComponentConfigState } from './componentConfigStore';

export const initComponentConfigs:ComponentConfigState['componentConfigs'] = {
  '文本录入组件':{
    name:'文本录入组件',
    group:'基础组件',
    component:Input
  },
  '数字录入组件':{
    name:'数字录入组件',
    group:'基础组件',
    component:InputNumber
  },
  '下拉组件':{
    name:'下拉组件',
    group:'选择组件',
    component:Select
  },
  '单选组件':{
    name:'单选组件',
    group:'选择组件',
    component:Radio
  },
  '多选组件':{
    name:'多选组件',
    group:'选择组件',
    component:Checkbox
  },
  '日期组件':{
    name:'日期组件',
    group:'日期组件',
    component:DatePicker
  },
  '时间组件':{
    name:'时间组件',
    group:'日期组件',
    component:DatePicker
  }

}