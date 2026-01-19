import React, { useState } from 'react';
import { addQuiz } from '../QuizActions';

const AddQuiz = () => {

    const [quiz, setQuiz] = useState({
        title: '',
        subject: '',
        teacher: '',
        year: '',
        course: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setQuiz( (prevData) => ({
            ...prevData,
            [name]: value,
        }) );
    }

    const handleSubmit = async (e) => {
        try {
            const res = await addQuiz(quiz);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='grid grid-cols-2 bg-indigo-200 p-4 rounded gap-3'>

        <div className='bg-white shadow p-2 rounded'>
            <h1> Create Quiz </h1>
            
            <input
            type="text"
            name="title"
            placeholder='Title'
            onChange={handleChange}
            value={quiz.title}
             />
             <br />

             <input
            type="text"
            name="subject"
            placeholder='Subject'
            onChange={handleChange}
            value={quiz.subject}
             />
             <br />

             <input
            type="text"
            name="teacher"
            placeholder='Teacher'
            onChange={handleChange}
            value={quiz.teacher}
             />
             <br />

             <input
            type="text"
            name="year"
            placeholder='Year'
            onChange={handleChange}
            value={quiz.year}
             />
             <br />
             <input
            type="text"
            name="course"
            placeholder='Course'
            onChange={handleChange}
            value={quiz.course}
             />
             <br />
             <button onClick={handleSubmit} > Add </button>

        </div>
        <div className='p-2 bg-white rounded shadow-xl'>

        </div>
      
    </div>
  )
}

export default AddQuiz;
