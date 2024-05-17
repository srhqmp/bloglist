import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === '' || notification.variant === null) {
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
