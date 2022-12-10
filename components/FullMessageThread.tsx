import Image from 'next/image'
import React from 'react'
import styles from '../styles/FullMessageThread.module.css'
import FullThreadNav from './FullThreadNav'
import MessageThread from './MessageThreadList'

const FullMessageThread = () => {
  return (
    <div className={`${styles.container}`}>
      <FullThreadNav />

      <div className={`${styles.message__container}`}>
        <MessageThread />
      </div>

      <div className={`${styles.message__input__container}`}>
        <textarea
          className={`${styles.message__input}`}
          placeholder="Send a message..."
        />
      </div>
    </div>
  )
}

export default FullMessageThread
