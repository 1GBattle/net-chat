import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/LoginSignupForm.module.css'
import axios from 'axios'

const LoginSignupForm = () => {
	const router = useRouter()
	const [isLoginShowing, setIsLoginShowing] = React.useState<boolean>(true)
	const [userName, setUserName] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [confirmPassword, setConfirmPassword] = React.useState<string>('')
	const [firstName, setFirstName] = React.useState<string>('')
	const [lastName, setLastName] = React.useState<string>('')

	const handleLinkClick = () => {
		setIsLoginShowing(!isLoginShowing)
		setEmail('')
		setPassword('')
	}

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await axios
			.post('/api/auth/login', {
				email,
				password
			})
			.then((res) => (res.status === 200 ? router.push('/') : null))

		router.push('/')
	}

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await axios
			.post('/api/auth/signup', {
				userName,
				password,
				email,
				firstName,
				lastName
			})
			.then((res) => (res.status === 200 ? router.push('/') : null))
	}

	return (
		<div className={`${styles.page__container}`}>
			<div className={`${styles.app__title__container}`}>
				<Image src='/app-logo.png' alt='login' height={64} width={64} />
				<h1 className={`${styles.app__title}`}>Net Chat</h1>
			</div>

			<div className={`${styles.login__container}`}>
				{!isLoginShowing && (
					<div className={`${styles.signup__form__container}`}>
						<h1 className={`${styles.signup__heading}`}>Sign Up</h1>

						<p className={`${styles.signup__subheading}`}>
							Create an account to get started
						</p>

						<form
							className={`${styles.signup__form}`}
							onSubmit={(e) => handleSignup(e)}
						>
							<input
								className={`${styles.signup__input} form__control`}
								type='text'
								placeholder='First Name'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								className={`${styles.signup__input} form__control`}
								type='text'
								placeholder='Last Name'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
							<input
								className={`${styles.signup__input} ${styles.username__input} form__control`}
								type='text'
								placeholder='Username'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
							<input
								className={`${styles.signup__input} ${styles.email__input} form__control`}
								type='text'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className={`${styles.signup__input} form__control`}
								type='text'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<input
								className={`${styles.signup__input} form__control`}
								type='text'
								placeholder='Confirm'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>

							<div className={`${styles.signup__button__container}`}>
								<button
									className={`${styles.signup__button}`}
									type='submit'
									onClick={() => handleSignup}
								>
									Sign Up
								</button>
							</div>
						</form>

						<p className={`${styles.login__text}`}>
							Already have an account?{' '}
							<a
								className={`${styles.login__link}`}
								onClick={() => handleLinkClick()}
							>
								Login
							</a>
						</p>
					</div>
				)}

				{isLoginShowing && (
					<div className={`${styles.login__form__container}`}>
						<h1 className={`${styles.login__heading}`}>Login</h1>
						<p className={`${styles.login__subheading}`}>Welcome back!</p>

						<form
							className={`${styles.login__form}`}
							onSubmit={(e) => handleLogin(e)}
						>
							<input
								className={`${styles.login__input} `}
								type='text'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className={`${styles.login__input} form__control`}
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<div className={`${styles.login__button__container}`}>
								<button className={`${styles.login__button}`} type='submit'>
									Login
								</button>
							</div>
						</form>

						{/* <p className={`${styles.forgot__password}`}>Forgot Password?</p> */}

						<p className={`${styles.signup__text}`}>
							Don&#39;t have an account?{' '}
							<a
								className={`${styles.signup__link}`}
								onClick={() => handleLinkClick()}
							>
								Sign Up
							</a>
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default LoginSignupForm
