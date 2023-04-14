import styled from "styled-components";

const Container = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	align-items: center;
	/* background-color: gray;
	border-right: 2px solid red; */
`;
const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2px;
	width: 100%;
	color: #6a737c;
	padding-left: 5px;
	height: 35px;
	&:hover {
		color: #0c0d0e;
		cursor: pointer;
	}
`;
const ButtonText = styled.div`
	position: absolute;
	display: flex;
	font-size: 14px;
	margin-left: ${(props) => props.isHome || "25px"};
`;

export default function ButtonContainer({ name, children, style }) {
	const isHome = name === "Home";
	return (
		<Container style={style}>
			<ButtonWrapper>
				{children}
				<ButtonText isHome={isHome}>{name}</ButtonText>
			</ButtonWrapper>
		</Container>
	);
}
