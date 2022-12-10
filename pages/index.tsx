import type { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '../redux/hooks'
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

const Home: NextPage = () => {
  const user = useAppSelector((state) => state.userSlice.user)
  const router = useRouter()
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] =
    useState<boolean>(true)
  const [isMessageThreadOpen, setIsMessageThreadOpen] = useState<boolean>(false)
  const isUserAuthenticated = useRef<boolean>(false)

  useEffect(() => {
    isUserAuthenticated.current = !!user?.userName

    if (!isUserAuthenticated.current) {
      router.push('/login')
    }
  }, [isUserAuthenticated.current])

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
