import { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import UUIDClass from 'uuidjs'

const createMessageThread = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const {
        userIds: { idFrom, idTo }
      } = req.body

      if (!idFrom || !idTo)
        res.status(400).json({ message: 'Missing a required field' })

      await setDoc(doc(db, 'messaging', UUIDClass.generate()), {
        idFrom,
        idTo
      })
    } catch (error) {
      res.status(500).json({ message: `An error has occurred ${error}` })
    }
  } else {
    res.status(400).send('Invalid method')
  }
}

export default createMessageThread
