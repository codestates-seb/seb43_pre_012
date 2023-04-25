import styled from "styled-components";
import Question from "./Question";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Wrapper = styled.section`
	height: auto;
	display: flex;

	@media screen and (max-width: ${(props) => props.theme.screen.md}) {
		flex-direction: column;
		align-items: center;
	}
`;

const Container = styled.main`
	max-width: 740px;
	display: flex;
	flex-direction: column;
	margin-right: 40px;
	margin-top: 10px;
`;

const Header = styled.header`
	width: 100%;
	height: 130px;
	border-bottom: 2px solid ${(props) => props.theme.colors.gray};
`;

const TopHeader = styled.section`
	width: 100%;
	height: 50%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
`;

const Title = styled.h2`
	font-size: 30px;
	font-weight: 500;
`;

const AskBtn = styled.div`
	width: 100px;
	height: 35px;
	background-color: #0994fe;
	color: white;
	font-weight: 500;
	font-size: ${(props) => props.theme.fontSizes.sm};
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: #80c0ff 0px 1px 4px;
`;

const BottomHeader = styled.section`
	width: 100%;
	height: 50%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
`;

const QuestionNum = styled.h4`
	font-size: ${(props) => props.theme.fontSizes.lg};
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
	font-size: ${(props) => props.theme.fontSizes.sm};
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
	background-color: ${(props) => props.theme.colors.blue};
	color: white;
	margin-left: 10px;
`;

const Loader = styled.h1`
	font-size: ${(props) => props.theme.fontSizes.lg};
	font-weight: bold;
`;

const ScrollBtn = styled.div`
	width: 120px;
	height: 70px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.colors.skyblue};
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;

	margin: 0 auto;
`;

const OFFSET = 10;

// 관측에 적용할 수 있는 옵션
const options = {
	root: null,
	rootMargin: "0px",
	threshold: 1.0,
};

export default function HomeQuestions({ showContent }) {
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [questionNum, setQuestionNum] = useState(0);

	const getQuestions = async () => {
		const response = await axios.get(
			"http://localhost:3001/questions?_sort=creation_date&_order=DESC"
		);
		const { data } = response;

		setQuestions((prev) => data.slice(0, questionNum));
	};

	// 타겟 요소 지정
	let containerRef = useRef(null);

	useEffect(() => {
		(async () => {
			setIsLoading((prev) => true);

			await getQuestions();

			setIsLoading((prev) => false);
		})();
	}, [questionNum]);

	useEffect(() => {
		(async () => {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					setQuestionNum((prev) => prev + OFFSET);
				}
			}, options);

			if (containerRef.current) {
				observer.observe(containerRef.current);
			}

			return () => {
				observer.disconnect();
			};
		})();
	}, [containerRef]);

	return (
		<Wrapper>
			<Container>
				<Header>
					<TopHeader>
						<Title>Home</Title>
						<Link to="/questions/ask">
							<AskBtn>Ask Question</AskBtn>
						</Link>
					</TopHeader>
					<BottomHeader>
						<QuestionNum>
							{isLoading && "Loading..."}
							{questions && `${questions.length} questions`}
						</QuestionNum>
						<Btns>
							<Btn>Newest</Btn>
							<Btn>Active</Btn>
							<Btn>Bountied</Btn>
							<Btn>Unanswered</Btn>
							<Btn>More</Btn>
							<Btn
								bgColor={"#E0EDF4"}
								fntColor={"#5786AB"}
								style={{ marginLeft: "15px" }}
							>
								Filter
							</Btn>
						</Btns>
					</BottomHeader>
				</Header>
				{isLoading && <Loader>Loading...</Loader>}
				{questions &&
					questions.map((question) => (
						<Question
							key={question.question_id + ""}
							question={question}
							showContent={showContent}
						/>
					))}
				<ScrollBtn onClick={() => window.scrollTo(0, 0)} ref={containerRef}>
					가장 위로
				</ScrollBtn>
			</Container>
			<Aside />
		</Wrapper>
	);
}
