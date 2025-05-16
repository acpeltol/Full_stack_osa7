import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> shows only tittle and author in the begginning', async () => {

  const blog = {
    id: 'idflds',
    author : 'Alejandro',
    title : 'Jackob the Great',
    url: 'BaybyBeWortIt.com',
    likes : 2,
    user: { id: '4522dfsgqt', name: 'Fernado' }
  }

  const updateBlog = vi.fn()

  const deleteBlog = vi.fn()

  render(<Blog key={blog.id} blog={blog} update={updateBlog}
    onDelete={deleteBlog}/>)

  const titleElement = screen.getAllByText(blog.author)
  const authorElement = screen.getAllByText(blog.title)
  expect(titleElement[0]).toBeVisible()
  expect(authorElement[0]).toBeVisible()

  const urlElement = screen.getByText('BaybyBeWortIt.com')
  const likesElement = screen.getByText('2')
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
  expect(titleElement[1]).not.toBeVisible()
  expect(authorElement[1]).not.toBeVisible()
})


test('<Blog /> shows only title, author, url and likes after clicking view button', async () => {

  const blog = {
    id: 'idflds',
    author : 'Alejandro',
    title : 'Jackob the Great',
    url: 'BaybyBeWortIt.com',
    likes : 2,
    user: { id: '4522dfsgqt', name: 'User the Fernado' }
  }

  const updateBlog = vi.fn()

  const deleteBlog = vi.fn()

  render(<Blog key={blog.id} blog={blog} update={updateBlog}
    onDelete={deleteBlog}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)


  const titleElement = screen.getAllByText(blog.author)
  const authorElement = screen.getAllByText(blog.title)
  expect(titleElement[0]).not.toBeVisible()
  expect(authorElement[0]).not.toBeVisible()

  const urlElement = screen.getByText('BaybyBeWortIt.com')
  const likesElement = screen.getByText('2')
  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
  expect(titleElement[1]).toBeVisible()
  expect(authorElement[1]).toBeVisible()

})


test('Pressing like button works', async () => {

  const blog = {
    id: 'idflds',
    author : 'Alejandro',
    title : 'Jackob the Great',
    url: 'BaybyBeWortIt.com',
    likes : 2,
    user: { id: '4522dfsgqt', name: 'User the Fernado' }
  }

  const updateBlog = vi.fn()

  const deleteBlog = vi.fn()

  render(<Blog key={blog.id} blog={blog} update={updateBlog}
    onDelete={deleteBlog}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlog.mock.calls).toHaveLength(2)
})