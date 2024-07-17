import Proptypes from 'prop-types'
import TogglableBlogs from './TogglableBlogs'

const Blog = ({ blog, handleLikes, buttonLabel, user, id, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      <TogglableBlogs
        title={blog.title}
        author={blog.author}
        likes={blog.likes}
        url={blog.url}
        blogStyle={blogStyle}
        handleLikes={handleLikes}
        buttonLabel={buttonLabel}
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        id={id}
      >
      </TogglableBlogs>
    </div>
  )
}

Blog.Proptypes = {
  handleLikes: Proptypes.func.isRequired,
  blog: Proptypes.string.isRequired,
}

export default Blog
