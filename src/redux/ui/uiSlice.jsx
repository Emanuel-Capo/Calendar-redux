import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    openModal: state => {
      state.modalOpen = true;
    },
    closeModal: state => {
      state.modalOpen = false;
    }
  }
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
