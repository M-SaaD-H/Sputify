import React, { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { LeftSideBar, RightSidebar } from './pages'
import { useAuthStore } from './store/authStore';
import { LoadingCard, TopBar } from './components';
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  const { isLoading } = useAuthStore();

  if(isLoading) {
    return <LoadingCard />
  }

  return (
    <div className='h-screen w-screen bg-black text-white flex flex-col'>
      <TopBar />
      <ResizablePanelGroup direction='horizontal' className='flex flex-1 gap-1 h-full p-2 overflow-hidden'>

        {/* Left Side Component */}
        <ResizablePanel defaultSize={25} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className='w-1 my-4 hover:bg-white/70 bg-black rounded-lg transition-colors' />

        {/* Main Component */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className='w-1 my-4 hover:bg-white/70 bg-black rounded-lg transition-colors' />

        {/* Right Side Component */}
        <ResizablePanel defaultSize={25} minSize={0} maxSize={25} collapsedSize={0}>
          <RightSidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Layout
