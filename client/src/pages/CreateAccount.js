import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button, HelperText, Modal, ModalBody, ModalFooter, ModalHeader } from '@windmill/react-ui'
import axios from 'axios'
require('dotenv').config()


function Login() {
  const BLANK_FIELD = "Please fill this field!"
  const NOT_AVAIL = " is not available!"
  const NOT_VALID = "Please enter valid "
  const PASS_LEN = "Your password must be at least 6 characters long."
  const PASS_NOT_MATCH = "Password not matched!"

  const [errors, setErrors] = useState({
    "name": '',
    "email": '',
    "username": '',
    "password": '',
    "cpassword": ''
  })
  const [fields, setFields] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    cpassword: ''
  })
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVaildation = () => {
    let valid = true
    let errors = {
      "name": '',
      "email": '',
      "username": '',
      "password": '',
      "cpassword": ''
    }

    //name
    if (!fields.name) {
      valid = false
      errors["name"] = BLANK_FIELD;
      // setErrors({ ...errors, "name": BLANK_FIELD })
    }
    if (fields.name) {
      if (!fields.name.match(/^[a-zA-Z]+$/)) {
        valid = false
        errors["name"] = NOT_VALID + "name! Only letters allowed"
      }
    }

    //email
    if (!fields.email) {
      valid = false
      errors["email"] = BLANK_FIELD;
      //setErrors({ ...errors, "email": BLANK_FIELD })
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
      // setErrors({ ...errors, "username": BLANK_FIELD })

    }


    //password
    if (!fields.password) {
      valid = false
      errors["password"] = BLANK_FIELD;
      //setErrors({ ...errors, password: BLANK_FIELD })

    }
    if (fields.password && (fields.password.length < 6)) {
      valid = false
      errors["password"] = NOT_VALID + "password!" + PASS_LEN;
    }

    //confirm password
    if (!fields.cpassword) {
      valid = false
      errors["cpassword"] = BLANK_FIELD;
      // setErrors({ ...errors, cpassword: BLANK_FIELD })

    }
    if (fields.password && fields.cpassword && (fields.password.length >= 6) && (fields.password !== fields.cpassword)) {
      console.log("Pass not match!");
      valid = false
       errors["cpassword"] = PASS_NOT_MATCH;
    }
    setErrors(errors)

    //check username
    if (fields.username && !errors["username"]) {
      axios.get(process.env.REACT_APP_API_URL + `check/username/${fields.username}`)
        .catch(err => {
          console.log(err.response.status);
          valid = false
          // errors["username"] = "This username" + NOT_AVAIL
          setErrors({ ...errors, "username": "This username" + NOT_AVAIL })
        })
    }
    //check email
    if (fields.email && !errors["email"]) {
      axios.get(process.env.REACT_APP_API_URL + `check/email/${fields.email}`)
        .catch(err => {
          console.log(err.response.status);
          valid = false
          // errors["email"] = "This email" + NOT_AVAIL
          setErrors({ ...errors, "email": "This email" + NOT_AVAIL })

        })
    }
    console.log(errors);
    return valid
  }
  const signup = () => {
    if (handleVaildation()) {
      console.log("HERER TO CALL API");
      const request = JSON.stringify({
        "username": fields.username,
        "password": fields.password,
        "email": fields.email,
        "name": fields.name
      })
      setIsModalOpen(true)
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


              <Label>
                <Input className="mt-4" placeholder="Username" value={fields.username} onChange={e => { setFields({ ...fields, username: e.target.value }) }} />
              </Label>
              {errors.username ? <HelperText valid={false} > {errors.username}</HelperText> : ''}

              <Label className="mt-4">
                <Input className="mt-1" placeholder="Password" type="password" value={fields.password} onChange={e => { setFields({ ...fields, password: e.target.value }) }} />
              </Label>
              {errors.password ? <HelperText valid={false} > {errors.password}</HelperText> : ''}


              <Label className="mt-4">
                <Input className="mt-1" placeholder="Confirm Password" type="password" value={fields.cpassword} onChange={e => { setFields({ ...fields, cpassword: e.target.value }) }} />
              </Label>
              {errors.cpassword ? <HelperText valid={false} > {errors.cpassword}</HelperText> : ''}

              <Button block className="mt-8" onClick={signup}>
                Create account
              </Button>

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>Modal header</ModalHeader>
                <ModalBody>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendi repudiandae
                  voluptatem tempore!
                </ModalBody>
                <ModalFooter>

                  <div className="hidden sm:block">
                    <Button layout="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                  <div className="hidden sm:block">
                    <Button>Accept</Button>
                  </div>
                  <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
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
