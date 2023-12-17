import { createSlice } from '@reduxjs/toolkit';

const showDetails = createSlice({
  name: 'details',
  initialState: {
    cardDetails: null,
  },
  reducers: {
    setShowDetails: (state, action) => {
      state.cardDetails = action.payload;
    },
  },
});

export const { setShowDetails } = showDetails.actions;
export default showDetails.reducer;