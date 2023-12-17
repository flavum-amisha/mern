import { createSlice } from '@reduxjs/toolkit';

const Department = createSlice({
  name: 'department',
  initialState: [],
  reducers: {
    setDepartmentList: (state, action) => {
      return [...state,action.payload]
    },
  },
});

export const { setDepartmentList } = Department.actions;
export default Department.reducer;
