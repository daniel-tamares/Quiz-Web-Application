import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  Bars3Icon,
  ChartBarIcon,
  BookmarkIcon,
  FolderIcon
} from "@heroicons/react/24/solid";

function SideBar( {student, isOpen} ) {

  // const [isOpen, setIsOpen] = useState(true);
    
  return (
  <aside className={`bg-violet-800 text-white flex flex-col transition-all duration-300 gap-4 ${isOpen ? "w-64 p-4" : "w-0 overflow-hidden"}`}>

    <div className='px-4 bg-white rounded justify-between items-center text-black'>
      <h2 className='text-3xl font-bold items-center p-4'> { student.username } </h2>
    </div>

    <div className='flex flex-col p-3 space-y-2'>
      <NavLink 
        to='/dashboard/' 
        className="flex items-center gap-2 hover:bg-violet-500 p-2 rounded"
      >
        <HomeIcon className="h-5 w-5 text-white" /> 
        <span className="text-white">Home</span>
      </NavLink>
      <NavLink 
        to='/dashboard/avail_quizzes' 
        className="flex items-center gap-2 hover:bg-violet-500 p-2 rounded"
      >
        <BookmarkIcon className="h-5 w-5 text-white" /> 
        <span className="text-white">Quizzes</span>
      </NavLink>
      <NavLink 
        to='/dashboard/graph' 
        className="flex items-center gap-2 hover:bg-violet-500 p-2 rounded"
      >
        <ChartBarIcon className="h-5 w-5 text-white" /> 
        <span className="text-white">Graph</span>
      </NavLink>
      <NavLink 
        to='/dashboard/files' 
        className="flex items-center gap-2 hover:bg-violet-500 p-2 rounded"
      >
        <FolderIcon className="h-5 w-5 text-white" /> 
        <span className="text-white">Files</span>
      </NavLink>
      {/* <NavLink to='/dashboard/avail_quizzes' className={'hover:bg-violet-500 p-2 rounded'}> Available </NavLink>
      <NavLink to='/dashboard/graph' className={'hover:bg-violet-500 p-2 rounded'}> Graph </NavLink> */}
    </div>

  </aside>
  )
}

export default SideBar;
