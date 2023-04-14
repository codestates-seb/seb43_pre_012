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
	margin: 0;
	margin-bottom: 3px;
`;
const P = styled.p`
	font-size: 13px;
	display: flex;
	margin: 0;
	margin-bottom: 15px;
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
	padding: 8px;
	border-radius: 4px;
	margin-top: 10px;
`;

export default function CollectiveContents() {
	return (
		<Wrapper>
			<H1>Teams</H1>
			<P>Q&A for work</P>
			<Span>
				Connect and share knowledge within a single location that is structured
				and easy to search
			</Span>
			<Button> Learn more about Team</Button>
		</Wrapper>
	);
}
