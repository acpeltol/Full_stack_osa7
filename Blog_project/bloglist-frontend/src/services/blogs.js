import axios from 'axios'
// const baseUrl = '/api/blogs'

const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const resp = await axios.get(baseUrl,config)

  let data = resp.data

  data.sort((a,b) => b.likes - a.likes)

  return data
}

const addBlog = async (content) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, content, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error adding blog:', error)
    throw error
  }
}

const update = async (content) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(`${baseUrl}/${content.id}`, content, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error adding blog:', error)
    throw error
  }
}

const deleteBlo = async (content) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${content}`, config)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error adding blog:', error)
    throw error
  }
}


export default { getAll, addBlog , update , deleteBlo ,setToken }