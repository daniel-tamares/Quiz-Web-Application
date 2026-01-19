import React from 'react';

const Header = ( { logout }) => {

  return (
     <header className='bg-violet-300 shadow p-4 flex justify-between items center'>

        <h1 className='text-xl'> Admin Only </h1>
        

        <div className='flex justify-between items center gap-4'>
          <h1 className='text-xl px-5'> Search </h1>
          <button onClick={ logout } className='text-sm rounded p-1 bg-violet-900 text-white'> Logout </button>
          <div className='bg-white h-14 w-14 border-blue border-t-transparent rounded-full'> </div>
        </div>

     </header>
  )
}

export default Header;
