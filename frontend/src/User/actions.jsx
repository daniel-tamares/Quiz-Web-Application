import axios from 'axios';

export const handleLogin = async (username, password) => {
    try {
        const res = await axios.post('http://localhost:8000/api/login', {username, password});
        return res?.data;
    } catch (error) {
        return error;
    }
};

export const handleRegister = async (form) => {
    try {
        const res = await axios.post('http://localhost:8000/api/register', form, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res?.data;
    } catch (error) {
        return error;
    }
};

export const fetchQuestions = async (pageIndex) => {
    try {
        const res = await axios.get(`questions?page=${pageIndex}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const submitAsnwer = async (answer, total, id, quizId, quizType) => {
    try {
        const res =  await axios.post('submit_multiChoie', {answer, total, id, quizId, quizType});
        localStorage.removeItem('ans');
        localStorage.removeItem('index');
        return res?.data;
    } catch (error) {
        console.log(error);
    }
    };

// export const fetchChooseBox = async (pageIndex) => {
//     try {
//         const res = await axios.get(`get_choose_box?page=${pageIndex}`);
//         return res?.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const requestAccess = async () => {
    try {
        const res = await axios.post('request', {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const requestQuestions = async (pageIndex, quiz_id) => {
    try {
        const res = await axios.post(`r_quiz?page=${pageIndex}`, {quiz_id}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const requestChooseBox = async (pageIndex, quiz_id) => {
    try {
        const res = await axios.post(`get_choose_box?page=${pageIndex}`, {quiz_id}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const viewAns = async ( id, quiz_type, quiz_id ) => {
    try {
        const res = await axios.post('view_ans', { id, quiz_type, quiz_id });
        console.log(res);
        return res?.data;
        
    } catch (error) {
        console.log(error);
    }
};

export const sendRequest = async ( quiz_id, id ) => {
    try {
        const res = await axios.post('request_quiz', { quiz_id, id });
        console.log(res);
        return res?.data;
        
    } catch (error) {
        console.log(error);
    }
};

export const avialableQuizzes = async ( year ) => {
    try {
        const res = await axios.get('available_quizzes', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return res?.data;
        
    } catch (error) {
        console.log(error);
    }
};

export const studentGraph = async () => {
    try {
        const res = await axios.get('graph', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        return res?.data;
    } catch (error) {
        console.log(error);
    }
}
