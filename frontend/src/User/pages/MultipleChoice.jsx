import React, { useEffect, useState } from 'react';
import { fetchQuestions, requestQuestions, submitAsnwer } from '../actions';
import { Link, NavLink, useParams } from 'react-router-dom';
import Request from '../Request';
import ChooseInABox from './ChooseInABox';
import { useDispatch, useSelector } from 'react-redux';
import ViewAns from './ViewAns';

const MultipleChoice = ( {id, filter} ) => {

    const {quiz_id} = useParams();

    const { student } = useSelector( state => state.auth );
    const studentId = student?.id;
    const dispatch = useDispatch();

    const [questions, setQuestions] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [studentAns, setStudentAns] = useState({});
    const [quizId, setQuizId] = useState(null);
    const [quizType, setQuizType] = useState('M_C');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [answer, setAnswer] = useState( () => {
        const savedAns = localStorage.getItem('ans');
        return savedAns ? JSON.parse(savedAns) : {};
    } );

    const [currentPage, setCurrentPage] = useState( () => {
        const i = localStorage.getItem('index');
        return i ? parseInt(i) : 1;
    } );

    useEffect( () => {
        getQuestions();
    }, [currentPage, filter]);

    const getQuestions = async () => {
        setLoading(true);
        try {
            // const res = await fetchQuestions(currentPage);
            const res = await requestQuestions(currentPage, quiz_id);

            setQuestions(res?.questions?.data);
            setLastPage(res?.questions?.last_page);
            setTotal(res?.questions?.total);
            setQuizId(res?.quizId);
            setMessage(res?.message);
            console.log(res);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const changeAnswer = (id, option) => {
        const updatedAnswer = { ...answer, [id]: option };
        setAnswer(updatedAnswer);
        localStorage.setItem('ans', JSON.stringify(updatedAnswer) );
    };

    const handleSubmit = async (e) => {
        try {
            const res = await submitAsnwer(answer, total, id, quizId, quizType);
            localStorage.removeItem('num');
            getQuestions();
            console.log(res);

            setStudentAns(res?.student?.answers)
        } catch (error) {
            console.log(error);
        }
    };

    const next = (e) => {
        const updatedIndex = currentPage + 1;
        setCurrentPage(updatedIndex);
        localStorage.setItem('index', updatedIndex);
        console.log(localStorage.getItem('index'));
    };

    const prev = (e) => {
        const updatedIndex = currentPage - 1;
        setCurrentPage(updatedIndex);
        localStorage.setItem('index', updatedIndex);
        console.log(localStorage.getItem('index'));
    };

    if ( message === 'Done' ) {
        return <div> 
                    <h1> Already submitted </h1>
                    <ViewAns id={studentId} quiz_type={'M_C'} />
                    {/* <NavLink to={`/dashboard/view_ans_M_C/${quiz_id}`} className='bg-violet-700 text-white px-3 py-1 rounded'> Ans </NavLink> */}
                    <NavLink to={`/dashboard/view_ans_C_B/${quiz_id}`} className='bg-violet-700 text-white px-3 py-1 rounded'> Ans </NavLink>
                </div>
    }

    if ( message === 'denied' ) {
        return <div> 
                    <h1> Send request for Quiz </h1>
                    <Request/>
                </div>
    }

    if ( message === 'Not yet' ) {
        return <ChooseInABox id={studentId} filter={filter}/>
    }

    if ( message === 'unapproved' ) {
        return <div> <h1> No admin approval </h1> </div>
    }

    if (loading) {
        return <div className='w-64 mt-8 mx-auto p-6 items-center justify-center'>
                    <div className='w-64 h-64 border-8 border-blue-400 border-t-transparent rounded-full p-4 animate-spin'> </div>
                </div> ;
    }

  return (
    <div className='bg-indigo-100 p-4 rounded'>

        {
            message === 'Not yet' && (<Link to={`/dashboard/choice_box/${quiz_id}`} className={'hover:bg-violet-500 p-2 rounded'}> Go to part 2 </Link>)
        }

        <Link to={`/dashboard/choice_box/${quiz_id}`} className={'hover:bg-violet-500 p-2 rounded underline text-indigo-800'}> Go to part 2 </Link>

        {/* <h1> {id} {quizId} {message} { "asfdfas" + quiz_id} </h1> */}

        <div className=''>
            <div className='text-black text-xl font-semibold'>
                <p> Choose the correct answer. </p>
            </div>
            {/* { JSON.stringify(studentAns, null, 2) } { studentAns[25] } {answer[21]}
            <h2> Choice the correct answer </h2> */}
            <br />
            <input type="range" onChange={ (e) => '' } value={ Object.keys(answer).length } max={total} name="" id="" />

            <div className='gap-4'>{
                questions?.map( ( item, index ) => (
                    <div key={index} className='flex flex-col bg-white p-4 gap-4 rounded mb-4'>
                        <h3 className='font-semibold'> { index + 1 } {item.question} </h3>
                        <div className='flex'>
                            <span className='w-full items-center justify-center flex sm:flex-col md:flex-row gap-4 flex-row border border-black p-4 rounded'>
                            {
                                item?.options?.map( (option, i) => (
                                    <label className={`w-full flex gap-4 items-center p-2 rounded shadow-md text-black border border-black ${option === answer[item.id] ? "bg-indigo-200 border border-indigo-900 text-violet-950 shadow-xl font-semibold" : "bg-white" }`} key={i}>
                                        <input
                                        className=''
                                        name={`q_${item.id}`}
                                        type='radio'
                                        value={ option }
                                        checked={ option === answer[item.id] }
                                        onChange={ (e) => changeAnswer( item.id, option ) }
                                        />
                                        { option }
                                    </label>
                                ) )
                            }
                            </span>
                        </div>
                    </div>
                ) )
            }</div>

            <br />
            {/* <button disabled={currentPage === 1} onClick={ prev }> Prev </button> */}

            <div className='p-2 space-x-2'>
                {
                    currentPage !== 1 &&
                    <button className='rounded p-1 bg-violet-900 text-white text-sm' disabled={currentPage === 1} onClick={ prev }> Prev </button>
                }

                {
                    currentPage < lastPage &&
                    <button className='rounded p-1 bg-indigo-900 text-white text-sm' disabled={ lastPage === currentPage } onClick={ next }> Next </button>
                }

                {
                    Object.keys(answer).length === total &&
                    <button className='rounded p-1 bg-indigo-900 text-white text-sm' onClick={ handleSubmit }> Submit </button>
                }
            </div>
            
            {/* { JSON.stringify(answer, null, 2) } {parseInt(lastPage)} key: { Object.keys(answer).length } */}

        </div>
      
    </div>
  )
}

export default MultipleChoice;
