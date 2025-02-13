import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore'
import { HeadphonesIcon, Users } from 'lucide-react';
import React, { useEffect } from 'react'

const LoginPrompt = () => (
  <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
    <div className='relative'>
      <div
        className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
        aria-hidden='true'
      />
      <div className='relative bg-zinc-900 rounded-full p-4'>
        <HeadphonesIcon className='size-8 text-emerald-400' />
      </div>
    </div>

    <div className='space-y-2 max-w-[250px]'>
      <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
      <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
    </div>
  </div>
);

function RightSidebar() {
  const { status } = useAuthStore();
  const { users, fetchUsers, isLoading } = useChatStore();

  if(!status) return (
    <div className='bg-zinc-900/80 h-full w-full rounded-lg p-8'><LoginPrompt /></div>
  )
  
  useEffect(() => {
    if(status) fetchUsers();
  }, [status, fetchUsers]);

  return (
    <div className='bg-zinc-900/80 h-full w-full rounded-lg flex flex-col p-4'>
      <div className="flex items-center gap-4 my-4 mx-2">
        <Users className='size-6 shrink-0' />
        <h2 className='font-semibold'>What they are listening to</h2>
      </div>
      <hr />
      <ScrollArea className='flex-1 mt-4'>
        <div className='space-y-2'>
          {
            users?.map(user => (
              <div key={user._id} className='cursor-pointer hover:bg-zinc-800/50 p-4 rounded-md transition-colors group flex items-center gap-5'>
                <div className='relative w-max'>
                  <Avatar className='size-10 border border-zinc-800'>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.fullName.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-zinc-500' aria-hidden='true' />
                </div>
                <p className='font-semibold'>{user.fullName.firstName}</p>
              </div>
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}

export default RightSidebar
