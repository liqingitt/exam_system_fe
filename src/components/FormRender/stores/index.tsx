import { ComponentConfigProvider } from './componentConfigStore'
import { initComponentConfigs } from './const'

export const storeHoc =  <T extends object>(Component: React.FC<T>) => {
  return (props: T) => {
    return <ComponentConfigProvider componentConfigState={{componentConfigs:initComponentConfigs}}>
      <Component {...props} />
    </ComponentConfigProvider>
  }
}