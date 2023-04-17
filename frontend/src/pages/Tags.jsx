import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { InputContainer, SearchInput } from "../styles/styles_jh";
import { BsSearch } from "react-icons/bs";
import { StackExchange } from "../utils/stackExchangeApi";

const TagsWrapper = styled.div`
	padding: 20px;
`;
const TextContainer = styled.div`
	margin-bottom: 30px;
`;
const H1 = styled.h1`
	margin-top: 10px;
	margin-bottom: 20px;
	font-size: 30px;
`;
const Span = styled.span`
	font-size: ${({ theme }) => theme.fontSizes.lg};
	padding-bottom: 20px;
`;
const IconContainer = styled.div`
	position: absolute;
	top: 8px;
	left: 8px;
	color: gray;
`;

export default function Tags() {
	// const { data: tags } = useQuery(["tags"], () => StackExchange.tags(), {
	// 	staleTime: 1000 * 60 * 5,
	// });
	// tags && console.log(tags);
	return (
		<TagsWrapper>
			<TextContainer>
				<H1>Tags</H1>
				<Span>
					A tag is a keyword or label that categorizes your question with other,
					similar questions. Using the right tags makes it easier for others to
					find and answer your question.
				</Span>
			</TextContainer>
			<InputContainer>
				<SearchInput placeholder="Filter by tag name" />
				<IconContainer>
					<BsSearch size={17} />
				</IconContainer>
			</InputContainer>
		</TagsWrapper>
	);
}
