import { NextApiRequest, NextApiResponse } from 'next'
import { realTimeDatabase } from '../../../firebase/firebase'
import {
  get,
  ref,
  orderByKey,
  startAt,
  endAt,
  getDatabase,
  child
} from 'firebase/database'
import { app } from '../../../firebase/firebase'

const getAllMessageThreads = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { userId } = req.body

    if (!userId) {
      res.status(400).json({ message: 'Missing userId' })
    }

    const dbRef = ref(realTimeDatabase)

    // await get(child(dbRef, `messaging/${userId}`)).then((snapshot: any) => {
    //   if (!snapshot.exists()) {
    //     res.status(404).json({ message: 'No message threads found' })
    //   }

    //   const userSnapshot = snapshot
    //     .val()
    //     .filter(([key]: any) => key.includes(userId))

    //   res.status(200).json({
    //     userMessages: userSnapshot
    //   })
    // })

    const responce = await get(child(dbRef, `messaging/${userId}`)).then(
      (snapshot: any) => {
        if (!snapshot.exists()) {
          res.status(404).json({ message: 'No message threads found' })
        }

        return snapshot.val()
      }
    )
    res
      .status(200)
      .json({ message: 'User threads found', userMessages: responce })
  } catch (error) {
    res.status(505).json({ message: 'Something went wrong' })
  }
}

export default getAllMessageThreads
