import {UseState} from './UseState'
import {ClassState} from './ClassState'
import { UseReducer } from './Reducer/UserReducer'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen items-center justify-center gap-5'>
        <UseState name="UseStateName" />
        {/* <ClassState name="ClassStateName" /> */}
        <UseReducer name="Use Reducer"/>
      </div>
    </>
  )
}

export default App
