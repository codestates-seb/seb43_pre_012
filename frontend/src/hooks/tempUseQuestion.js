import axios from "axios";

const BASE_PATH =
  "http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com/api";
const LOCAL_PATH = "http://localhost:3001";

let administratorAuthorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwidXNlcm5hbWUiOiJqbUBlbWFpbC5jb20iLCJzdWIiOiJqbUBlbWFpbC5jb20iLCJpYXQiOjE2ODI0NzAyNzYsImV4cCI6MTY4MjQ3MjA3Nn0.ICQ1Z9Su4dpGCQPhPd0BMny68OYQgfPzaSSnO-D4mWI";
let headers = {
  Authorization: administratorAuthorization,
};

export const getDateNumber = () => {
  const date = new Date();
  return date.getTime();
};

export const getAuthorization = async () => {
  const response = await axios.post(
    "http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com/login",
    { email: "jm@gmail.com", password: "1234" }
  );

  const { authorization } = response.headers;

  administratorAuthorization = authorization;
  headers.Authorization = administratorAuthorization;
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_PATH}/questions?page=1&size=100`);
    const { data } = response;

    return data.date;

    return data.date.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      else if (a.createdAt > b.createdAt) return -1;
      else return 0;
    });
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getQuestionsByPage = async (page) => {
  try {
    const response = await axios.get(
      `${BASE_PATH}/questions?page=${page}&size=10`
    );
    const { data } = response;

    return data.date;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getQuestionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_PATH}/questions/${id}`);
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const addQuestion = async (newQuestion) => {
  try {
    await axios.post(`${BASE_PATH}/questions`, newQuestion, { headers });
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const updateQuestion = async (question) => {
  try {
    await axios.patch(
      `${BASE_PATH}/questions/${question.questionId}`,
      question,
      { headers }
    );
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const removeQuestion = async (id) => {
  try {
    await axios.delete(`${BASE_PATH}/questions/${id}`, { headers });
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const getAnswers = async () => {
  try {
    const response = await axios.get(`${BASE_PATH}/answers?page=1&size=10000`, {
      headers,
    });
    const { data } = response;

    return data.date;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getAnswerById = async (id) => {
  try {
    const response = await axios.get(`${BASE_PATH}/answers/${id}`);
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getAnswersByQuestionId = async (questionId) => {
  try {
    const data = await getAnswers();

    const answers = data.filter((answer) => answer.questionId === +questionId);

    return answers;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const addAnswer = async (newAnswer) => {
  try {
    await axios.post(`${BASE_PATH}/answers`, newAnswer, { headers });
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const updateAnswer = async (answer) => {
  try {
    await axios.patch(`${BASE_PATH}/answers/${answer.answerId}`, answer, {
      headers,
    });
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const removeAnswer = async (id) => {
  try {
    await axios.delete(`${BASE_PATH}/answers/${id}`, { headers });
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getComments = async () => {
  try {
    const response = await axios.get(`${LOCAL_PATH}/comments`);
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getCommentsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_PATH}/comments/${id}`);
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getCommentsByAnswerId = async (answerId) => {
  try {
    const response = await axios.get(`${BASE_PATH}/comments`);
    const { data } = response;

    const comments = data.filter((comment) => comment.answerId === answerId);

    return comments;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const addComment = async (newComment) => {
  try {
    await axios.post(`${BASE_PATH}/comments`, newComment, { headers });
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const updateComment = async (comment) => {
  try {
    await axios.patch(`${BASE_PATH}/comments/${comment.commentId}`, comment, {
      headers,
    });
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const removeComment = async (id) => {
  try {
    await axios.delete(`${BASE_PATH}/comments/${id}`, { headers });
  } catch (error) {
    console.log(error.message);
    return;
  }
};
