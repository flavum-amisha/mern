import { useState } from "react";
import { MenuItem,TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const [loading, setisloading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    password: "",
    address: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        formData.name === "" ||
        formData.employee_id === "" ||
        formData.password === "" ||
        formData.address === "" ||
        formData.position === ""
      ) {
        toast.error("Please fill in all the required fields.");
        return;
      }

      setisloading(true);
      const response = await axios.post(
        "http://localhost:8080/employee/register",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setisloading(false);
        toast.success("Registered successfully");
        navigate("/employees");
      } else {
        toast.error("Failed to register employee. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while registering employee.");
    }
  };

  return (
    <div className="m-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-auto mt-24 w-[800px] flex items-center justify-center ">
          <div className="flex flex-col gap-4">
            <input
              className="input w-[400px]"
              placeholder="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="input w-[400px]"
              placeholder="employee ID"
              name="employee_id"
              label="Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
            />
            <input
              className="input w-[400px]"
              placeholder="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="input w-[400px]"
              placeholder="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
           
          <TextField
            style={{width:"400px",background:"#fff"}}
            select
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="managerial">Manager</MenuItem>
            <MenuItem value="non-managerial">Employee</MenuItem>
          </TextField>
            <button className=""onClick={handleSubmit}>Register Employee</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterEmployee;
