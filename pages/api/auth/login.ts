import { NextApiResponse, NextApiRequest } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import User from '../../../models/UserModel'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { email, password } = req.body

		if (email && password) {
			const userRef = collection(db, 'users')
			await signInWithEmailAndPassword(auth, email, password)
				.then(async () => {
					const q = query(userRef, where('email', '==', email))
					await getDocs(q).then((docs) => {
						docs.forEach((doc) => {
							console.log(doc.id, '=>', doc.data())
							res.status(200).json({ message: 'success', user: doc.data() })
						})
					})
					res
						.status(200)
						.json({
							message: 'User logged in',
							user: {
								email,
								firstName: 'some first name',
								lastName: 'some last name',
								messages: [],
								userId: '123',
								userName: 'someUsername'
							} as User
						})
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					res.status(400).json({ message: errorMessage, errorCode })
				})
		} else {
			res.status(422).json({ message: 'Missing a required field' })
		}
	} else {
		res.status(200).json({ message: 'Incorrect http method' })
	}
}

export default login
