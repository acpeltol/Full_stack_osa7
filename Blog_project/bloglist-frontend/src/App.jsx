import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import AddingForm from './components/Addingform'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/nootificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUsername } from './reducers/usernameReducer'
import { setUser } from './reducers/userReducer'
import { setPassword } from './reducers/passwordReducer'

const App = () => {
  const dispatch = useDispatch()
  const password = useSelector(state => state.password)
  const user = useSelector(state => state.user)
  const username = useSelector(state => state.username)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    const loggedUser = window.localStorage
      .getItem('loggedBlogaooUSer')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogaooUSer', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exeption){
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()

    dispatch(setUser(null))
  }


  const loginForm = () => (
    <><h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))} />
        </div>
        <button type="submit">login</button>
      </form></>
  )

  const showBlogs = () => {

    dispatch(initializeBlogs())

    return(<>
      <h2>blogs</h2>

      <p>{user.name} is logged in</p>

      <form onSubmit={handleLogout}>
        <button type="submit" >logout</button>
      </form>

      <Togglable buttonLabel='AddForm'>
        <AddingForm/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </> )
  }

  return (
    <div>
      <h1>  {notification && <div className="notification">{notification}</div>}</h1>

      {!user && loginForm()}
      {user && showBlogs()}


    </div>
  )
}

export default App