import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/nootificationReducer'

const AddingForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //const notification = useSelector(state => state.notification)

  const handleBlogAdding = async (event) => {
    event.preventDefault()

    console.log('el puta')

    try {

      await dispatch(createBlog({
        'title' : title,
        'author' : author,
        'url': url
      }))

      dispatch(setNotification(`a new blog ${title} by ${author} added`))

    } catch (exception) {
      console.log('error', exception)
      dispatch(setNotification('error creating blog'))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (<>
    <h2>Create New</h2>
    <form onSubmit={handleBlogAdding}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          placeholder='title'
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          placeholder='author'
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          placeholder='url'
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  </>
  )
}

export default AddingForm