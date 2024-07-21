import Proptypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          id='username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          name="password"
          value={password}
          id='password'
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.Proptypes = {
  handleUsernameChange: Proptypes.func.isRequired,
  handlePasswordChange: Proptypes.func.isRequired,
  handleLogin: Proptypes.func.isRequired,
  username: Proptypes.string.isRequired,
  password: Proptypes.string.isRequired,
}

export default LoginForm
