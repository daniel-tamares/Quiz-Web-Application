import React, { useEffect, useState } from 'react';
import { deployQuiz, getQuizzes } from '../QuizActions';

const DeployQuiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [quizId, setQuizId] = useState(0);
    const [year, setYear] = useState(0);
    const [course, setCourse] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect( () => {
        fetchQuizzes();
    }, [] );

    const fetchQuizzes = async () => {
        try {
            const res = await getQuizzes();
            setQuiz(res?.quizzes)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const openModel = ( id ) => {
        setIsOpen(true);
        setQuizId(id);
    }

    const handleDeployQuiz = async () => {
        let is_active = 1;
        setIsOpen(false);
        try {
            const res = await deployQuiz( quizId, year, course, is_active );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseQuiz = async (id, year, course) => {
        let is_active = 0;
        // setCourse('none');
        try {
            const res = await deployQuiz( id, year, course, is_active );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='bg-indigo-100 rounded p-4 w-full'>
        { quizId }

        <div className='p-4'>
            <table className='p-4 w-full'>
                <thead>
                    <tr>
                        <th> Quizzes </th>
                        <th> Year </th>
                        <th> Activate </th>
                        <th> Actions </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody className='divide-y overflow-x-auto mx-auto p-4'>
                    {
                        quiz?.map( (item) => (
                            <tr className='odd:bg-gray-300 even:bg-violet-200' key={item.id}>
                                <td className='p-4'> { item.title } </td>
                                <td> { item.year } </td>
                                <td> { item.is_active} </td>
                                <td>
                                    <button
                                        onClick={() => openModel(item.id)}
                                        className="px-2 py-1 bg-violet-800 text-sm text-white rounded hover:text-black hover:bg-indigo-200"
                                    >
                                        Deploy
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleCloseQuiz(item.id, item.year, item.course)}
                                        className="px-2 py-1 bg-sky-600 text-sm text-white rounded hover:text-black hover:bg-indigo-200"
                                    >
                                        Close Quiz
                                    </button>
                                </td>
                            </tr>
                        ) )
                    }
                </tbody>
            </table>
        </div>

        {/* Modal */}
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-green opacity-50 p-4"
                onClick={() => setIsOpen(false)} // click outside to close
            ></div>

            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg z-10 w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Depoly Quiz For...</h2>

                <div className='flex flex-col p-2'>
                    <label className=''>
                        <input placeholder=' Year...' className='text-sm border-2 border-indigo-900 rounded' value={year} onChange={(e) => setYear(e.target.value)} type="number" name="" id="" />
                        <input placeholder=' Course...' className='text-sm border-2 border-indigo-900 rounded' value={course} onChange={(e) => setCourse(e.target.value)} type="text" name="" id="" />
                    </label>
                    
                </div>

                <div className="flex justify-end gap-2">
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                    handleDeployQuiz();
                    }}
                    className="p-2 bg-violet-800 text-sm text-white rounded hover:bg-indigo-200 hover:text-black"
                >
                    Deploy
                </button>
                </div>
            </div>
            </div>
        )}
      
    </div>
  )
}

export default DeployQuiz;
