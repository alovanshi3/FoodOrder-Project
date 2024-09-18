import React from 'react'

const Message = ({children,variant}) => {
  return (
    <div className={`alert alert-${variant} loader` }>{children}
        
    </div>
  )
}

export default Message