import { NextApiRequest, NextApiResponse } from 'next'
import {
  getDocs,
  query,
  where,
  collection,
  orderBy,
  startAt,
  endAt
} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'

const getMessageThread = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') res.status(400).json({ message: 'Invalid method' })

  try {
    const { userId } = req.query

    if (!userId) res.status(400).json({ message: 'missing required field' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export default getMessageThread
