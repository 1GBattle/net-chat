import { NextApiResponse, NextApiRequest } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { email, password } = req.body
		if (email && password) {
			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user
					res.status(200).json({ message: 'User logged in', user })
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
