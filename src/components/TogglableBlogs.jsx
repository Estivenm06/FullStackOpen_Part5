import { useState } from 'react'
import blogService from '../services/blogs'

const handleDelete = async (id, user, blogs, setBlogs) => {
  try{
    const blogIndex = blogs.find((n) => n.id === id)
    if(blogIndex.user[0].id === user.id){
      if(window.confirm(`Remove blog ${blogIndex.title} by ${blogIndex.author}`)) {
        await blogService.del(blogIndex.id).then((response) => {
          setBlogs(blogs.filter((n) => n.id !== id))
        })}}
  }catch(exception){
    console.log(exception)
  }
}

const TogglableBlogs = ({ title, author, likes, url, blogStyle, handleLikes, buttonLabel, user, id, blogs, setBlogs  }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const shownWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handle = () => {
    handleDelete(id, user, blogs, setBlogs)
  }

  const canDelete = () => {
    const blogIndex = blogs.find(n => n.id === id)
    if(blogIndex, user){
      return blogIndex.user[0].id === user.id
    }else{
      return false
    }
  }

  return(
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle} data-testid='blogs' className='blog-container'>
          {title}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
      </div>
      <div style={shownWhenVisible}>
        <div style={blogStyle} className="blog">
          {title}
          <button onClick={toggleVisibility}>hide</button><br/>
          {url}<br/>
          <div data-testid='likes'>
            <span id='likes'>{likes}</span>
            <button onClick={handleLikes}>like</button><br/>
          </div>
          {author}<br/>
          <div>
            <button onClick={handle} data-testid='deletebutton' className={canDelete() ? '' : 'hidden'}>delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TogglableBlogs