import React from 'react'
import Navbar from './Navbar'
import { albumsData, artistData, songsData } from '../assets/assets'
import Album from './Album'
import Song from './Song'
import Artist from './Artist'

const Home = () => {
  return (
    <div>
       
        <div className='mb-4'>
            <p className='font-bold my-5 text-2xl'>Feature</p>
            <div className='flex overflow-auto'>
                {albumsData.map((item, index) => (
                    <Album key={index} name={item.name} desc={item.desc} 
                    image={item.image} id={item.id}></Album>
                ))}
            </div>
        </div>

        <div className='mb-4'>
            <p className='font-bold my-5 text-2xl'>Top Hits</p>
            <div className='flex overflow-auto'>
                {songsData.map((item, index) => (
                    <Song key={index} name={item.name} artist={item.artist} 
                    image={item.image} id={item.id}></Song>
                ))}
            </div>
        </div>

        <div className='mb-4'>
            <p className='font-bold my-5 text-2xl'>Artist</p>
            <div className='flex overflow-auto'>
                {artistData.map((item, index) => (
                    <Artist id={item.id} key={index} name={item.name} image={item.image}></Artist>
                ))}
            </div>
        </div>

    </div>
  )
}

export default Home