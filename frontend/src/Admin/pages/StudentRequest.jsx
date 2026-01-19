import React, { useEffect, useState } from 'react';
import { acceptRequest, getRequest } from '../QuizActions';

const StudentRequest = () => {

    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState(0);

    useEffect( () => {
        fetchRequest();
    }, [filter] );

    const fetchRequest = async () => {
        try {
            const res = await getRequest();
            console.log(res);
            setStudents(res?.admin_student);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAccept = async ( id, action ) => {
        try {
            const res = await acceptRequest( id, action = "accept" );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDenied = async ( id, action ) => {
        try {
            const res = await acceptRequest( id, action = "denied" );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    
  return (
    <div className='p-4 bg-indigo-100 w-full mx-auto'>

        <div>
            <h1> Students Request </h1>
        </div>

        <div>
            <button onClick={(e) => setFilter(filter + 1)}> Filter </button>
        </div>

        <div className='bg-violet-500 max-w-full mx-auto overflow-x-auto p-4'>
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
                    </tr>
                </thead>
                <tbody className='divide-y overflow-x-auto mx-auto'>

                    {
                        students?.map( (item, i) => (
                            <tr key={i+3} className='odd:bg-violet-200 even:bg-violet-50 p-8'>

                                <td className='ml-4 p-2' >
                                    <div className='ml-4 bg-white h-14 w-14 border-blue border-t-transparent rounded-full'>
                                        <img className='bg-white h-14 w-14 border-blue border-t-transparent rounded-full' srcSet={item.profile_url} alt="" />
                                    </div>                      
                                </td>
                                <td className='p-2' >
                                    { item.id } { item.username + " " + item.access + "  " }
                                </td>
                                <td className='p-2'>
                                    <button className='bg-violet-800 p-2 text-sm text-white rounded border-2 border-green-900' onClick={ (e) => handleAccept( item.id ) } > Accept </button>
                                </td>
                                <td className='p-2'>
                                    <button className='bg-pink-600 px-2 rounded border-2 border-red-900' onClick={ (e) => handleDenied( item.id ) } > Denied </button>
                                </td>

                            </tr>
                            
                        ) )
                    }

                </tbody>
            </table>
            {/* {
                students?.map( (item, i) => (
                    <span key={ i }>
                        { item.id } { item.username + " " + item.access + "  " }
                        <button onClick={ (e) => handleAccept( item.id ) } > Accept </button>
                        { "   " }
                        <button onClick={ (e) => handleDenied( item.id ) } > Denied </button>
                        <br /><br />
                    </span>
                ) )
            } */}
        </div>
      
    </div>
  )
}

export default StudentRequest;
