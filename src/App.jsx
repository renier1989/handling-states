import {UseState} from './UseState'
import {ClassState} from './ClassState'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen items-center justify-center gap-5'>
        <UseState />
        <ClassState />
      </div>
    </>
  )
}

export default App
