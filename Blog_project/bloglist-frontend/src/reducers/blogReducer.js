import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const likeBlog = ( updatedBlog ) => {
  return async dispatch => {
    const back = await blogService.update(updatedBlog)
    const notes = await blogService.getAll()
    dispatch(setBlogs(notes))
  }
}

export const deleteBlog = ( id ) => {
  return async dispatch => {
    const back = await blogService.deleteBlo(id)
    const notes = await blogService.getAll()
    dispatch(setBlogs(notes))
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const notes = await blogService.getAll()
    dispatch(setBlogs(notes))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const { appendBlog, setBlogs } = blogSlice.actions

export default blogSlice.reducer