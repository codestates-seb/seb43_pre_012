import styled from "styled-components";
import { Link } from "react-router-dom";

const MAX_LEN = 170;

const Container = styled.section`
	width: 770px;
	height: auto;
	height: 160px;
	display: flex;
	align-items: start;
	padding-top: 20px;
	border-bottom: 2px solid #f1f2f2;
`;

const Figures = styled.section`
	min-width: 120px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: end;
`;

const Figure = styled.h5`
	font-size: 15px;
	font-weight: 300;
	margin-bottom: 5px;
`;

const Infos = styled.section`
	width: auto;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 20px;
	padding-top: 0px;
`;

const Title = styled.h3`
	color: #0175cc;
	font-size: 18px;
	font-weight: 500;
`;

const Content = styled.h4`
	font-size: 15px;
	font-weight: 400;
	margin-bottom: 5px;
`;

const Tags = styled.section`
	display: flex;
	align-items: center;
`;

const Tag = styled.div`
	height: 25px;
	padding: 5px;
	background-color: #e0edf4;
	color: #39739c;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	font-size: 15px;
	font-weight: 500;
	border-radius: 5px;
`;

// const Icon = styled.div``;

const Questioner = styled.h5`
	position: absolute;
	right: 15px;
	bottom: 25px;
	font-size: 13px;
	font-weight: 400;
	color: #237ed0;
`;

export default function Question({ question }) {
	return (
		<Container>
			<Figures>
				<Figure>{`임의의숫자 votes`}</Figure>
				<Figure>{`${question.answer_count} answers`}</Figure>
				<Figure>{`${question.view_count} views`}</Figure>
			</Figures>
			<Infos>
				<Link to={`${question.question_id}`}>
					<Title>{question.title}</Title>
				</Link>
				<Content>
					{question.body.length >= MAX_LEN
						? question.body.slice(0, MAX_LEN) + "..."
						: question.body}
				</Content>
				<Tags>
					{question.tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</Tags>
				<Questioner>{question.owner.display_name}</Questioner>
			</Infos>
		</Container>
	);
}
