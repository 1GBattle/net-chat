interface MessageModel {
  idFrom: string
  idTo: string
  content: string
  timestamp: number
  isRead: boolean
}

export default MessageModel
