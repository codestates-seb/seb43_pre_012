import React from "react";
import { useQuery } from "@tanstack/react-query";
import { StackExchange } from "../utils/stackExchangeApi";
import UserCard from "../components/UserCard";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import FilterButton from "../components/FilterButton";

const UsersWrapper = styled.div`
	padding-left: 20px;
`;

const H1 = styled.h1`
	font-size: 30px;
	margin-top: 10px;
	margin-bottom: 20px;
`;
const InputContainer = styled.div`
	position: relative;
	display: flex;
	height: 40px;
	margin-bottom: 20px;
`;
const SearchInput = styled.input`
	position: fixed;
	height: 35px;
	font-size: 15px;
	border: 1px solid ${({ theme }) => theme.colors.gray};
	border-radius: 3px;
	padding-left: 30px;
	margin-bottom: 20px;
	&:focus {
		outline: none;
		box-shadow: 0px 0px 5px 4px rgba(170, 220, 250, 0.75);
		-webkit-box-shadow: 0px 0px 5px 4px rgba(170, 220, 250, 0.75);
		-moz-box-shadow: 0px 0px 5px 4px rgba(170, 220, 250, 0.75);
	}
`;
const IconContainer = styled.div`
	position: absolute;
	top: 8px;
	left: 8px;
	color: gray;
`;
const FilterContainer = styled.div`
	border: 1px solid gray;
	display: flex;
	width: 400px;
	margin-bottom: 20px;
`;
const UserContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const buttons = ["Reputation", "New users", "Voters", "Editors", "Moderators"];
export default function Users() {
	const { data: users } = useQuery(["users"], () => StackExchange.users(), {
		staleTime: 1000 * 60 * 5,
	});

	users && console.log(users);
	return (
		<UsersWrapper>
			<H1>Users</H1>
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
