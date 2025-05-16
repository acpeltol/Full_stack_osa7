import { createSlice } from '@reduxjs/toolkit'

const nootificationSlice = createSlice({
  name: 'nootification',
  initialState: null,
  reducers: {
    setNote(state, action) {
      return action.payload
    }
  },
})

export const setNotification = (message) => {
  return async dispatch => {
    dispatch(setNote(message))
    setTimeout(() => {
      dispatch(setNote(null))
    }, 5000)
  }
}

export const { setNote } = nootificationSlice.actions
export default nootificationSlice.reducer