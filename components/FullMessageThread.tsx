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
				<input
					type='text'
					className={`${styles.message__input}`}
					placeholder='Send a message...'
				/>
				<button className={`${styles.message__send__button}`}>
					<Image
						className='message__send__icon'
						src={'/send__icon.png'}
						alt='send button'
						width='48'
						height='46'
					/>
				</button>
			</div>
		</div>
	)
}

export default FullMessageThread
