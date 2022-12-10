import { NextApiResponse, NextApiRequest } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body

    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then(async () => {
            const userRef = collection(db, 'users')
            const q = query(userRef, where('email', '==', email))

            await getDocs(q).then((doc) => {
              doc.forEach((doc) => {
                res
                  .status(200)
                  .json({ message: 'Login successful', user: doc.data() })
              })
            })
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            res.status(400).json({ message: errorMessage, errorCode })
          })
      } catch (err) {
        res.status(400).json({ message: err })
      }
    } else {
      res.status(422).json({ message: 'Missing a required field' })
    }
  } else {
    res.status(200).json({ message: 'Incorrect http method' })
  }
}

export default login
