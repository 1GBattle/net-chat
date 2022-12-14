import type { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import axios from 'axios'
import firebase from 'firebase/compat'

import User from '../models/UserModel'
import Loading from '../components/Loading'
import FullMessageThread from '../components/FullMessageThread'
import MembersSidebar from '../components/MembersSidebar'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import OptionsSidebar from '../components/OptionsSidebar'
import NewMessageModal from '../components/NewMessageModal'
import { setMessages } from '../redux/messageSlice'
import MessageModel from '../models/MessageModel'

const Home: NextPage = () => {
  const user = useAppSelector((state) => state.userSlice.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] =
    useState<boolean>(false)
  const [isMessageThreadOpen, setIsMessageThreadOpen] = useState<boolean>(false)
  const isUserAuthenticated = useRef<boolean>(false)

  useEffect(() => {
    isUserAuthenticated.current = !!user?.userName

    if (!isUserAuthenticated.current) {
      router.push('/login')
    }

    //immediately invoked async function that retrieves the users messages and sets them to the redux store
    user?.userId
      ? (async () => {
          await axios
            .post('/api/messaging/getAllMessageThreads', {
              userId: user?.userId
            })
            .then((res) => {
              // iterates over the messages objects and assigns them to the redux store
              Object.keys(res.data.userMessages).map((key) => {
                const message = res.data.userMessages[key]
                dispatch(setMessages(message))
              })
            })
        })()
      : null
  })

  // if (isUserAuthenticated.current) {
  //   console.log('user is not authenticated')
  //   return <Loading />
  // }

  return (
    <div className={styles.container}>
      <div className={styles.options__sidebar}>
        <OptionsSidebar
          isNewMessageModalOpen={isNewMessageModalOpen}
          setIsNewMessageModalOpen={setIsNewMessageModalOpen}
        />
      </div>

      <div className={styles.main__sidebar}>
        <Sidebar />
      </div>

      {isMessageThreadOpen && (
        <div className={styles.main__container}>
          <FullMessageThread />
        </div>
      )}

      {isNewMessageModalOpen && (
        <div className={styles.main__container}>
          <NewMessageModal
            setIsNewMessageThreadOpen={setIsNewMessageModalOpen}
            modalHeading={'New Direct Message'}
            setIsNewMessageModalOpen={setIsNewMessageModalOpen}
            isNewMessageModalOpen={isNewMessageModalOpen}
          />
        </div>
      )}

      <div className={styles.members__sidebar}>
        <MembersSidebar />
      </div>
    </div>
  )
}

export default Home
