import { PlaylistSkeleton } from '@/components';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/store/authStore'
import { ArrowRightIcon, HomeIcon, Library, MessageCircle, Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function LeftSideBar() {
  const { status } = useAuthStore();

  const isLoading = true; // This isLoading is not same as of the store -> It is to display skeletons while fetching data from backend

  return (
    <div className='h-full w-full flex flex-col gap-3'>
      {/* Navigation menu */}
      <div className="flex flex-col rounded-lg bg-zinc-900/80 p-4">
        <Link to='/' className='flex items-center p-4 hover:bg-zinc-800 rounded-lg transition-colors duration-200'>
          <HomeIcon className='mr-2 size-5' />
          <span className='hidden md:inline'>Home</span>
        </Link>
        {
          status && (
            <Link to='/chat' className='flex items-center p-4 hover:bg-zinc-800 rounded-lg transition-colors duration-200'>
              <MessageCircle className='mr-2 size-5' />
              <span className='hidden md:inline'>Messages</span>
            </Link>
          )
        }
      </div>

      {/* Playlists */}

      <div className="flex-1 rounded-lg bg-zinc-900/80 p-4">
        <div>
          <Link to='/' className='flex items-center justify-between mx-4 my-2'>
            <div className='flex gap-2'>
              <Library className='mr-2 size-5' />
              <span className='hidden md:inline'>Playlist</span>
            </div>
            <div className='flex gap-2'>
              <Plus className='p-3 rounded-full size-11 hover:bg-zinc-800 transition-colors duration-200 hidden md:inline' />
              <ArrowRightIcon className='p-3 rounded-full size-11 hover:bg-zinc-800 transition-colors duration-200 hidden md:inline' />
            </div>
          </Link>
        </div>
        <ScrollArea className='h-[calc(100vh-370px)] w-full overflow-hidden space-y-2'>
          {
            isLoading ? (
              <PlaylistSkeleton />
            ) : (
              'Some Music'
            )
          }
        </ScrollArea>
      </div>
    </div>
  )
}

export default LeftSideBar