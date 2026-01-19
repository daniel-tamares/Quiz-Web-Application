import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getInfo } from '../redux/authSlice';
import MultipleChoice from './pages/MultipleChoice';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import ChooseInABox from './pages/ChooseInABox';
import Request from './Request';
import Header from './components/Header';
import SideBar from './components/SideBar';
import CreateQuestion from '../Admin/pages/CreateQuestion';
import Main from './components/Main';
import ViewAns from './pages/ViewAns';
import AvialableQuizzes from './pages/AvialableQuizzes';
import LineGraph from './grpah/LineGraph';
import Files from './pages/Files';

const StudentDashboard = () => {

    const [isOpened, setIsOpen] = useState(true);
    const { student } = useSelector( state => state.auth );
    const studentId = student?.id;
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(0);

    const handleLogout = (e) => {
        const res = dispatch( logout() );
        console.log(res);
    }

    useEffect(() => {
        const res = dispatch( getInfo() );
    }, [])

    const handleClosed = () => {
      setIsOpen(!isOpened);
    };


  return (

    <div className='bg-white'>
      <div className='flex h-screen'>

        <SideBar student={student} isOpen={isOpened}/>
        
        <div className='flex-1 flex flex-col'>
          <Header open={handleClosed} logout={handleLogout} student={student} />
          
          <main className='p-6 bg-white'>

            <button onClick={ (e) => setFilter(filter+1) }> Filter </button>

              <div style={ { height: '600px'} } className='p-4 bg-white-50 rounded items-center grow overflow-auto'>
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/multiple/:quiz_id' element={<MultipleChoice id={ studentId } filter={filter}  />} />
                  <Route path='/choice_box/:quiz_id' element={<ChooseInABox id={ studentId } filter={filter} />} />
                  <Route path='/view_ans/:quiz_id' element={<ViewAns id={ studentId } quiz_type={'M_C'} />} />
                  <Route path='/view_ans_M_C/:quiz_id' element={<ViewAns id={ studentId } quiz_type={'M_C'} />} />
                  <Route path='/view_ans_C_B/:quiz_id' element={<ViewAns id={ studentId } quiz_type={'C_B'} />} />
                  <Route path='/avail_quizzes' element={<AvialableQuizzes id={ studentId } year={student?.year} />} />
                  <Route path='/graph' element={<LineGraph />} />
                  <Route path='/files' element={<Files />} />
                </Routes>
              </div>
              
          </main>
        </div>

      </div>
    </div>

    // <div>

    //     <div>
    //         <h1> Welcome { studentId } { student?.username }  </h1>
    //         <br />
    //         <Request/>
    //         <br />
    //         <button onClick={handleLogout}> Logout </button>
    //     </div>

    //     <div>
    //         <NavLink to='/dashboard/'>Multiple Choice</NavLink><br />
    //         <NavLink to='/dashboard/choice_box'>Choice in the Box</NavLink>
    //     </div>

    //     <div>
    //         <br />
    //         <button onClick={ (e) => setFilter( filter + 1) } > Filter </button>
    //         <br />
            // <Routes>
            //     <Route path='/' element={<MultipleChoice id={ studentId } filter={filter}  />} />
            //     <Route path='/choice_box' element={<ChooseInABox id={ studentId }/>} />
            // </Routes>
    //     </div>
      
    // </div>
    
  )
}

export default StudentDashboard;
