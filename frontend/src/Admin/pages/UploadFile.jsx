import { DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import React, { useState } from 'react';

const UploadFile = () => {

    const [file, setFile] = useState('');

    const handleChange = (e) => {
        const selected_file = e.target.files[0];
        if(selected_file){
            setFile(selected_file);
        }else{
            setFile('');
        }
    } 

    const handleUpload = async () => {
        try {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/upload_file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='p-3 bg-indigo-200 rounded'>

        <div className='p-4 border border-black rounded'>
            <label className='text-sm font-semibold'>
                <span> Course: </span> <br />
                <input className='border border-black rounded' type="text" name="" id="" />
            </label>
            <br />
            <label className='text-sm font-semibold'>
                <span> Year: </span> <br />
                <input className='border border-black rounded' type="text" name="" id="" />
            </label>
            <label className='flex flex-col w-8 bg-indigo-200 text-sm'>
                <p className='font-semibold'> Documents </p>
                <DocumentTextIcon className='w-full text-violet-900'/>
                <input className='hidden' type="file" onChange={ handleChange } name="" id="" />
                <small> {file.name} </small>              
            </label>
            <br />
            <button onClick={handleUpload}> Upload </button>
        </div>
      
    </div>
  )
}

export default UploadFile;
