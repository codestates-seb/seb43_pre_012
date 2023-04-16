import styled from "styled-components";

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	height: 40px;
	margin-bottom: 10px;
`;
export const SearchInput = styled.input`
	position: absolute;
	height: 35px;
	font-size: 15px;
	border: 1px solid ${({ theme }) => theme.colors.gray};
	border-radius: 3px;
	padding-left: 35px;
	width: 300px;
	/* @media (min-width: ${({ theme }) => theme.screen.md}) {
		width: 200px;
	} */
	&:focus {
		outline: none;
		box-shadow: 0px 0px 5px 4px rgba(170, 220, 250, 0.75);
		-webkit-box-shadow: 0px 0px 5px 4px rgba(170, 220, 250, 0.75);
		-moz-box-shadow: 0px 0px 5px 4px rgba(170, 220, 250, 0.75);
	}
`;
