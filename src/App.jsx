/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable quotes */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Alert from "./components/Alert";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [alertState, setAlertState] = useState(null);
  const blogFormRef = useRef();

  const setAlert = ({ message, type }) => {
    setAlertState({ message, type });
    setTimeout(() => {
      setAlertState(null);
    }, 2500);
  };

  useEffect(() => {
    try {
      blogService.getAll().then((blogs) => setBlogs(blogs));
      const localStorage = window.localStorage.getItem("loggedUserBlog");
      if (localStorage) {
        const user = JSON.parse(localStorage);
        setUser(user);
        blogService.setToken(user.token);
      }
    } catch (error) {
      console.log(error);
    }
  }, [alertState]);

  const addBlog = async (noteObject) => {
    const { author, title, url } = noteObject;
    if (author.trim() === "" || title.trim() === "" || url.trim() === "") {
      setAlert({
        message: "Author, title and url cannot be empty",
        type: "error",
      });
      return;
    }
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(noteObject);
      setBlogs([...blogs, returnedBlog]);
      setAlert({
        message: `a new blog ${noteObject.title} by ${noteObject.author}`,
        type: "success",
      });
      return true
    } catch (error) {
      setAlert({ message: error, type: "error" });
    }
  };

  const createForm = () => {
    return (
      <>
        <Togglable ref={blogFormRef}>
          <CreateForm createBlog={addBlog} />
        </Togglable>
      </>
    );
  };

  const loginForm = () => {
    return (
      <>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </>
    );
  };

  const handleLogout = () => localStorage.removeItem("loggedUserBlog");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setAlert({
        message: "Username and password cannot be empty",
        type: "error",
      });
      return;
    }

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUserBlog", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      setAlert({ message: "Wrong username or password", type: "error" });
    }
  };

  const handleLikes = async (id) => {
    const blogIndex = blogs.find((n) => n.id === id);
    const blogLikes = { ...blogIndex, likes: blogIndex.likes + 1 };
    await blogService.update(id, blogLikes).then((returnedLikes) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedLikes)));
    });
  };

  const blogSorted = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>
      <Alert alert={alertState} />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <form onSubmit={handleLogout}>
            {user.name} logged in <button type="submit">logout</button>
          </form>
          {createForm()}
          {blogSorted.map((blog, key) => (
            <Blog
              key={key}
              id={blog.id}
              blog={blog}
              blogs={blogs}
              user={user}
              setBlogs={setBlogs}
              handleLikes={() => handleLikes(blog.id)}
            />
          ))}
        </>
      )}
    </>
  );
};

export default App;
