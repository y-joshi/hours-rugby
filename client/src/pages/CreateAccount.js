import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button, HelperText, Modal, ModalBody, ModalFooter, ModalHeader } from '@windmill/react-ui'
import axios from 'axios'
require('dotenv').config()


function Login() {
  const BLANK_FIELD = "Please fill this field!"
  const NOT_VALID = "Please enter valid "
  const PASS_LEN = 6
  const PASS_LEN_ERROR = "Your password must be at least 6 characters long."
  const PASS_NOT_MATCH = "Password not matched!"

  const [errors, setErrors] = useState({})
  const [fields, setFields] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    cpassword: ''
  })
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [validMail, setValidMail] = useState(true)
  const [validUsername, setValidUsername] = useState(true)

  const handleVaildation = () => {
    let valid = true
    let errors = {}

    //name
    if (!fields.name) {
      valid = false
      errors["name"] = BLANK_FIELD;
    }
    if (fields.name) {
      if (!fields.name.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)) {
        valid = false
        errors["name"] = NOT_VALID + "name! Only letters allowed"
      }
    }

    //email
    if (!fields.email) {
      valid = false
      errors["email"] = BLANK_FIELD;
    }

    if (fields.email) {
      let lastAtPos = fields.email.lastIndexOf('@');
      let lastDotPos = fields.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') == -1
        && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
        console.log("Invalid email");
        valid = false
        errors["email"] = NOT_VALID + "email!";
      }
    }


    //username
    if (!fields.username) {
      valid = false
      errors["username"] = BLANK_FIELD;
    }


    //password
    if (!fields.password) {
      valid = false
      errors["password"] = BLANK_FIELD;
    }
    if (fields.password && (fields.password.length < PASS_LEN)) {
      valid = false
      errors["password"] = NOT_VALID + "password!" + PASS_LEN_ERROR;
    }

    //confirm password
    if (!fields.cpassword) {
      valid = false
      errors["cpassword"] = BLANK_FIELD;
    }
    if (fields.password && fields.cpassword && (fields.password.length >= PASS_LEN) && (fields.password !== fields.cpassword)) {
      valid = false
      errors["cpassword"] = PASS_NOT_MATCH;
    }
    setErrors(errors)
    return valid
  }

  const handleSignup = () => {

    if (handleVaildation()) {
      const request = JSON.stringify({
        "username": fields.username.trim(),
        "password": fields.password,
        "email": fields.email,
        "name": fields.name
      })

      axios.post(process.env.REACT_APP_API_URL + "signup", request, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          setValidMail(true)
          setValidUsername(true)
          setIsModalOpen(true)
        })
        .catch(error => {
          if (error.response.data.username) setValidUsername(false)
          else setValidUsername(true)
          if (error.response.data.email) setValidMail(false)
          else setValidMail(true)

        })
    }

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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <Input className="mt-1" placeholder="Full Name" value={fields.name} onChange={e => { setFields({ ...fields, name: e.target.value }) }} />
              </Label>
              {errors.name ? <HelperText valid={false} > {errors.name}</HelperText> : ''}

              <Label>
                <Input className="mt-4" type="email" placeholder="Email" value={fields.email} onChange={e => { setFields({ ...fields, email: e.target.value }) }} />
              </Label>
              {errors.email ? <HelperText valid={false} > {errors.email}</HelperText> : ''}
              {!validMail ? <HelperText valid={false} > Email is already in use!</HelperText> : ''}

              <Label>
                <Input className="mt-4" placeholder="Username" value={fields.username} onChange={e => { setFields({ ...fields, username: e.target.value }) }} />
              </Label>
              {errors.username ? <HelperText valid={false} > {errors.username}</HelperText> : ''}
              {!validUsername ? <HelperText valid={false} > Username is already taken!</HelperText> : ''}

              <Label className="mt-4">
                <Input className="mt-1" placeholder="Password" type="password" value={fields.password} onChange={e => { setFields({ ...fields, password: e.target.value }) }} />
              </Label>
              {errors.password ? <HelperText valid={false} > {errors.password}</HelperText> : ''}

              <Label className="mt-4">
                <Input className="mt-1" placeholder="Confirm Password" type="password" value={fields.cpassword} onChange={e => { setFields({ ...fields, cpassword: e.target.value }) }} />
              </Label>
              {errors.cpassword ? <HelperText valid={false} > {errors.cpassword}</HelperText> : ''}

              <Button block className="mt-8" onClick={handleSignup}>
                Create account
              </Button>

              <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); history.push('login') }}>
                <ModalHeader>Hi {fields.name}</ModalHeader>
                <ModalBody>
                  Your account created successfully!
                </ModalBody>
                <ModalFooter>

                  <div className="hidden sm:block">
                    <Button layout="outline" onClick={() => { setIsModalOpen(false); history.push('login') }}>
                      OK
                    </Button>
                  </div>
                  <div className="block w-full sm:hidden">
                    <Button block size="large">
                      Accept
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>


              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
export default Login
