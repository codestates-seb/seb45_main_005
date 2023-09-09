import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isDetailOpen: false,
    isToastOpen: false,
    isAlbumDetailOpen: false,
    isSongOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openDetailModal: (state) => {
      state.isDetailOpen = true;
    },
    closeDetailModal: (state) => {
      state.isDetailOpen = false;
    },
    openToastModal: (state) => {
      state.isToastOpen = true;
    },
    closeToastModal: (state) => {
      state.isToastOpen = false;
    },
    openAlbumDetailModal: (state) => {
      state.isAlbumDetailOpen = true;
    },
    closeAlbumDetailModal: (state) => {
      state.isAlbumDetailOpen = false;
    },
    openSongLists: (state) => {
      state.isSongOpen = true;
    },
    closeSongLists: (state) => {
      state.isSongOpen = false;
    },
  },
});

export default ModalSlice;

export const {
  openModal,
  closeModal,
  openDetailModal,
  closeDetailModal,
  openToastModal,
  closeToastModal,
  openAlbumDetailModal,
  closeAlbumDetailModal,
  openSongLists,
  closeSongLists,
} = ModalSlice.actions;
