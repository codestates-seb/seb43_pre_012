import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import Question from "./Question";
import PageBtns from "./PageBtns";
import { getQuestions } from "../functions";
import Aside from "./Aside";

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
	margin-top: 50px;
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
	font-size: ${(props) => props.theme.fontSizes.lg};
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

export default function AllQuestions() {
	const [datas, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading((prev) => true);

			const questions = await getQuestions(10);

			setDatas((prev) => questions.items);

			setIsLoading((prev) => false);
		})();
	}, []);

	return (
		<>
			<Wrapper>
				<Container>
					<Header>
						<TopHeader>
							<Title>All Questions</Title>
							<AskBtn>Ask Question</AskBtn>
						</TopHeader>
						<BottomHeader>
							<QuestionNum>
								{isLoading && "Loading..."}
								{datas && `${datas.length} questions`}
							</QuestionNum>
							<Btns>
								<Btn>Newest</Btn>
								<Btn>Active</Btn>
								<Btn>
									Bountied
									<BountiedNum>219</BountiedNum>
								</Btn>
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
					{datas &&
						datas.map((data) => (
							<Question key={data.question_id + ""} question={data} />
						))}
					<PageBtns />
				</Container>
				<Aside />
			</Wrapper>
		</>
	);
}
