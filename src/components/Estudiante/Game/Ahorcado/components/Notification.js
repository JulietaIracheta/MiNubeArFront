import React from 'react'

const Notification = ({ showNotification }) => {
  return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <p>Ya ingresaste esa letra</p>
    </div>
  )
}

export default Notification
