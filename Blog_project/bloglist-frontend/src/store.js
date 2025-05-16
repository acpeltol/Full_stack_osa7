import { configureStore } from '@reduxjs/toolkit'
import nootificationSlice from './reducers/nootificationReducer'
import blogSlice from './reducers/blogReducer'
import usernameSlice from './reducers/usernameReducer'
import userSlice from './reducers/userReducer'
import passwordSlice from './reducers/passwordReducer'

const store = configureStore({
  reducer: {
    notification: nootificationSlice,
    blogs: blogSlice,
    username: usernameSlice,
    user: userSlice,
    password: passwordSlice
  }
})

export default store