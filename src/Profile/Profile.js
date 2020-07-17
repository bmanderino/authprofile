import React, { useState, useEffect } from "react"
import {
  Paper,
  Avatar,
  CircularProgress,
  Container,
  CssBaseline,
  Button,
} from "@material-ui/core"
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined"
import { makeStyles } from "@material-ui/core/styles"

import firebase from "../firebase"

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const Profile = (props) => {
  const classes = useStyles()
  // const { history, location, match } = props
  const { history } = props
  const [profile, setProfile] = useState()

  if (!firebase.getUserName()) {
    alert("please log in")
    props.history.replace("/login")
  }
  const [quote, setQuote] = useState()

  useEffect(() => {
    firebase.getCurrentUserQuote().then((val) => setQuote(val))
    setProfile(firebase.getUserProfile())
    console.log(profile)
  }, [profile])

  const handleSignout = () => {
    firebase.logout()
    history.replace("/login")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        {firebase.getUserName()}
        {quote ? `${quote}` : <CircularProgress />}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </Paper>
    </Container>
  )
}
