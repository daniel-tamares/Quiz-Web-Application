import axios from "axios";

export const addQuiz = async (data) => {
    try {
        const res = await axios.post('store', data);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

export const addQuestions = async (question, options, answer, quiz_type, quiz_id) => {
    try {
        const res = await axios.post('add_questions', {
            quiz_id,
            question,
            options,
            answer,
            quiz_type,
        });
        return res?.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getRequest = async () => {
    try {
        const res = await axios.get('student_request');
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const acceptRequest = async ( id, action ) => {
    try {
        const res = await axios.post(`accept_request/${id}`, { action } );
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getQuizzes = async () => {
    try {
        const res = await axios.get('quizzes');
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const deployQuiz = async (id, year, course, is_active) => {
    try {
        const res = await axios.put(`deploy/${id}`, {year, course, is_active});
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getStudentReq = async () => {
    try {
        const res = await axios.post('get_req', {});
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const accpetOrdeny = async ( id, quiz_id, action ) => {
    try {
        const res = await axios.post('accept_deny', { id, quiz_id, action } );
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}
