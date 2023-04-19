import React from "react";
import { IconLogo, IconSearch } from '@stackoverflow/stacks-icons';
import styled from "styled-components";
import largeLogo from "../static/large-logo.png"
import smallLogo from "../static/small-logo.png"
import Login from "./Login"

const DescWrapper = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    height : 100vh;
    width : 1000px;
	margin-left : 40px;
`

const Desc = styled.div`
	font-size : 18px;
	margin-bottom :20px;
`



export default function Signup() {
	return (
		<>
			<DescWrapper>
				<Desc>Get unstuck - ask a question</Desc>
				<Desc>Unlock new privileges like voting and commenting</Desc>
				<Desc>Save your favorite questions, answers, watch tags, and more</Desc>
				<Desc>Earn reputation and badges</Desc>
			</DescWrapper>
			<Login />
		</>

	);
}
