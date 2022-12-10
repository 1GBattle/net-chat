import React from 'react'
import styles from '../styles/OptionsSidebar.module.css'
import Image from 'next/image'
import { useAppDispatch } from '../redux/hooks'
import { logoutUser } from '../redux/userSlice'

interface Props {
  isNewMessageModalOpen: boolean
  setIsNewMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const OptionsSidebar: React.FC<Props> = ({
  isNewMessageModalOpen,
  setIsNewMessageModalOpen,
}) => {
  const dispatch = useAppDispatch()

  const handleNewMessageClick = () => {
    setIsNewMessageModalOpen(!isNewMessageModalOpen)
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.options__container}>
        <div className={`${styles.sidebar__heading__button__container}`}>
          <button
            className={`${styles.new__message__button}`}
            onClick={handleNewMessageClick}
          >
            <Image
              className={`${styles.new__single__msg__image}`}
              src={'/new-single.png'}
              width={36}
              height={36}
              alt="new friend icon"
            />
          </button>
          <button className={`${styles.new__message__button}`}>
            <Image
              className={`${styles.new__group__msg__image}`}
              src={'/new-group.png'}
              width={36}
              height={36}
              alt="new group icon"
            />
          </button>
        </div>

        <button
          className={styles.logout__button}
          onClick={() => dispatch(logoutUser())}
        >
          <Image
            className={styles.logout__button__image}
            src={'/logout__button.png'}
            height={36}
            width={36}
            alt={'logout button'}
          />
        </button>
      </div>
    </div>
  )
}

export default OptionsSidebar
