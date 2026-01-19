import React from 'react';
import { requestAccess } from './actions';

const Request = () => {

    const sumbitRequest = async () => {
        try {
            const res = await requestAccess();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>

        <div className='bg-violet-700 text-white' >
            <button onClick={sumbitRequest} > Request for Quiz </button>
        </div>
      
    </div>
  )
}

export default Request;
