import { ComponentConfigProvider } from './componentConfigStore'
import { ComponentListProvider } from './componentListStore'
import { initComponentConfigs } from './const'

export const storeHoc =  <T extends object>(Component: React.FC<T>) => {
  return (props: T) => {
    return <ComponentConfigProvider componentConfigState={{componentConfigs:initComponentConfigs}}>
      <ComponentListProvider componentListState={{componentList:[{
        id: '1',
        componentName: '多选组件',
      }]}}>
        <Component {...props} />
      </ComponentListProvider>
    </ComponentConfigProvider>
  }
}