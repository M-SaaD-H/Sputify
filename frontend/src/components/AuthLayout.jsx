import { LoginForm } from '@/components'
import React from 'react'

function AuthLayout({ children }) {
  return (
    <div className='flex'>
    <div className='h-screen w-[50%] overflow-hidden p-3'>
      <img className='h-full w-full object-cover rounded-lg' src="assets/login.webp" alt="" />
    </div>
    <div className='w-[50%] h-screen flex items-center justify-center'>
      {children}
    </div>
    </div>
  )
}

export default AuthLayout
