/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
import { useState } from "react";
import Proptypes from "prop-types";
import blogService from "../services/blogs";

const handleDelete = async (id, user, blogs, setBlogs) => {
  try {
    const blogIndex = blogs.find((blog) => blog.id === id);
    if (blogIndex.user[0].id === user.userId) {
      if (
        window.confirm(`Remove blog ${blogIndex.title} by ${blogIndex.author}`)
      ) {
        await blogService.del(blogIndex.id).then((response) => {
          setBlogs(blogs.filter((n) => n.id !== id));
        });
      }
    }
  } catch (exception) {
    console.log(exception);
  }
};

const Blog = ({ blog, handleLikes, user, id, blogs, setBlogs }) => {
  const { title, url, likes, author } = blog;
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const shownWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handle = () => {
    handleDelete(id, user, blogs, setBlogs);
  };

  const canDelete = () => {
    const blogIndex = blogs.find(blog => blog.id === id);
    if (!blogIndex) {
      return false;
    }
    // Check if the user is the owner of the blog
    if (!user || !user.userId ) {
      return false;
    }
    // Chech if the blog's user ID matches the current user's ID
    if (!blogIndex.user || !blogIndex.user[0] || !blogIndex.user[0].id) {
      return false
    }
    // Loop through blogs to find if the user is the owner
    for (let i = 0; i < blogs.length; i++) {
      if(blogs[i].user[0].id === user.userId) {
        return true;
      }else {
        return false;
      }
    }
  };
  
  const blogStyle = {
    paddingTop: 15,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <div style={blogStyle} data-testid="blogs" className="blog-container">
          {title}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={shownWhenVisible}>
        <div style={blogStyle} className="blog">
          {title}
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {url}
          <br />
          <div data-testid="likes" className="likes">
            {likes}
            <button onClick={handleLikes}>like</button>
            <br />
          </div>
          {author}
          <br />
          <div>
            <button
              onClick={handle}
              data-testid="deletebutton"
              className={canDelete() ? "" : "hidden"}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Blog.Proptypes = {
  handleLikes: Proptypes.func.isRequired,
  blog: Proptypes.string.isRequired,
};

export default Blog;
