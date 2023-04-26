import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
	display: flex;
	margin: 10px;
	width: 100%;
	@media (min-width: ${({ theme }) => theme.screen.sm}) {
		width: 45%;
	}
	@media (min-width: ${({ theme }) => theme.screen.md}) {
		width: 30%;
	}
	@media (min-width: ${({ theme }) => theme.screen.lg}) {
		width: 22%;
	}
	font-size: ${({ theme }) => theme.fontSizes.md};
	color: ${({ theme }) => theme.colors.grayText};
`;
const Img = styled.img`
	width: 50px;
	height: 50px;
	margin-right: 10px;
	border-radius: 8px;
`;
const UserInfo = styled.div``;
const Name = styled.p`
	font-size: ${({ theme }) => theme.fontSizes.lg};
	color: ${({ theme }) => theme.colors.skyblue};
`;
const Location = styled.p`
	margin-top: 3px;
	margin-bottom: 3px;
	font-weight: 350;
`;
const Reputation = styled.p`
	font-weight: 800;
`;
export default function UserCard({ name, imgUrl, location, reputation }) {
	return (
		<CardWrapper>
			<Img alt={name} src={imgUrl} />
			<UserInfo>
				<Name>{name}</Name>
				<Location>{location}</Location>
				<Reputation>{reputation}</Reputation>
			</UserInfo>
		</CardWrapper>
	);
}
