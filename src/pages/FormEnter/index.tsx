import { FormRender } from '@/components/FormRender'
import { storeHoc } from '@/components/FormRender/stores'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const FormEnter:React.FC = () => {
  return <DndProvider backend={HTML5Backend}>
    <div>

      <FormRender model='enter' />
    </div>
  </DndProvider>
}

export default storeHoc(FormEnter)