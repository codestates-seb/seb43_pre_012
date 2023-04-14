const BASE_PATH = "https://api.stackexchange.com/2.3";
const PATH_END = "&order=desc&sort=activity&site=stackoverflow";

//api.stackexchange.com/2.3/questions?pagesize=10&order=desc&sort=activity&site=stackoverflow

export const getQuestions = async (pageSize) => {
  const response = await fetch(
    `${BASE_PATH}/questions?pagesize=${pageSize}${PATH_END}`
  );
  const json = await response.json();

  console.log(json);

  return json;
};

export const getQuestionDetail = async (id) => {
  const response = await fetch(
    `${BASE_PATH}/questions/id??order=desc&sort=activity&site=stackoverflow`
  );
  const json = await response.json();

  return json;
};
