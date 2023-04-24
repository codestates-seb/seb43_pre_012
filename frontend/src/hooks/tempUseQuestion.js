import axios from "axios";

const BASE_PATH =
  "http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com/api";
const LOCAL_PATH = "http://localhost:3001";
export const isLocal = true;

export const getQuestions = async () => {
  if (!isLocal) {
    /*
    return httpClient
      .get("questions", {
        params: {
          pagesize: 20,
          site: "stackoverflow",
          order: "desc",
          sort: "hot",
          filter: "!nOedRLbBQj",
        },
      })
      .then((json) => json.data.items);
      */

    const response = await axios.get(`${BASE_PATH}/questions?page=1&size=100`);

    return response.data.date.sort((a, b) => {
      if (a.creation_date < b.creation_date) return 1;
      else if (a.creation_date > b.creation_date) return -1;
      else return 0;
    });
  } else {
    console.log("local data..");

    // 밑은 json-server 이용한 것

    const response = await axios.get("http://localhost:3001/questions");

    return response.data.sort((a, b) => {
      if (a.creation_date < b.creation_date) return 1;
      else if (a.creation_date > b.creation_date) return -1;
      else return 0;
    });
  }
};

export const getQuestionById = async (id) => {
  if (!isLocal) {
    /*
    return httpClient
      .get("questions", {
        params: {
          pagesize: 20,
          site: "stackoverflow",
          order: "desc",
          sort: "hot",
          filter: "!nOedRLbBQj",
        },
      })
      .then((json) => json.data.items);
      */

    const response = await axios.get(`${BASE_PATH}/questions/${id}`);
    const { data } = response;

    return data;
  } else {
    console.log("local data..");

    const response = await axios.get(`http://localhost:3001/questions/${id}`);
    const { data } = response;

    return data;
  }
};

export const addQuestion = async (newQuestion) => {
  if (!isLocal) {
    try {
      await axios.post(`${BASE_PATH}/questions`, newQuestion);
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    try {
      /*
      const response = await fetch("http://localhost:3001/questions", {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(question),
      });
      */
      await axios.post("http://localhost:3001/questions", newQuestion);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const updateQuestion = async (question) => {
  if (!isLocal) {
    try {
      await axios.patch(
        `${BASE_PATH}/questions/${question.questionId}`,
        question
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  try {
    await axios.patch(
      `http://localhost:3001/questions/${question.id}`,
      question
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeQuestion = async (id) => {
  if (!isLocal) {
    try {
      await axios.delete(`${BASE_PATH}/questions/${id}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  try {
    await axios.delete(`http://localhost:3001/questions/${id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAnswers = async () => {
  if (isLocal === false) {
    const response = await axios.get(
      "http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com/api/answers?page=1&size=100"
    );
    const { data } = response;

    return data;
  } else {
    const response = await axios.get("http://localhost:3001/answers");
    const { data } = response;

    return data;
  }
};

export const getAnswerById = async (id) => {
  if (isLocal === false) {
    const response = await axios.get(`${BASE_PATH}/answers/${id}`);
    const { data } = response;

    return data;
  } else {
    const response = await axios.get(`http://localhost:3001/answers/${id}`);
    const { data } = response;

    return data;
  }
};

export const getAnswerByQuestionId = async (questionId) => {
  if (isLocal === false) {
    const response = await axios.get(`${BASE_PATH}/answers?page=1&size=100?`);
    const { data } = response;

    const answers = data.filter((answer) => answer.question_id === questionId);
    return answers;
  } else {
    const response = await axios.get("http://localhost:3001/answers");
    const { data } = response;

    const answers = data.filter((answer) => answer.question_id === questionId);
    return answers;
  }
};

export const addAnswer = async (newAnswer) => {
  if (!isLocal) {
    try {
      await axios.post(`${BASE_PATH}/answers`, newAnswer);
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    try {
      await axios.post("http://localhost:3001/answers", newAnswer);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const updateAnswer = async (answer) => {
  if (!isLocal) {
    try {
      await axios.patch(`${BASE_PATH}/answers/${answer.answerId}`, answer);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  try {
    await axios.patch(`http://localhost:3001/answers/${answer.id}`, answer);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeAnswer = async (id) => {
  if (!isLocal) {
    try {
      await axios.delete(`${BASE_PATH}/answers/${id}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  try {
    await axios.delete(`http://localhost:3001/answers/${id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDateNumber = () => {
  const date = new Date();
  return date.getTime();
};

export const getComments = async () => {
  if (isLocal === false) {
  } else {
    const response = await axios.get(`${LOCAL_PATH}/comments`);
    const { data } = response;

    return data;
  }
};

export const getCommentsById = async (id) => {
  if (isLocal === false) {
  } else {
    const response = await axios.get(`${LOCAL_PATH}/comments/${id}`);
    const { data } = response;

    return data;
  }
};

export const getCommentsByQuestionId = async (questionId) => {
  if (isLocal === false) {
  } else {
    const response = await axios.get(`${LOCAL_PATH}/comments`);
    const { data } = response;

    const comments = data.filter(
      (comment) => comment.question_id === questionId
    );

    return comments;
  }
};

export const addComment = async (newComment) => {
  if (isLocal === false) {
  } else {
    try {
      await axios.post(`${LOCAL_PATH}/comments`, newComment);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const updateComment = async (comment) => {
  if (isLocal === false) {
  } else {
    try {
      await axios.patch(`${LOCAL_PATH}/comments/${comment.id}`, comment);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

export const removeComment = async (id) => {
  if (isLocal === false) {
  } else {
    try {
      await axios.delete(`${LOCAL_PATH}/comments/${id}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
