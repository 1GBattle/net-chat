import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import LoginSignupForm from '../components/LoginSignupForm'

const login: NextPage = () => {
	return (
		<div>
			<LoginSignupForm />
		</div>
	)
}

export default login
