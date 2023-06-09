import React from "react";
import UserCard from "../components/UserCard";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import FilterButton from "../components/FilterButton";
import { InputContainer, SearchInput } from "../styles/styles_jh";
import useUserInfo from "../hooks/useUserInfo";
import { useAuthContext } from "../components/AuthProvider";
import { deleteCookie } from "../utils/cookies";

const UsersWrapper = styled.div`
	padding: 20px;
`;

const H1 = styled.h1`
	font-size: 30px;
	margin-top: 10px;
	margin-bottom: 20px;
`;
const SearchContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;
	flex-direction: column;
	@media (min-width: ${({ theme }) => theme.screen.md}) {
		flex-direction: row;
	}
`;

const FilterContainer = styled.div`
	display: inline-block;
	border-left: 1px solid ${({ theme }) => theme.colors.gray};
	background-color: ${({ theme }) => theme.colors.gray};
	border-radius: 3px;
	overflow: hidden;
	justify-content: flex-start;
	gap: 1px;
	margin-bottom: 20px;
`;
const IconContainer = styled.div`
	position: absolute;
	top: 8px;
	left: 8px;
	color: gray;
`;

const UserContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const buttons = ["Reputation", "New users", "Voters", "Editors", "Moderators"];
export default function Users() {
	const {
		getUsers: { data: users },
	} = useUserInfo();

	return (
		<UsersWrapper>
			<H1>Users</H1>
			<SearchContainer>
				<InputContainer>
					<SearchInput placeholder="filter by user" autoComplete="off" />
					<IconContainer>
						<BsSearch size={17} />
					</IconContainer>
				</InputContainer>
				<FilterContainer>
					{buttons.map((button) => (
						<FilterButton key={button} name={button} />
					))}
				</FilterContainer>
			</SearchContainer>
			{users && (
				<UserContainer>
					{users.map((user) => (
						<UserCard
							key={user.display_name}
							name={user.display_name}
							imgUrl={user.profile_image}
							location={user.location}
							reputation={user.reputation_change_week}
						/>
					))}
				</UserContainer>
			)}
		</UsersWrapper>
	);
}
