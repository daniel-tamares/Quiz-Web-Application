import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { viewAns } from '../actions';
import { Link, useParams } from 'react-router-dom';

const ViewAns = ( {id, quiz_type}) => {

    const { quiz_id } = useParams();

    // const quiz_type = 'M_C';
    const [ans, setAns] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);
    const [item, setItem] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect( () => {
        viewAnswer();
    }, [] );

    const viewAnswer = async () => {
        try {
            const res = await viewAns( id, quiz_type, quiz_id );
            setAns(res?.ans?.answers);
            setQuestions(res?.questions);
            setScore(res?.ans?.score);
            setItem(res?.ans?.items);
            setTitle(res?.ans?.title); 

            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='bg-indigo-200 p-2'>

        {/* <h1> View Answer score: {score}/{item} {id} {quiz_type} { "afadfas" + quiz_id} </h1> */}

        <div className='flex flex-row p-2 gap-4 space-between'>
            <div className='flex flex-row w-32 h-32 p-2 justify-center text-center rounded bg-violet-600 text-4xl text-white font-bold rounded-full'>
                <h1 className='mt-8 justify-center text-center'> { score }/{ item } </h1>
            </div>
            <div className='p-4 font-bold text-2xl'>
                <p className=''>
                    { score > (item-score) ? "Congratulation you PASSED this quiz" : "Failed" }
                </p>
            </div>
        </div>
        <br />

        <div className=''>
            <span>
                <Link to={`/dashboard/view_ans_C_B/${quiz_id}`} className='bg-violet-700 text-white px-3 py-1 rounded'> Part 1 </Link>
                <Link to={`/dashboard/view_ans_M_C/${quiz_id}`} className='bg-violet-700 text-white px-3 py-1 rounded'> Part 2 </Link>
            </span>
            {
                questions?.map( (item, index) => (
                    <div key={index} className='p-4 bg-white'>
                        <h3 className='text-md p-2 font-bold'> {index + " "} {item?.question} {"correct answer: " + item?.answer} ? </h3>
                        {/* <div className='grid grid-cols-2 p-2 text-center font-semibold'>
                            <div> Correct Answer </div>
                            <div> Your answer</div>
                        </div> */}
                        <div className='flex bg-indigo-100 border border-black rounded p-4 justify-center'>
                            <span className='flex flex-col md:flex-row gap-2 w-full'>
                                <label className='w-full border border-indigo-900 rounded p-2 shadow bg-indigo-200 font-semibold'> { " " + item.answer } </label>
                                <label className={`w-full border border-indigo-900 rounded p-2 shadow bg-indigo-200 ${item?.answer === ans[item?.id] ? "font-semibold text-green-700" : "font-semibold text-red-500"} `}>
                                    <input onChange={(e) => 'e'} className='w-3 h-3' checked type="radio" name={`A_${item.id}`} id="" />
                                    { " " + ans[item.id] }
                                </label>
                            </span>
                        </div>
                    </div>
                ) )
            }
        </div>

        {/* <div>
            {
                questions?.map( (item, index) => (
                    <div key={index}>
                        <h3 style={{ color: item?.answer === ans[item?.id] ? 'gren': 'red' }}> {item?.question} {"correct answer: " + item?.answer} </h3>

                        {
                            item?.options?.map( (option, i) => (
                                <label key={i+1}>
                                    <input
                                    type='radio'
                                    name={ `q_${item?.id}` }
                                    value={ option }
                                    checked={ option === ans[item?.id] }
                                    onChange={(e) => 'd'}
                                    />
                                    { option }
                                </label>
                            ) )
                        }
                    </div>
                ) )
            }
        </div> */}

        {/* { JSON.stringify(ans, null, 2) }
        <br /><br />
        { JSON.stringify(questions, null, 2) }
        <br /><br />
        { ans[33] } */}
      
    </div>
  )
}

export default ViewAns;
