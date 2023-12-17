import { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/LoginSlice';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const [loginData, setLoginData] = useState({
    employee_id: '',
    password: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/employee/login', loginData);
      localStorage.setItem("manager",response.data.employee.position=="managerial")
      dispatch(setLogin(true))
      console.log("===========",response)
      navigate('/employees')
      
    } catch (error) {
      toast.error('An error occurred while logging in.', { autoClose: 3000 });
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        hh
            </div>
    </div>
  );
};

export default Login;
