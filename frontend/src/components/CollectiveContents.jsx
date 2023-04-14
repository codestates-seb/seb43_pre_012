import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 15px;
`;
const H1 = styled.h1`
	font-size: 15px;
	color: black;
	text-align: start;
`;
const Span = styled.span`
	font-size: 12px;
	text-align: start;
`;
const Button = styled.button`
	color: white;
	border: none;
	border: 1px solid #a0c0e8;
	border-style: inset;
	background-color: #3682de;
	padding: 5px;
	border-radius: 4px;
	margin-top: 10px;
`;
export default function CollectiveContents() {
	return (
		<Wrapper>
			<H1>Collectives on Stack Overflow</H1>
			<Span>
				Find centralized, trusted content and collaborate around the
				technologies you use most.
			</Span>
			<Button> Learn more about Collectives</Button>
		</Wrapper>
	);
}
