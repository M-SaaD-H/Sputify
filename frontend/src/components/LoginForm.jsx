import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from './index.js'
import { Button } from './ui/button.jsx';
import { axiosInstance as axios } from '@/lib/axios.js';
import { useAuthStore } from '@/store/authStore.js';

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { login } = useAuthStore();

  const { register, handleSubmit } = useForm();

  const loginHanlder = async (data) => {
    setError(null);

    try {
      const res = await axios.post('/auth/login', data);

      if(res) {
        const user = res.data.data.user;

        login(user, user.isAdmin);
      }

      navigate('/');
    } catch (error) {
      console.log(error)
      setError(error.response?.data || error);
    }
  }

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='mx-auto w-full max-w-md rounded-lg p-3 border-black/5'>
        <h2 className='text-center text-3xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-white/60'>Don't have any account?
          <Link
            to="/signup"
            className='font-medium text-primary transition-all duration-0-200 hover:underline ml-2'
          >Sign Up</Link>
        </p>
        {
          error && <p className='text-red-600 mt-4 text-center'>{error.message}</p>
        }

        {/* Form */}

        <form onSubmit={handleSubmit(loginHanlder)} className='mt-10 space-y-6'>
          <Input
            required={true}
            placeholder="Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Email address must be a valid address"
              }
            })}
          />
          <Input
            required={true}
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true
            })}
          />
          <Button type='submit' className='w-full py-5'>Log in</Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
