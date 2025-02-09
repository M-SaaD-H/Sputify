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
    <>
    {/* Left Component */}
    <Outlet />
    {/* Right Component */}
    </>
  )
}

export default App
