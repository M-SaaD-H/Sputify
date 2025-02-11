import { PlaylistSkeleton } from '@/components';
import { ScrollArea } from '@/components/ui/scroll-area';
import { spotifyApi } from '@/lib/spotify';
import { useAuthStore } from '@/store/authStore'
import { ArrowRightIcon, HomeIcon, Library, MessageCircle, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function LeftSideBar() {
  const [albums, setAlbums] = useState();
  const { status } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true); // This isLoading is not same as of the store -> It is to display skeletons while fetching data from backend

  useEffect(() => {
    const fetchAlbums = () => {
      try {
        setIsLoading(true);

        const albumIds = '1WwkojG9sjMSrFVz4D51W0,10FLjwfpbxLmW8c25Xyc2N,013jUXOfDFXnDMBetTdsiH,7KIwUrSiA0gc9WlI7AYIfZ,4nZOPP0atfJbBlkedLYi7t,0a183xiCHiC1GQd8ou7WXO,0Rkv5iqjF2uenfL0OVB8hg,1poClftP5T3zRcqpsxPPfW,3BGU0BqGwBkYDHpfCWFm7I,5KF4xCxDD8ip003hoatFT9,5ZbqiWukRFxq8zwllvK3YT,3uuu6u13U0KeVQsZ3CZKK4'

        spotifyApi.get(`/albums/?ids=${albumIds}`) // This fetches albums using the Spoify's official API
        .then(res => res.data)
        .then(data => setAlbums(data.albums));

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching albums:', err);
      }
    };


    fetchAlbums();
  }, [status]);

  useEffect(() => {
    console.log('albums =', albums)
  }, [albums]);

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
              <div className='flex flex-col gap-5 m-2 mr-5'>
                {albums?.map((album, i) => (
                  <Link to={`/album/${album.id}`}>
                    <div key={i} className='w-full h-20 flex items-center gap-4 px-3 hover:bg-zinc-800 duration-200 rounded-lg'>
                      <div className='h-16 w-16 rounded-full overflow-hidden'><img className='h-full w-full object-cover' src={album.images[0].url} alt="" /></div>
                      <div>
                        <p>{album.name}</p>
                        <p className='text-sm opacity-65'>{album.artists?.[0].name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          }
        </ScrollArea>
      </div>
    </div>
  )
}

export default LeftSideBar