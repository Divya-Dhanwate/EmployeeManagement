
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import Header from './components/Header'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeForm from './components/EmployeeForm'

function App() {

  return (
    <>


      <BrowserRouter>
        <div className='min-h-screen flex flex-col bg-slate-50'>
          <Header />
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeForm />} />

            <Route path='/edit-employee/:id' element={<EmployeeForm />}></Route>
          </Routes>

          <FooterComponent />
        </div>
      </BrowserRouter>


    </>
  )
}

export default App
