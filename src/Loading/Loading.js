import React, { useState, useEffect } from 'react'
import './Loading.css'

export default function Loading({ loadingMessage = 'Loading', speed = 600 }) {
  const initialMessage = loadingMessage
  const [ message, setMessage ] = useState(initialMessage)

  useEffect(() => {
    const id = window.setInterval(() => {
      console.log('interval running')
      message === `${ initialMessage }...`
        ? setMessage(initialMessage)
        : setMessage(message => `${ message }.`)
    }, speed)

    return () => window.clearInterval(id)
  }, [ message, initialMessage, speed ])

  return (
    <div className="loading">{message}</div>
  )
}