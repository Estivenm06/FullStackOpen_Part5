const Error = ({ error }) => {
  if (error === null) {
    return null
  }
  return <div>{error}</div>
}

export default Error
