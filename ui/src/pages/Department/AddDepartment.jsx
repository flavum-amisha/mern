import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setEdit } from '../../store/EditSlice';
import { useNavigate } from 'react-router-dom';

const AddDepartment = ({ addDepartment }) => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [modal,showModal]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = useSelector((state) => state.edit);
  const [id,setId]= useState()
  const dispatch= useDispatch() 
  const navigate=useNavigate()

  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    if (isEdit && isEdit.isEdit) {
      setOpen(true);
      setDepartmentName(isEdit.name); 
      setId(isEdit.id);
      showModal(isEdit.isEdit);
      setIsEditing(isEdit); 
    } else {
      setOpen(false);
      setDepartmentName(''); 
      setIsEditing(isEdit);
    }
  }, [isEdit])
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(isEdit){
        dispatch(setEdit(false))
    }
    else
    setOpen(false);
    
  };

  const handleAdd = async () => {
    if (departmentName.trim() !== '') {
      try {
        setIsLoading(true);
        if (isEdit) {
        const response= await axios.put(`http://localhost:8080/department/update/${id}`,{ name: departmentName }) 
        dispatch(setEdit(false))  
        window.location.reload();
            
    
        } else {
          const response = await axios.post('http://localhost:8080/department/create', { name: departmentName });
          setDepartmentName(response.data.name); 
        }
      } catch (error) {
        console.error('Error adding/updating department:', error);
      } finally {
        setIsLoading(false);
        handleClose(); 
      }
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '5%', right: '5%' }}>
        
      <Button variant="contained" onClick={handleOpen}>
        {isEdit?"Update Department":"Add Department"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Update Department' : 'Add Department'}</DialogTitle>
        {isLoading ? (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        ) : (
          <DialogContent>
            <TextField
              label="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDepartment;
