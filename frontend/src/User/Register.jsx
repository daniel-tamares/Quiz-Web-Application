import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { handleRegister } from './actions';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const [year, setYear] = useState('');
    const [section, setSection] =  useState('');
    const [course, setCourse] = useState('');

    const handleSubmit = async () => {
        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        if (profile) form.append('profile', profile);
        form.append('year', year);
        form.append('section', section);
        form.append('course', course);

        try {
            const data = await handleRegister(form);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>

        <div>
            <h2> Registraton Form </h2>

            {/* <form> */}
                <input
                type='text'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />
                <br />
                <input
                type='text'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
                <br />
                <input
                type='file'
                onChange={(e) => setProfile(e.target.files[0])}
                />
                <br />
                <input
                type='text'
                placeholder='Year'
                onChange={(e) => setYear(e.target.value)}
                value={year}
                />
                <br />
                <input
                type='text'
                placeholder='Section'
                onChange={(e) => setSection(e.target.value)}
                value={section}
                />
                <br />
                <input
                type='text'
                placeholder='Course'
                onChange={(e) => setCourse(e.target.value)}
                value={course}
                />
                <br />
                <button onClick={handleSubmit}> Submit </button>
            {/* </form> */}
        </div>
      
    </div>
  )
}

export default Register;
