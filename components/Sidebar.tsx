import Image from 'next/image'
import React from 'react'
import { useAppSelector } from '../redux/hooks'
import styles from '../styles/Sidebar.module.css'
import MessageThreadList from './MessageThreadList'

const Sidebar = () => {
  const user = useAppSelector((state) => state.userSlice.user)
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] =
    React.useState<boolean>(false)

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.messageThreads__container}`}>
        <input
          className={`${styles.messageThreads__search__input}`}
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <hr className={styles.hRule} />

      <div className={`${styles.button__container}`}>
        <button className={`${styles.button} btn`}>Direct</button>
        <button className={`${styles.button} btn`}>Group</button>
      </div>

      <div className={`${styles.messageThreads__container}`}>
        <MessageThreadList />
      </div>
    </div>
  )
}

export default Sidebar
