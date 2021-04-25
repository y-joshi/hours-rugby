import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { setEmail, setUsername } from '../redux'
import { connect } from 'react-redux'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'

const signin = (username,password) => {

}

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
                <Input className="mt-1" type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              </Label>
              <Label className="mt-4">
                <Input className="mt-1" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Label>

              <Button className="mt-4" block onClick={() => signin(username,password)}>
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
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsername: username => dispatch(setUsername(username))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)