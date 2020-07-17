import React, { useState, useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CssBaseline, CircularProgress } from "@material-ui/core"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import { Home } from "./Home"
import { Login, Register, SignIn } from "./Auth"
import firebase from "./firebase"
import { Profile } from "./Profile"

const theme = createMuiTheme()

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false)

  useEffect(() => {
    firebase.isInit().then((val) => {
      setFirebaseInit(val)
    })
  })

  return firebaseInit !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  )
}

export default App
