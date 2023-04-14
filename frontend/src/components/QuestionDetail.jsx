import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getQuestionDetail } from "../functions";

const Container = styled.main`
  width: 750px;
  height: auto;
`;

const Header = styled.header`
  width: 100%;
  height: 130px;
  border-bottom: 2px solid #f1f2f2;
`;

const TopHeader = styled.section`
  display: flex;
  height: 50%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 500;
`;

const AskBtn = styled.div`
  width: 100px;
  height: 35px;
  background-color: #0994fe;
  color: white;
  font-weight: 500;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: #80c0ff 0px 1px 4px;
`;

const BottomHeader = styled.section`
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const QuestionNum = styled.h4`
  font-size: 20px;
  font-weight: 500;
`;

const Btns = styled.section`
  display: flex;
  align-items: center;
`;

const Btn = styled.div`
  height: 35px;
  padding: 10px;
  border: 0.5px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  color: ${(props) => (props.fntColor ? props.fntColor : "black")};
`;

const BountiedNum = styled.div`
  width: 30px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0075cc;
  color: white;
  margin-left: 10px;
`;

const Loader = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

export default function QuestionDetail() {
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const response = await getQuestionDetail(id);
      setQuestion((prev) => response);

      // setIsLoading((prev) => false);
    })();
  }, []);

  return <Container></Container>;
}
