import React, { useEffect, useState } from 'react';
import { addQuestions, getQuizzes } from '../QuizActions';

const CreateChooseInAbox = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState(['']);
    const [quiz_type, setType] = useState('C_B');
    const [quizzes, setQuizzes] = useState([]);
    const [quizId, setQuizId] = useState(0);

    useEffect( () => {
        fetchQuizzes();
    }, [] );

    const addOption = (e) => {
        const updatedAnswer = [ ...options, ''  ]
        setOptions( updatedAnswer);
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
    <div>

        <div>
            <h2> Create Choose in Box Question {quizId} </h2>

            <div>
                <select
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

            <input
            type="text"
            placeholder='Question'
            value={question}
            onChange={ (e) => setQuestion(e.target.value) }
            />
            <br />

            <h2> Options </h2>
            <button onClick={addOption}> Add option </button>
            {
                options.map( (item, index) => (
                    <div key={index}>
                        <input
                        type="text"
                        value={item}
                        onChange={ (e) => handleOption(index, e.target.value) }
                        required
                        />
                        <button onClick={ (e) => removeOption(index) }> remove </button>
                    </div>
                ) )
            }

            <br />
            <h2>Select Correct Answer below </h2>
            <select
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
            <button onClick={handleSubmit}> Create </button>
        </div>
      
    </div>
  )
}

export default CreateChooseInAbox;
