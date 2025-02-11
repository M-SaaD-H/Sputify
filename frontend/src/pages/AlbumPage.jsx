import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { spotifyApi } from '@/lib/spotify';
import { Clock, Dot, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000); // Convert ms to minutes
  const seconds = ((ms % 60000) / 1000).toFixed(0); // Get remaining seconds

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Ensure 2-digit seconds
};


function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);

  const fetchAlbum = () => {
    spotifyApi.get(`/albums/${albumId}`)
    .then(res => res.data)
    .then(data => setAlbum(data));

    spotifyApi.get(`/albums/${albumId}/tracks`)
    .then(res => res.data)
    .then(data => setSongs(data.items));
  }

  useEffect(() => {
    if(albumId) {
      fetchAlbum();
    }
  }, [albumId])
  
  return (
    <div className='h-full w-full rounded-lg overflow-hidden'>
      <ScrollArea className='h-full w-full'>
        <div className='relative min-h-full'>
          {/* bg gradient */}
          <div className='absolute h-full inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none' aria-hidden='true' />

          {/* Content */}

          {/* Album Details */}
          <div className='relative z-10'>
            <div className="w-full flex p-8 gap-6 pb-8">
              <div className='h-60 w-60 rounded-xl overflow-hidden shadow-lg shadow-black'><img className='h-full w-full object-cover' src={album.images?.[0].url} alt="" /></div>
              <div className='flex flex-col justify-center'>
                <p>Album</p>
                <h1 className='text-6xl font-extrabold'>{album?.name ? album.name : ''}</h1>
                <p className='flex my-4 font-semibold'>{album?.artists?.[0]?.name} <Dot /> <span className='opacity-75 flex'>{album?.release_date?.split('-')?.[0]} <Dot /> {album?.total_tracks} songs</span></p>
              </div>
            </div>
            {/* Play button */}
            <div className='px-6 pb-4 flex items-center gap-6'>
              <Button
                size='icon'
                className='w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 transition-all shadow-lg shadow-black'
              >
                <Play fill='black' className='h-7 w-7 text-black' />
              </Button>
            </div>

            {/* Table Section */}
            <div className='bg-black/20 backdrop-blur-sm'>
              {/* Table Header */}
              <div className='grid grid-cols-[24px_4fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5'>
								<div>#</div>
								<div>Title</div>
								{/* <div>Released Date</div> */}
								<div className='ml-2'>
									<Clock className='h-4 w-4' />
								</div>
							</div>

              {/* Song List */}

              <div className=' py-4'>
                {
                  songs?.map((song, i) => (
                    <div key={song.id} className='grid grid-cols-[24px_4fr_1fr] gap-4 mx-2 h-16 items-center px-6 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer'>
                      <div className='flex items-center justify-center'>
                        <span className='group-hover:hidden'>{i+1}</span>
                        <Play fill='#A1A1AA' className='h-4 w-4 hidden group-hover:block' />
                      </div>
                      <div>
                      <p className='mx-2 text-white'>{song.name}</p>
                      <p className='mx-2'>{song.artists?.[0]?.name}</p>
                      </div>
                      {/* <p className='mx-2'>{album.release_date}</p> */}
                      <p>{formatDuration(song.duration_ms)}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPage
