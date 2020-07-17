import React, { useState } from "react"
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  // FormControlLabel,
  // Checkbox,
  // Box
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
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

export const Register = (props) => {
  const classes = useStyles()
  // const { history, location, match } = props
  const { history } = props.props
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [quote, setQuote] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await firebase.register(firstName, email, password)
      await firebase.addQuote(quote)
      history.replace("/profile")
    } catch (e) {
      console.log("error", e.message)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              fullWidth
              id="quote"
              label="Quote"
              name="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create Account
        </Button>
      </form>
    </Container>
  )
}
