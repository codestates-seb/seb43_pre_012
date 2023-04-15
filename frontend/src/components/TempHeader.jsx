import styled from "styled-components";

const Container = styled.header`
	width: 100%;
	height: 50px;
	position: fixed;
	top: 0;
	background-color: #f48325;
	z-index: 10;

	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	font-weight: bold;
`;

export default function Header() {
	return <Container>Stackoverflow</Container>;
}
