import { Outlet } from 'react-router-dom'
import Header from "./components/Header"


function App() {



  return (
    <>
      <div className='font-merriweather font-light'>
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
