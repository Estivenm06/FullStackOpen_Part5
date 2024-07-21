import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
          data-testid='title'
          type="text"
          value={title}
          name="Title"
          id='title'
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        author
        <input
          data-testid='author'
          type="text"
          value={author}
          name="Author"
          id='author'
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          data-testid='url'
          type="text"
          value={url}
          name="Url"
          id='url'
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm
