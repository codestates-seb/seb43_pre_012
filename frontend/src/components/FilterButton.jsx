import React from "react";
import styled from "styled-components";
const ButtonWrapper = styled.button`
	background: none;
	padding: 0;
	border: none;
	border-left: 1px solid gray;
	cursor: pointer;
	font-size: 14px;
	padding: 10px;
`;
export default function FilterButton({ name }) {
	return <ButtonWrapper>{name}</ButtonWrapper>;
}
