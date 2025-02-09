import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { Input } from './index.js';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';

function SignupForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login, setLoading } = useAuthStore();

  const { register, handleSubmit } = useForm();

  const singup = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const res = await axiosInstance.post('/auth/register', data);

      if(res) {
        const user = res.data.data.user;

        login(user, user.isAdmin);
      }

      setLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error)
      setError(error.response?.data || error);
    }
  }

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='mx-auto w-full max-w-md rounded-lg p-3 border-black/5'>
        <h2 className='text-center text-3xl font-bold leading-tight'>Create an account</h2>
        <p className='mt-2 text-center text-base text-white/60'>Already have an account?
          <Link
            to="/login"
            className='font-medium text-primary transition-all duration-0-200 hover:underline ml-2'
          >Sign in</Link>
        </p>
        {
          error && <p className='text-red-600 mt-4 text-center'>{error.message}</p>
        }

        {/* Form */}

        <form onSubmit={handleSubmit(singup)} className='mt-10 space-y-6'>
          <div className='flex gap-3 w-full'>
            <Input
              placeholder="First name"
              required={true}
              className='w-full'
              {...register("firstName", {
                required: true
              })}
              />
            <Input
              className='w-full'
              placeholder="Last name"
              {...register("lastName")}
            />
          </div>
          <Input
            required={true}
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Email address must be a valid address"
              }
            })} // It is from the React Hook Form
          />
          <Input
            required={true}
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true
            })}
          />
          <Button type='submit' className='w-full py-5'>Create account</Button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm