import React from "react";
import styled from "styled-components";

const TagsWrapper = styled.div`
	padding: 20px;
`;
const H1 = styled.h1`
	margin-top: 10px;
	margin-bottom: 20px;

	font-size: 30px;
`;
const Span = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.lg};
`;
export default function Tags() {
	return (
		<TagsWrapper>
			<H1>Tags</H1>
			<Span>
				A tag is a keyword or label that categorizes your question with other,
				similar questions. Using the right tags makes it easier for others to
				find and answer your question.
			</Span>
		</TagsWrapper>
	);
}
