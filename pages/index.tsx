import type { NextPage } from 'next'
import FullMessageThread from '../components/FullMessageThread'
import MembersSidebar from '../components/MembersSidebar'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useAppSelector } from '../redux/hooks'
import { useState } from 'react'

const Home: NextPage = () => {
	const user = useAppSelector((state) => state.userSlice.user)
	const router = useRouter()
	const [isMessageThreadOpen, setIsMessageThreadOpen] = useState<boolean>(false)

	if (!user) {
		router.push('/login')
		return null
	} else {
		return (
			<div className={styles.container}>
				<Sidebar />

				{isMessageThreadOpen && (
					<div className={styles.main__container}>
						<FullMessageThread />
					</div>
				)}

				<div className={styles.members__sidebar}>
					<MembersSidebar />
				</div>
			</div>
		)
	}
}

export default Home
