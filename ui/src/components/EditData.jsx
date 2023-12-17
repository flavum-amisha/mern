import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EditModal = ({ open, handleClose, initialData }) => {
  const [editedData, setEditedData] = useState({ ...initialData });
  const departmentList = useSelector((state) => state.setDepartment);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:8080/employee/assign-department/', editedData);
      console.log('Updated Data:', response.data); 

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Name" value={editedData.name} onChange={handleEditInputChange} fullWidth margin="normal" />
        <TextField
          name="employee_id"
          label="Employee ID"
          value={editedData.employee_id}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Address"
          value={editedData.address}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
        />
        <Typography>Assign Department</Typography>
        <Select
          value={editedData.department || ''}
          onChange={handleEditInputChange}
          name="department"
          label="Department"
          fullWidth
          margin="normal"
        >
          {departmentList.length > 0 &&
            departmentList[0].map((department, index) => (
              <MenuItem key={index} value={department._id}>
                {department.name}
              </MenuItem>
            ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
