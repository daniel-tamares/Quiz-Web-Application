import React from 'react';
import { Bars3Icon, ArrowRightOnRectangleIcon, PowerIcon  } from '@heroicons/react/24/solid';

const Header = ( { open, logout, student }) => {

  return (
     <header className='bg-violet-500 shadow p-4 flex justify-between items center'>

        {/* <h1 className='text-xl'> Admin Only {student.year} </h1> */}

        <div className='p-4'>
          <Bars3Icon className='w-10 h-10 bg-white py-1 px-2 rounded' onClick={() => open()}/>
          {/* <button onClick={() => open()} className='bg-violet-900 py-1 px-2 rounded' > Close </button> */}
        </div>
        

        <div className='flex justify-between items-center gap-4'>
          <button onClick={ logout } className='text-sm rounded font-bold w-12 h-12'> <PowerIcon className='w-10 h-10 bg-white text-black p-2 rounded' /> </button>
          <div className='bg-white h-14 w-14 border-blue border-t-transparent rounded-full'>
            <img className='bg-white h-14 w-14 border-blue border-t-transparent rounded-full' srcSet={student.profile_url} alt="" />
          </div>
        </div>

     </header>
  )
}

export default Header;
