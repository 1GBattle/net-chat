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
			<div className={`${styles.sidebar__heading__container}`}>
				<h1 className={`${styles.username__heading}`}>{user.userName}</h1>

				<div className={`${styles.sidebar__heading__button__container}`}>
					<button
						className={`${styles.new__message__button}`}
						onClick={() => setIsNewMessageModalOpen(!isNewMessageModalOpen)}
					>
						<Image
							className={`${styles.new__single__msg__image}`}
							src={'/new-single.png'}
							width='20'
							height='20'
							alt='new friend icon'
						/>
					</button>
					<button className={`${styles.new__message__button}`}>
						<Image
							className={`${styles.new__group__msg__image}`}
							src={'/new-group.png'}
							width={20}
							height={20}
							alt='new group icon'
						/>
					</button>
				</div>
			</div>

			<div className={`${styles.messageThreads__container}`}>
				<input
					className={`${styles.messageThreads__search__input}`}
					type='text'
					placeholder='Search messages...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className={`${styles.button__container}`}>
				<button className={`${styles.button} btn`}>View All</button>
				<button className={`${styles.button} btn`}>Private</button>
				<button className={`${styles.button} btn`}>Group</button>
			</div>

			<div className={`${styles.messageThreads__container}`}>
				<MessageThreadList />
			</div>

			<hr />
		</div>
	)
}

export default Sidebar
