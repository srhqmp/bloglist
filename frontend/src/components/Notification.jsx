import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const { message, variant = 'error' } = notification

  return <div className={`${variant} notification`}>{message}</div>
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  }),
}

export default Notification
