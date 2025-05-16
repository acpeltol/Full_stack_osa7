import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddingForm from './Addingform'

test('Adding Blog sends right information further', async () => {

  const blog = {
    id: 'idflds',
    author : 'Alejandro',
    title : 'Jackob the Great',
    url: 'BaybyBeWortIt.com',
    likes : 2,
    user: { id: '4522dfsgqt', name: 'User the Fernado' }
  }

  const user = userEvent.setup()

  const adBlog = vi.fn()

  render(<AddingForm addBlog={adBlog}/>)


  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const Button = screen.getByText('create')

  await user.type(titleInput,'titTest')
  await user.type(authorInput,'autTest')
  await user.type(urlInput,'urlTest')
  await user.click(Button)

  console.log(adBlog.mock.calls[0][0])

  expect(adBlog.mock.calls).toHaveLength(1)
  expect(adBlog.mock.calls[0][0].title).toBe('titTest')
  expect(adBlog.mock.calls[0][0].author).toBe('autTest')
  expect(adBlog.mock.calls[0][0].url).toBe('urlTest')
})