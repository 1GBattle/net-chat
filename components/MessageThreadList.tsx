import React from 'react'
import UUIDClass from 'uuidjs'

import { useAppSelector } from '../redux/hooks'

import styles from '../styles/MessageThreadList.module.css'

const MessageThreadList = () => {
  const messageThreads = useAppSelector((state) => state.messageSlice.messages)
  const formattedMessageThreads = Object.fromEntries(
    Object.entries(messageThreads)
  )

  if (!messageThreads) {
    return <div>Something</div>
  }

  console.log('formattedMessageThreads', formattedMessageThreads)
  console.log('messageThreads', messageThreads)

  return messageThreads.map((messageThread) => {
    for (const message in messageThread) {
      return (
        <div key={UUIDClass.generate()} className={styles.container}>
          <h1 className={styles.senderName}>Name here</h1>
          <hr className={styles.hRule} />
        </div>
      )
    }
  })
}

export default MessageThreadList
