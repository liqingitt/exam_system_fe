import React, { useRef } from 'react';
import { createStore, useStore } from 'zustand';

export interface ComponentItem {
    id: string;
    componentName: string;
}

export interface ComponentListState {
    componentList: ComponentItem[];
}

export type ComponentListProps = ComponentListState

type ComponentListStore = ReturnType<typeof createComponentListStore>

const createComponentListStore = (initState:ComponentListState) => {
  return createStore<ComponentListProps>(() => ({
    ...initState,
  }))
}

const componentListContext = React.createContext<ComponentListStore | null>(null);

type ComponentListProviderProps = React.PropsWithChildren<{componentListState:ComponentListState}>

export const ComponentListProvider:React.FC<ComponentListProviderProps> = (props) => {
  const {children,componentListState} = props
  const storeRef = useRef<ComponentListStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createComponentListStore(componentListState);
  }

  return <componentListContext.Provider value={storeRef.current}>{children}</componentListContext.Provider>
}

export const useComponentListStore = <T,>(selector: (state: ComponentListProps) => T):T => {
  const store = React.useContext(componentListContext);
  if (!store) {
    throw new Error('useComponentListStore must be used within a ComponentListProvider');
  }
  return useStore(store,selector);
}