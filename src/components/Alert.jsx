/* eslint-disable linebreak-style */
const Alert = ({ alert }) => {
  if ( alert === null) {
    return
  }
  const { message, type } = alert


  return <div className={`${type}`}>{message}</div>
}

export default Alert
