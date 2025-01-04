import { FormRender } from '@/components/FormRender'
import styles from './index.less'
import { DragComponentType } from '@/components/FormRender/const';
import { useDrop } from 'react-dnd';
export const FormEditContentCenterBody:React.FC = () => {
  const [{isOver},drop] = useDrop({
    accept: [DragComponentType.Component,DragComponentType.ComponentConfig],
    collect: (monitor) => ({
      isOver: !!monitor.isOver({shallow:true})
    }),
    drop: (item: any,monitor) => {
      if(monitor.didDrop()){
        return
      }
      console.log(item);
    }
  })
  return <div className={styles.formEditContentCenterBody} ref={drop} style={{backgroundColor:isOver ? '#f0f0f0' : '#fff'}}>
    <FormRender model='edit' />
  </div>
}