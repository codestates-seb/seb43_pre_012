import React from "react";
import styled from "styled-components";
const ButtonWrapper = styled.button`
	background: ${({ name }) => (name === "Reputation" ? "#E4E5E7" : "white")};
	padding: 0;
	font-weight: 300;
	color: red;
	border: none;
	cursor: pointer;
	font-size: 13px;
	padding: 10px;
	width: auto;
	margin: 1px;
	margin-left: 0px;
	color: ${({ theme }) => theme.colors.grayText};
	&:hover {
		background-color: #f8f9f9;
	}
`;
export default function FilterButton({ name }) {
	return <ButtonWrapper name={name}>{name}</ButtonWrapper>;
}
