import React, { useState, useEffect } from 'react';
import { accpetOrdeny, getStudentReq } from '../QuizActions';

const GetStudentRequest = () => {

    const [students, setStudent] = useState([]);

    useEffect( () => {
        fetchStudent();
    }, [] );

    const fetchStudent = async () => {
        try {
            const res = await getStudentReq();
            setStudent(res?.req);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAccept = async (id, quiz_id) => {
        let action = 'accept'
        try {
            const res = await accpetOrdeny(id, quiz_id, action);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeny = async (id, quiz_id) => {
        let action = 'denied'
        try {
            const res = await accpetOrdeny(id, quiz_id, action);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>

        <div className='bg-indigo-200 max-w-full mx-auto overflow-x-auto p-4 rounded'>
            <br />
            <table className='min-w-full'>
                <thead className='bg-gray-100 w-xl'>
                    <tr>
                        <th>
                            Student
                        </th>
                        <th>
                            Action
                        </th>
                        <th>
                            Action
                        </th>
                        <th>
                            Action
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
                        students?.map( (item, i) => (
                            <tr key={i+3} className='odd:bg-violet-200 even:bg-violet-50 p-8'>

                                <td className='ml-4 p-2' >
                                    <div className='ml-4 bg-white h-14 w-14 border-blue border-t-transparent rounded-full'>
                                        <img className='bg-white h-14 w-14 border-blue border-t-transparent rounded-full' srcSet={item.student.profile_url} alt="" />
                                    </div>
                                </td>
                                <td className='p-2' >
                                    { item.student.year  }
                                </td>
                                <td className='p-2' >
                                    { item.student.username  }
                                </td>
                                <td className='p-2' >
                                    { item.quiz.title  }
                                </td>
                                <td className='p-2'>
                                    <button className='bg-violet-800 px-2 py-1 text-sm text-white rounded hover:bg-indigo-200 hover: text-black' onClick={ (e) => handleAccept( item.student_id, item.quiz_id ) } > Accept </button>
                                </td>
                                <td className='p-2'>
                                    {/* <button className='bg-green-700 px-2 text-white rounded border-2 border-green-900' onClick={ (e) => handleAccept( item.student_id, item.quiz_id ) } > Accept </button> */}
                                    <button className='bg-red-700 px-2 py-1 text-sm text-white rounded hover:bg-indigo-200 hover: text-black' onClick={ (e) => handleDeny( item.student_id, item.quiz_id ) } > Deny </button>                                </td>

                            </tr>
                            
                        ) )
                    }

                </tbody>
            </table>

        </div>
      
    </div>
  )
}

export default GetStudentRequest;
