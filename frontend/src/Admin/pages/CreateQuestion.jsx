import React, { useEffect, useState } from 'react';
import { addQuestions, getQuizzes } from '../QuizActions';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
const CreateQuestion = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState(['']);
    const [quiz_type, setType] = useState('M_C');
    const [quizzes, setQuizzes] = useState([]);
    const [quizId, setQuizId] = useState(0);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const addOption = (e) => {
        setOptions( prev => [...prev, ''] );
        console.log(options);
    };

    const removeOption = (index) => {
        const updated = options.filter( (_,i) => (i !== index ));
        setOptions(updated);
    }

    const handleOption = (index, value) => {
        const updated = [...options];
        updated[index] = value;
        setOptions(updated);
    };

    const handleSubmit = async (e) => {
        try {
            const res = await addQuestions( question, options, answer, quiz_type, quizId );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const res = await getQuizzes();
            setQuizzes(res?.quizzes);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='grid grid-cols-2 gap-3 bg-indigo-200 p-4 rounded'>

        <div style={{ height: '500px' }} className='p-4 bg-white text-black rounded text-sm space-y-2'>
            <h2> Create Multiple Choice Question {quizId} </h2>

            <div className=''>
                <select
                className='bg-violet-800 text-white p-2 rounded'
                value={quizId}
                onChange={ (e) => setQuizId(e.target.value) }
                >
                    <option value=''> Select quiz </option>
                    {
                        quizzes.map( (item, id) => (
                            <option value={item.id} key={id}> {item.id} {item.title} </option>
                        ) )
                    }
                </select>
            </div>

            <textarea
            className='border border-black text-sm p-2 w-full h-16 rounded'
            type="text"
            placeholder='Write question here...'
            value={question}
            onChange={ (e) => setQuestion(e.target.value) }
            />
            <br />

            <h2> Options </h2>
            <button
            className='bg-violet-800 text-white rounded p-2'
            onClick={addOption}
            >
                Add option
            </button>
            {
                options.map( (item, index) => (
                    <div className='flex'
                        key={index}>
                        <input
                        placeholder='Option here...'
                        className='border border-black rounded'
                        type="text"
                        value={item}
                        onChange={ (e) => handleOption(index, e.target.value) }
                        required
                        />
                        {/* <button className='p-3 bg-violet-800 text-white' onClick={ (e) => removeOption(index) }>  x </button> */}
                        <TrashIcon
                        onClick={ (e) => removeOption(index) }
                        className='h-9 w-9 p-2 text-violet-800'
                        />
                    </div>
                ) )
            }

            <br />
            {/* <h2>Select Correct Answer below </h2> */}
            <select
            className='bg-violet-800 text-white p-2 rounded'
            value={answer}
            onChange={ (e) => setAnswer(e.target.value) }
            >
                <option value=''> Select Correct Answer </option>
                { options.map( (item, index) => (
                    <option key={index} value={item} > {item} </option>
                ) ) }

            </select>
            <br />
            {answer}
            <button className='bg-violet-800 text-white p-2 rounded' onClick={handleSubmit}> Create </button>
        </div>
        
      
    </div>
  )
}

export default CreateQuestion;
