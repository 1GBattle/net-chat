import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import FullMessageThread from '../components/FullMessageThread'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Sidebar />
			<FullMessageThread />
		</div>
	)
}

export default Home
