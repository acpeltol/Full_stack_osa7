import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { likeBlog , deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/nootificationReducer'


const Blog = ({ blog , user }) => {
  const dispatch = useDispatch()

  const [fullVisible, setFullVisible] = useState(false)

  const hideWhenVisible = { display: fullVisible ? 'none' : '' }
  const showWhenVisible = { display: fullVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setFullVisible(!fullVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = async () => {

    try{

      const info =  {
        'id' : blog.id,
        'user': blog.user.id,
        'likes' : blog.likes + 1,
        'author': blog.author,
        'title': blog.title,
        'url' : blog.url
      }

      dispatch(likeBlog(info))

      dispatch(setNotification(`you liked ${blog.title}`))

    } catch (exception){
      console.log('error', exception)
      dispatch(setNotification('error liking blog'))
    }
  }

  const deleteB = async () => {

    if (window.confirm('Do you want to delete the blog')) {
      console.log('Delete confirmed')

      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`you deleted ${blog.title}`))
      } catch (exception) {
        dispatch(setNotification('error deleting blog'))
      }
    }
  }

  return (<>
    <div style={{ ...hideWhenVisible, ...blogStyle }}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <button onClick={toggleVisibility}>view</button>
    </div>

    <div style={{ ...showWhenVisible, ...blogStyle }}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <button onClick={toggleVisibility}>hide</button>

      <p>{blog.likes}</p>
      <button onClick={updateBlog}>like</button>

      <p>{blog.url}</p>

      <p>{blog.user.name}</p>

      {
        user.name === blog.user.name && <button onClick={deleteB}>remove</button>
      }
    </div>
  </>
  )
}



export default Blog