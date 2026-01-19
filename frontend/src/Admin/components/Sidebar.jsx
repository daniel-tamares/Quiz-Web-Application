import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UsersIcon, HomeIcon, BookOpenIcon, PencilSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

function SideBar() {

  const [isOpen, setIsOpen] = useState(false);
    
  return (
  <aside className='w-64 bg-violet-800 text-white flex flex-col p-4'>

    <div className='px-4 bg-white rounded justify-between items-center text-black'>
      <h2 className='text-3xl font-bold items-center p-4'> Admin </h2>
    </div>
    <br />

    <div className='flex flex-col p-3 gap-4'>
      <NavLink className={` flex p-1 text-white rounded hover:bg-violet-500`} to='/admin/'>
        <HomeIcon className='w-5 h-5 mr-2'/>
        Home
      </NavLink>
      <NavLink className="flex p-1 text-white rounded hover:bg-violet-500" to='/admin/add_quiz'>
        <BookOpenIcon className='w-5 h-5 mr-2'/>
        Create Quiz
      </NavLink>

    <div className='relative'>
      <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex p-1 text-white rounded w-full hover:bg-violet-500"
          >
        <PencilSquareIcon className='w-5 h-5 mr-2'/>
        Create Questions
      </button>
      {
        isOpen && (
          <div className='absolute mt-2 right-0 bg-white p-2 rounded text-black shadow text-black text-sm'>
            <NavLink
            onClick={() => setIsOpen(!isOpen)}
            to='/admin/add_question'
            className="block px-4 py-2 hover:bg-violet-200"
            >
              Multiple Choice
            </NavLink>
            <NavLink
            to='/admin/add_choose_box'
            className="block px-4 py-2 hover:bg-violet-200"
            >
              Choice Box
            </NavLink>
            <NavLink
            to='/admin/add_enumation'
            className="block px-4 py-2 hover:bg-violet-200"
            >
              Enumeration
            </NavLink>
          </div>
        )
      }
    </div>
      <NavLink className="flex p-1 text-white rounded hover:bg-violet-500" to='/admin/student_request'>
        <UsersIcon className='w-5 h-5 mr-2'/>
         Student Request
      </NavLink>
      <NavLink className="flex p-1 text-white rounded hover:bg-violet-500" to='/admin/deploy_quiz'>
        <CalendarDaysIcon className='w-5 h-5 mr-2'/>
        Quizzes
      </NavLink>
      <NavLink className="flex p-1 text-white rounded hover:bg-violet-500" to='/admin/upload_file'>
        <CalendarDaysIcon className='w-5 h-5 mr-2'/>
        Quizzes
      </NavLink>

    </div>

  </aside>
  )
}

export default SideBar;

