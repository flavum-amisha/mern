import { useState } from "react";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      setisloading(true);
      const response = await axios.post(
        "http://localhost:8080/employee/register",
        formData
      );
      if (response.status === 200 || 201) {
        setisloading(false);
        toast("registered sucessfully");
        navigate("/employees");
      } else {
        toast.error("Failed to register employee. Please try again.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while registering employee.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <input
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="employee_id"
              label="Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
            />
            <input
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              name="position"
              label="Position"
              value={formData.position}
              onChange={handleChange}
            >
              <MenuItem value="managerial">Managerial Post</MenuItem>
              <MenuItem value="non-managerial">Non-Managerial Post</MenuItem>
            </input>
            <button onClick={handleSubmit}>Register Employee</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterEmployee;
