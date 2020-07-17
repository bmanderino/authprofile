import app from "firebase/app"
import "firebase/auth"
import "firebase/firebase-firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDLAOrldniWExAHjN0-x6x00hRLBNkzdtw",
  authDomain: "authprofile-44e65.firebaseapp.com",
  databaseURL: "https://authprofile-44e65.firebaseio.com",
  projectId: "authprofile-44e65",
  storageBucket: "authprofile-44e65.appspot.com",
  messagingSenderId: "404398943047",
  appId: "1:404398943047:web:9d50944f17850728e13a62",
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  isInit() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({ displayName: name })
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert("not authorized")
    }
    return this.db
      .doc(`users/${this.auth.currentUser.uid}`)
      .set({ quote: quote })
  }

  getUserName() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  getUserProfile() {
    return this.auth.currentUser && this.auth.currentUser
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
    return quote.get("quote")
  }
}

export default new Firebase()
