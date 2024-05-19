import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === '' || notification.variant === null) {
    return null
  }
  const { message, variant = 'error' } = notification

  return (
    <Container maxWidth="lg" className={`${variant} notification`}>
      {message}
    </Container>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  }),
}

export default Notification
