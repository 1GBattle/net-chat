import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from '../styles/NewMessageModal.module.css'
import axios from 'axios'
import UserSearchResult from './UserSearchResult'

interface Props {
  setIsNewMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isNewMessageModalOpen: boolean
  modalHeading: string
  setIsNewMessageThreadOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NewMessageModal: React.FC<Props> = ({
  setIsNewMessageModalOpen,
  isNewMessageModalOpen,
  modalHeading,
}) => {
  const [isBrowser, setIsBrowser] = React.useState(false)
  const [userQuery, setUserQuery] = React.useState<string>('')
  const [searchResults, setSearchResults] = React.useState<any[]>([])

  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axios.post('/api/users/searchUsers', { userQuery }).then((user) => {
      setSearchResults([user.data])
    })
  }

  const handleSearchResultClick = () => {
    setIsNewMessageModalOpen(false)
  }

  //runs after the component mounts to ensure that the window object is available
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const modalContent = (
    <div onClick={() => setIsNewMessageModalOpen(!isNewMessageModalOpen)}>
      <div className={styles.modal__overlay}>
        <div className={styles.modal__container}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h1 className={styles.modal__heading}>{modalHeading}</h1>

            <div className={`form-group ${styles.form__group}`}>
              <form
                className={styles.form}
                onSubmit={(e) => handleInputSubmit(e)}
              >
                <input
                  value={userQuery}
                  className={`form-input ${styles.form__input}`}
                  type="text"
                  placeholder="Search for a user"
                  onChange={(e) => setUserQuery(e.target.value)}
                />
              </form>
            </div>

            {searchResults.length > 0 && (
              <div
                className={styles.search__results}
                onClick={() => handleSearchResultClick()}
              >
                {searchResults.map((user) => (
                  <UserSearchResult
                    key={user.userInfo.userId}
                    user={user.userInfo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLElement
    )
  }
  return null
}
export default NewMessageModal
