import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddingForm from './components/Addingform'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ErrorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (user){
      blogService.getAll().then(resp =>
        setBlogs( resp )
      )
    }
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage
      .getItem('loggedBlogaooUSer')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
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

      console.log(user)


      window.localStorage.setItem(
        'loggedBlogaooUSer', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()

    setUser(null)
  }

  const addBlog = async (blogObjet) => {
    console.log(blogObjet)

    try{
      const one = await blogService.addBlog(blogObjet)

      console.log('hier gut')

      const dogs = await blogService.getAll()

      setBlogs( dogs )

      setErrorMessage('New blog added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }catch (exeption){
      setErrorMessage('Posting failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObjet) => {
    console.log(blogObjet)

    try{
      const one = await blogService.update(blogObjet)

      console.log('Blog updating')

      const dogs = await blogService.getAll()

      setBlogs( dogs )

    }catch (exeption){
      setErrorMessage('Updating failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    console.log(id)

    try{
      const one = await blogService.deleteBlo(id)

      console.log('Blog deleting')

      const dogs = await blogService.getAll()

      setBlogs( dogs )

      setErrorMessage('Blog deleted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }catch (exeption){
      setErrorMessage('Deleting failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form></>
  )

  const showBlogs = () => {

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    return(<>
      <h2>blogs</h2>

      <p>{user.name} is logged in</p>

      <form onSubmit={handleLogout}>
        <button type="submit" >logout</button>
      </form>

      <Togglable buttonLabel='AddForm'>
        <AddingForm addBlog={addBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={updateBlog} onDelete={deleteBlog} user={user}/>
      )}
    </> )
  }

  return (
    <div>
      <h1>{ErrorMessage}</h1>

      {!user && loginForm()}
      {user && showBlogs()}


    </div>
  )
}

export default App