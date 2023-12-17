import { combineReducers } from 'redux';
import editReducer from './EditSlice';
import showModal from './Details'
import  setLogin  from './LoginSlice';
import  setDepartment  from './Department';

const rootReducer = combineReducers({
  edit: editReducer, 
  showModal:showModal,
  setLogin :setLogin,
  setDepartment:setDepartment
});

export default rootReducer;
