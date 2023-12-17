import { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/LoginSlice';
import toast from "react-hot-toast"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const [loginData, setLoginData] = useState({
    employee_id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      // Check for empty fields
      if (loginData.employee_id === '' || loginData.password === '') {
        toast.error('Please fill in all the required fields.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/employee/login',
        loginData
      );
      localStorage.setItem(
        'manager',
        response.data.employee.position === 'managerial'
      );
      dispatch(setLogin(true));
      console.log('===========', response);
      navigate('/employees');
    } catch (error) {
      toast.error('An error occurred while logging in.', { autoClose: 3000 });
    }
  };
  

  return (
    <div>
      <div className='flex  justify-center items-center'>
      <input
          placeholder='employee id'
          className='input'
          name="employee_id"
          label="Employee ID"
          value={loginData.employee_id}
          onChange={handleChange}
          
        />
        <input
          placeholder='password'
          className='input'
          name="password"
          label="Password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
         
        />
        <button onClick={handleLogin} >
          Login
        </button>
        <Link to="/signup">Dont have an account?</Link>
      </div>
    </div>
  );
};

export default Login;
