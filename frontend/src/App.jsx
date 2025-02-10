import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoadingCard } from './components';

function App() {
  const { isLoading } = useAuthStore();

  if(isLoading) {
    return <LoadingCard />
  }

  return (
    <div className='h-screen w-screen bg-black text-white flex flex-col'>
      <Outlet />
    </div>
  )
}

export default App
