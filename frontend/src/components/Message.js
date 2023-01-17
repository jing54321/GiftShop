import React, {Fragment} from 'react';
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
  return (
    <Fragment>
      <Alert variant={variant}>
        {children}
      </Alert>
    </Fragment>
  )
}

Message.defaultProps ={
    variant: 'info',
}

export default Message
