import React from 'react'
import { FaCity } from 'react-icons/fa'
import './Welcome.css'

export default function Welcome() {
  return <div className="welcome">
    Hello! Add your first <FaCity className="welcome__icon" size={30} color="#fff" />
  </div>
}