

import { useNavigate } from 'react-router-dom';
import Employees from './Pages/EmployeeList/Employees';
import Department from './Pages/DepartmentList/Department';
import EmployeeDetails from './Pages/EmployeeDetails';
import Login from './Pages/Login/Login';
import RegisterEmployee from './Pages/Signup/SignUp';

function App() {
 
 

 const navigate = useNavigate()
  return (
    <div className="App">
     <NavBar/>
     <Routes>
       
       <Route path = '/' element={<Employees/>} />
      <Route path = '/employees' element={<Employees/>} />
      <Route path='/*' element={<NotFound/>} />
      <Route path = '/department' element={<Department/>}></Route>
      <Route path='/employee' element={<EmployeeDetails/>}/>
       <Route path='/login' element={<Login/>} />
       <Route path='/signup' element={<RegisterEmployee/>} />
       
     </Routes> 
    </div>
  ); 
}

export default App;
