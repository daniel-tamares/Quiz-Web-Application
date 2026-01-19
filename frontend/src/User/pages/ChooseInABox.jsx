import React, { useEffect, useState } from 'react';
import { fetchChooseBox, fetchQuestions, requestChooseBox, submitAsnwer } from '../actions';
import { Link, NavLink, useParams } from 'react-router-dom';
import Request from '../Request';
import ViewAns from './ViewAns';

const ChooseInABox = ( {id, filter } ) => {

    const { quiz_id } = useParams();

    const studentId = id;
    const [answers, setAnswer] = useState( () => {
        const savedAns = localStorage.getItem('b_ans');
        return savedAns ? JSON.parse(savedAns) : {};
    } );

    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [total, setTotal] = useState(null);
    const [quizId, setQuizId] = useState(null);
    const quizType = "C_B";
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect( () => {
        getQuestions();
    },[filter] );

    const getQuestions = async () => {
        setLoading(true);
        try {
            const res = await requestChooseBox(page, quiz_id);

            setQuestions(res?.questions?.data);
            setTotal(res?.questions?.total)
            setQuizId(res?.quizId);
            setMessage(res?.message);
            console.log(quizId);
            console.log(res);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const changeAnswer = (ans) => {
        const updatedAnswer = { ...answers, [currentIndex]: ans };
        setAnswer(updatedAnswer);
        localStorage.setItem('b_ans', JSON.stringify(updatedAnswer));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        try {
            const res = await submitAsnwer(answers, total, studentId, quizId, quizType);
            localStorage.removeItem('b_ans')
            console.log(res);
            getQuestions();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div className='w-64 mt-8 mx-auto p-6 items-center justify-center'>
                    <div className='w-64 h-64 border-8 border-blue-400 border-t-transparent rounded-full p-4 animate-spin'> </div>
                </div> ;
    }

    if ( message === 'Done' ) {
        return <div> 
                    <h1> Already submitted </h1>
                    <ViewAns id={studentId} quiz_type={'M_C'} />
                    <Link to={`/dashboard/view_ans_M_C/${quiz_id}`} className='bg-violet-700 text-white px-3 py-1 rounded'> Ans </Link>
                    <Link to={`/dashboard/view_ans_C_B/${quiz_id}`} className='bg-violet-700 text-white px-3 py-1 rounded'> Ans </Link>
                </div>
    }

    if ( message === 'denied' ) {
        return <div> 
                    <h1> Send request for Quiz </h1>
                    <Request/>
                </div>
    }

  return (

    <div className='bg-violet-50 p-6'>

        <h1> Choose in the box </h1>
        
        <h1> {id} {quizId} {"dfsafdf" + quiz_id} </h1>
        
        <div className='flex flex-row flex-wrap border-2 border-blue-900 p-4 text-violet-900 gap-4'> {
            questions?.map( (item, i) => (
                <span className='flex flex-wrap flex-items bg-white-100 rounded gap-4' key={i}>

                    {
                        item?.options?.map( (option, index) => (
                            <button className='flex flex-wrap flex-items bg-indigo-100 px-2 py-1 border-2 border-indigo-900 rounded hover:bg-violet-300 hover:text-black' key={index} disabled={ currentIndex === null } onClick={ () => { changeAnswer(option) } } > { option } </button>
                        ) )
                    }
                </span>
            ) )
        } </div>

        <h2> Questions: Choose the correct answer </h2>

        <div className='flex flex-col p-4 gap-6'> {
            questions?.map( (item, i) => (
                <span className='font-semibold flex flex-item bg-indigo-100 p-4 rounded gap-6' key={i + 1}>
                    <h4>
                        <input className='border-2 border-b-indigo-900 bg-indigo-100 focus:bg-white' key={item.id + 3} onChange={ (e) => e.target.value } onFocus={ (e) => setCurrentIndex(item.id) } value={ answers[item?.id] ?? '' } type="text" />
                        { (i + 1) + ". " } { " " + item?.question }
                    </h4>
                </span>
            ) )
        } </div>

        <br />
        <button onClick={handleSubmit}> Submit </button>

        { currentIndex } <br />
        { JSON.stringify(answers, null, 2) }

    </div>
      
  )
}

export default ChooseInABox;
