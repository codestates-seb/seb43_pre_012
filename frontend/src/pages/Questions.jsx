import styled from "styled-components";
import AllQuestions from "../components/AllQuestions";

const Wrapper = styled.section`
	width: 100%;
	height: auto;
	display: flex;
	align-items: start;
	padding-bottom: 50px;
	position: relative;
`;

export default function Questions() {
	return (
		<Wrapper>
			<AllQuestions showContent={true} title={"All Questions"} />
		</Wrapper>
	);
}
