'use client'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { ChangeEvent, useState, useEffect, useContext } from 'react'
import AuthModalInputs from './AuthModalInputs'
import useAuth from '@/hooks/useAuth'
import { AuthenticationContext } from '../context/authContext'
import { Alert, CircularProgress } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { signin, signup } = useAuth()
  const { loading, data, error } = useContext(AuthenticationContext)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  })

  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) return setDisabled(false)
    } else {
      if (
        inputs.city &&
        inputs.email &&
        inputs.firstName &&
        inputs.lastName &&
        inputs.password &&
        inputs.phone
      )
        return setDisabled(false)
    }
  }, [inputs])
  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent
  }
  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose)
    } else {
      signup(inputs, handleClose)
    }
  }
  return (
    <div>
      <button
        className={`${
          isSignIn
            ? 'p-1 px-4 bg-blue-400 mr-3 text-white border rounded'
            : 'border p-1 rounded'
        }`}
        onClick={handleOpen}
      >
        {renderContent('Sign In', 'Sign Up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="px-2 py-24 h-[600px] flex items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent('Sign In', 'Create Account')}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    'Log Into Your Account',
                    'Create You OpenTable Account'
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignin={isSignIn}
                />
                <button
                  className="uppercase bg-red-600 text-white p-3 rounded text-sm mb-5 w-full disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent('Sign In', 'Create Account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
