import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { handleLogin } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const { islogin, error } = useSelector( ( state ) => state.auth );
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(!username ||  !password) return
        try {
            const data = dispatch( login({ username, password }) );
            console.log(data); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (islogin) {
        navigate('/dashboard'); // ✅ safe redirect
        }
    }, [islogin]);

  return (
    <div className='flex h-screen w-full bg-indigo-200 place-items-center justify-center p-2'>

        <div className='flex flex-col md:w-[30%] w-[75%] bg-white p-12 px-16 rounded place-items-center justify-center space-y-2 shadow-xl'>
            <p className='font-bold text-3xl'> Login Form </p>
            <br />

            <label className='w-full space-y-2'>
                <span className='font-semibold'> Username </span>
                <input className='w-[100%] p-2 border-2 border-black rounded' type="text" placeholder='Username...' onChange={(e) => setUsername(e.target.value)} name="" id="" />
            </label>

            <label className='w-full space-y-2'>
                <span className='font-semibold'> Password </span>
                <input className='w-[100%] p-2 border-2 border-black rounded' type={ show ? "text" : "password" } placeholder='Password' onChange={(e) => setPassword(e.target.value)} name="" id="" />
                 <span className='text-sm'>
                    <input className='w-4' type="checkbox" onChange={() => setShow(!show)} />
                    Show password
                </span>
            </label>

            <button className='bg-indigo-800 w-[100%] p-2 rounded text-xl font-bold text-white' onClick={handleSubmit}> Login </button>

            <br />
            <span className='text-sm text-red-700'> { (typeof error === "string") ? <p> {error} </p> : '' } {error?.username} { error?.password } </span>
        </div>
      
    </div>
  )
}

export default Login;

// import React, { useState } from "react";
// import axios from "axios";

// function Login() {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//   });

//   const [message, setMessage] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/user/students/", formData);
//       setMessage(res.data.message);
//       setFormData({ name: "", age: "", email: "" }); // reset form
//     } catch (err) {
//       setMessage("Error: " + (err.response?.data?.detail || "Failed to insert student"));
//     }
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <h2>Insert Student</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name: </label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Age: </label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Email: </label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Login;

