import React, { useEffect } from 'react'
import Register from './User/Register';
import Login from './User/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentDashboard from './User/StudentDashboard';
import ProtectedRoute from './redux/ProtedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from './redux/authSlice';
import AddQuiz from './Admin/pages/AddQuiz';
import CreateQuestions from './Admin/pages/CreateQuestion';
import CreateQuestion from './Admin/pages/CreateQuestion';
import MultipleChoice from './User/pages/MultipleChoice';
import ChooseInABox from './User/pages/ChooseInABox';
import CreateEnumeration from './Admin/pages/CreateEnumeration';
import CreateChooseInAbox from './Admin/pages/CreateChooseInAbox';
import AdminDashbard from './Admin/AdminDashbard';

const App = () => {

  const dispatch = useDispatch();
  const { islogin } = useSelector( ( state ) => state.auth );

  useEffect( () => {
    dispatch( getInfo() );
  }, [islogin] );

  return (
    <Router>
      <Routes>

        {/* student */}
        <Route path='/' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/dashboard/*' element={
          <ProtectedRoute>
            <StudentDashboard/>
          </ProtectedRoute>
        } />
        <Route path={ '*' } element={ <Login/> } />

        {/* quiz admin */}
        <Route path='add_quiz' element={ <AddQuiz/> } />

        {/* admin questions */}
        <Route path='add_question' element={ <CreateQuestion /> } />
        <Route path='add_enumation' element={ <CreateEnumeration/> } />
        <Route path='add_choose_box' element={ <CreateChooseInAbox/> } />

        {/* student questions */}
        {/* <Route path='multiple_choice' element={ <MultipleChoice /> } />
        <Route path='choice_box' element={ <ChooseInABox /> } /> */}

        {/* admin only */}

        <Route path='/admin/*' element={ <AdminDashbard/> } />

      </Routes>
    </Router>
    


  )
}

export default App;
