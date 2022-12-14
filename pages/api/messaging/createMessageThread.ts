import { NextApiRequest, NextApiResponse } from 'next'
import { ref, set } from 'firebase/database'
import { realTimeDatabase } from '../../../firebase/firebase'
import UUIDClass from 'uuidjs'
import MessageModel from '../../../models/MessageModel'

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

      //Creates a new nested doc in realtime database with idFrom representing the current user
      await set(
        ref(
          realTimeDatabase,
          `messaging/${idFrom}/${idFrom.slice(0, 8)}-${idTo.slice(
            0,
            8
          )}/${UUIDClass.generate()}`
        ),
        {
          idFrom,
          idTo,
          content: '',
          timestamp: Date.now(),
          isRead: false
        } as MessageModel
      )

      res.status(200).json({ message: 'Message thread created' })
    } catch (error) {
      res.status(500).json({ message: `An error has occurred`, error })
    }
  } else {
    res.status(400).send('Invalid method')
  }
}

export default createMessageThread
