import React from 'react';
import AddQuiz from './pages/AddQuiz';
import CreateQuestion from './pages/CreateQuestion';
import CreateEnumeration from './pages/CreateEnumeration';
import CreateChooseInAbox from './pages/CreateChooseInAbox';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import StudentRequest from './pages/StudentRequest';
import DeployQuiz from './pages/DeployQuiz';
import GetStudentRequest from './pages/GetStudentRequest';
import UploadFile from './pages/UploadFile';

const AdminDashbard = () => {

  return (
    <div className='bg-white'>
      <div className='flex h-screen'>

        <Sidebar/>
        
        <div className='flex-1 flex flex-col'>
          <Header/>
          
          <main className='p-6 bg-white'>

              <div style={ { height: '600px'} } className='p-4 bg-white-50 rounded items-center grow overflow-auto'>
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/add_quiz' element={<AddQuiz/>} />
                  <Route path='/add_question' element={<CreateQuestion />} />
                  <Route path='/add_enumation' element={<CreateEnumeration />} />
                  <Route path='/add_choose_box' element={<CreateChooseInAbox />} />
                  {/* <Route path='/student_request' element={<StudentRequest />} /> */}
                  <Route path='/deploy_quiz' element={<DeployQuiz />} />
                  <Route path='/student_request' element={<GetStudentRequest />} />
                  <Route path='/upload_file' element={<UploadFile />} />
                </Routes>
              </div>
              
          </main>
        </div>

      </div>
    </div>
  )
}

export default AdminDashbard;
