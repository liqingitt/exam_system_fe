import React, { useRef } from 'react';
import { createStore, useStore } from 'zustand';

export interface ComponentConfig {
    name: string;
    group: string;
    component:React.FC<any>;
}

export interface ComponentConfigState {
    componentConfigs:Record<string,ComponentConfig>
}

export type ComponentConfigProps = ComponentConfigState

type ComponentConfigStore = ReturnType<typeof createComponentConfigStore>

const createComponentConfigStore = (initState:ComponentConfigState) => {
  return createStore<ComponentConfigProps>(() => ({
    ...initState,
  }))
}


const componentConfigContext = React.createContext<ComponentConfigStore | null>(null);


type ComponentConfigProviderProps =  React.PropsWithChildren<{componentConfigState:ComponentConfigState}>

export const ComponentConfigProvider:React.FC<ComponentConfigProviderProps> = (props) => {
  const {children,componentConfigState} = props
  const storeRef = useRef<ComponentConfigStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createComponentConfigStore(componentConfigState);
  }

  return <componentConfigContext.Provider value={storeRef.current}>{children}</componentConfigContext.Provider>
}


export const useComponentConfigStore =<T,>(selector: (state: ComponentConfigProps) => T):T => {
  const store = React.useContext(componentConfigContext);
  if (!store) {
    throw new Error('useComponentConfigStore must be used within a ComponentConfigProvider');
  }
  return useStore(store,selector);
}
