import { ArrowDownOnSquareIcon, FolderArrowDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Files = () => {

    const [files, setFiles] = useState([]);

    useEffect( () => {
        fetchFiles();
    }, [] );

    const fetchFiles = async () => {
        try {
            const res = await axios.get('/files');
            setFiles(res?.data?.files);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='p-3 bg-indigo-200 rounded'>

        <div className='grid grid-cols-2 md:flex flex-row p-3 gap-3 text-sm'>
            {
                files.map( file => (
                    <div className='bg-white md:w-32 h-36 break-words p-3 rounded place-items-center text-center' key={file.id}>
                        <FolderArrowDownIcon className='w-8 text-indigo-800 md:w-16'/>
                        <a href={`http://localhost:8000/api/download_file/${file.id}`} target='_black' rel="noopener noreferrer" >
                            { file.name }
                        </a>
                    </div>
                ) )
            }
        </div>
      
    </div>
  )
}

export default Files;
