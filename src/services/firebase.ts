import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const database = firebase.database()
