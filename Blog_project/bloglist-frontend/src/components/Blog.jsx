import { useState, useEffect } from 'react'

const Blog = ({ blog , update , onDelete , user }) => {

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

  const updateBlog = () => {

    const info =  {
      'id' : blog.id,
      'user': blog.user.id,
      'likes' : blog.likes + 1,
      'author': blog.author,
      'title': blog.title,
      'url' : blog.url
    }

    update(info)
  }

  const deleteBlog = () => {

    if (window.confirm('Do you want to delete the blog')) {
      console.log('Delete confirmed')
      onDelete(blog.id)
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
        user.name === blog.user.name && <button onClick={deleteBlog}>remove</button>
      }
    </div>
  </>
  )
}



export default Blog