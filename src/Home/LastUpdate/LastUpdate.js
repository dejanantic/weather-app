import React from 'react'
import {getTimeStamp} from '../../utils/api'
import './LastUpdate.css'

export default function LastUpdate() {
  return (
    <div className="last-update">
      <span className="last-update__timestamp">Updated {getTimeStamp()}</span>
    </div>
  )
}