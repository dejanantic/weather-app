import React from 'react'
import './Loading.css'

export default function Loading({ loadingMessage = 'Loading...' }) {
  return (
    <p>{loadingMessage}</p>
  )
}