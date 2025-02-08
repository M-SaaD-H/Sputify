import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    {/* Left Component */}
    <Outlet />
    {/* Right Component */}
    </>
  )
}

export default App
