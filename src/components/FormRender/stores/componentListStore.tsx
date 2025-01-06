import React, { useRef } from 'react';
import { createStore, useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

export interface ComponentItem {
    id: string;
    componentName: string;
}

export interface ComponentListState {
    componentList: ComponentItem[];
}

export interface ComponentListProps extends ComponentListState {
  componentListPush: (component: ComponentItem) => void;
  /**
   * 在指定id之前插入组件
   * @param data 
   * @returns 
   */
  componentListInsert:(data:{
    beforeId:string,
    componentItem:ComponentItem
  }) => void
}

type ComponentListStore = ReturnType<typeof createComponentListStore>

const createComponentListStore = (initState:ComponentListState) => {
  return createStore<ComponentListProps>((set,get) => ({
    ...initState,
    componentListPush: (component: ComponentItem) => {
      set({
        componentList: [...get().componentList, component]
      })
    },
    componentListInsert: (data) => {
      
      const {beforeId,componentItem} = data;
      const index = get().componentList.findIndex(item => item.id === beforeId);
      const newList = [...get().componentList];
      newList.splice(index, 0, componentItem);
      set({componentList: newList});
    }
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
  return useStore(store,useShallow(selector) );
}