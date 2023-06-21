import {UseState} from './UseState'
import {ClassState} from './ClassState'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen items-center justify-center gap-5'>
        <UseState name="UserStateName" />
        <ClassState name="ClassStateName" />
      </div>
    </>
  )
}

export default App
