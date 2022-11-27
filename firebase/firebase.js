// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBjDrOqMP0bRwy5qVbeD_IJ2qaKf0i9Ulk',
	authDomain: 'net-chat-95b07.firebaseapp.com',
	databaseURL: 'https://net-chat-95b07-default-rtdb.firebaseio.com',
	projectId: 'net-chat-95b07',
	storageBucket: 'net-chat-95b07.appspot.com',
	messagingSenderId: '435251235138',
	appId: '1:435251235138:web:838f7a2bdd46708b04a0db',
	measurementId: 'G-F2JLJEB5GG'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
