import React from 'react'
import styles from '../styles/UserSearchResult.module.css'

interface Props {
  user: { fullName: string; userName: string; imgUrl?: string }
}

const UserSearchResult: React.FC<Props> = ({ user }) => {
  console.log(user.userName)
  return (
    <button className={styles.user__search__result}>
      <div className={styles.container}>
        <div className={styles.user__img}>
          {/*<img src={user.imgUrl} alt="user" />*/}
        </div>

        <div className={styles.user__info}>
          <h2 className={styles.full__name}>{user.fullName}</h2>
          <p className={styles.user__name}>@{user.userName}</p>
        </div>
      </div>
    </button>
  )
}

export default UserSearchResult
