import styled from "styled-components";
import QnDetail from "../components/QnDetail";

const Wrapper = styled.section`
	height: auto;
	display: flex;
	align-items: start;
	padding-bottom: 50px;
	position: relative;
`;

export default function QuestionDetail() {
	return (
		<Wrapper>
			<QnDetail />
		</Wrapper>
	);
}
