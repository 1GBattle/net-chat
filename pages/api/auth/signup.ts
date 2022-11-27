import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase/firebase'
import UUIDClass from 'uuidjs'
import User from '../../../models/UserModel'
import { doc, setDoc } from 'firebase/firestore'

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { email, password, firstName, lastName, userName } = req.body

		if (userName && password && email && firstName && lastName) {
			await createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					let user = userCredential.user
					const userInfo = {
						email: user.email,
						firstName,
						lastName,
						userName,
						messages: [],
						userId: UUIDClass.generate()
					} as User

					setDoc(doc(db, 'users', userInfo.userId), userInfo)
					res.status(200).json({ message: 'User created', userInfo })
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

export default signup
