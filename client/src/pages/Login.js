import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { setUser } from '../redux'
import { connect } from 'react-redux'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button, HelperText } from '@windmill/react-ui'
import axios from 'axios'
require('dotenv').config()

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const history = useHistory();

  const _handleKeyDown = event => {
    if (event.key === 'Enter') {
      console.log("Enter key pressed!!");
      signin();
    }

  }
  const signin = () => {
    const request = JSON.stringify({
      "username": username.trim(),
      "password": password
    })
    axios.post(process.env.REACT_APP_API_URL + "signin", request, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        localStorage.setItem("jwt", res.data.jwt.jwt)
        props.setUser(res.data.user)
        history.push('app')
      })
      .catch(error => {
        setError(true)
      })
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <Input className="mt-1" type="username" placeholder="Username" value={username} onChange={e => { setUsername(e.target.value); setError(false) }} onKeyDown={_handleKeyDown} />
              </Label>
              {error && !username ? <HelperText valid={false} > Please enter valid Username</HelperText> : ''}


              <Label className="mt-4">
                <Input className="mt-1" type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(false) }} onKeyDown={_handleKeyDown} />
              </Label>
              {error && !password ? <HelperText valid={false}> Please enter valid Password </HelperText> : ''}
              {error && username && password ? <HelperText valid={false}> Incorrect Username or Password </HelperText> : ''}

              <Button className="mt-4" block onClick={signin}>
                Log in
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)