import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../../Admin/QuizActions';
import { avialableQuizzes, sendRequest } from '../actions';
import { Link } from 'react-router-dom';

const AvialableQuizzes = ( {id, year} ) => {

    const [quizzes, setQuizzes] = useState([]);

    useEffect( ()=> {
        fetchQuizzes()
    }, [] );

    const fetchQuizzes = async () => {
        try {
            const res = await avialableQuizzes(year);
            setQuizzes(res.quiz);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRequest = async ( quiz_id ) => {
        try {
            const res = await sendRequest(quiz_id, id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>


        <h1> Available Quizzes </h1>

        <div className='bg-violet-200 rounded max-w-full mx-auto overflow-x-auto p-4'>
            <br />
            <table className='min-w-full'>
                <thead className='bg-gray-100 w-xl'>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Action
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y overflow-x-auto mx-auto'>

                    {
                        quizzes?.map( (item, i) => (
                            <tr key={i+3} className='odd:bg-violet-200 even:bg-violet-50 p-8'>

                                <td className='p-2' >
                                    { item.title }
                                </td>
                                <td className='p-2'>
                                    <button className='bg-violet-900 text-white px-3 py-1 rounded text-sm shadow hover:bg-indigo-300 hover:text-black hover:p-3' onClick={ () => handleRequest( item.id ) } > Request </button>
                                </td>
                                <td className='p-2'>
                                    <Link to={`/dashboard/multiple/${item.id}`} className={'bg-sky-600 text-white px-3 py-1 rounded text-sm shadow hover:bg-indigo-300 hover:text-black hover:p-3'}> Start </Link>
                                </td>

                            </tr>
                            
                        ) )
                    }

                </tbody>
            </table>

        </div>
      
    </div>
  )
}

export default AvialableQuizzes;
