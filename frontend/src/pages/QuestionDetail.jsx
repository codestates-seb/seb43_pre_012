import styled from "styled-components";
import QnDetail from "../components/QnDetail";

const Wrapper = styled.section`
	width: 100%;
	height: auto;
	display: flex;
	align-items: start;
	padding-bottom: 50px;
	position: relative;
	padding: 20px;
`;

export default function QuestionDetail() {
	return (
		<Wrapper>
			<QnDetail />
		</Wrapper>
	);
}
