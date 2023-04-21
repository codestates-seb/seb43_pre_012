import axios from "axios";

const BASE_PATH =
  "http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com";
const httpClient = axios.create({
  baseURL: "https://api.stackexchange.com/2.3/",
});
const isLocal = true;

export const getQuestions = async () => {
  if (!isLocal) {
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
  } else {
    console.log("local data..");

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
  } else {
    console.log("local data..");

    const response = await axios.get(`http://localhost:3001/questions/${id}`);
    const { data } = response;

    return data;
  }
};

export const addQuestion = async (newQuestion) => {
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
};

export const updateQuestion = async (question) => {
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
  try {
    await axios.delete(`http://localhost:3001/questions/${id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};
