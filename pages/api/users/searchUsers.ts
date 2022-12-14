import { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import User from '../../../models/UserModel'

const searchUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { userQuery } = req.body

      if (userQuery as string) {
        const userRef = collection(db, 'users')
        const q = query(userRef, where('userName', '==', userQuery))

        await getDocs(q).then((doc) => {
          doc.forEach((doc) => {
            res.status(200).json({
              message: 'User found',
              userInfo: {
                userName: doc.data().userName,
                fullName: doc.data().firstName + ' ' + doc.data().lastName,
                userId: doc.data().userId
              }
            })
          })
        })
      } else {
        res.status(400).json({ message: 'No user query provided' })
      }
    } catch (err) {
      res.status(500).json({ message: 'User not found' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default searchUsers
