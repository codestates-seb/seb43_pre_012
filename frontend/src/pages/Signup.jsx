import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import styled from "styled-components";
import largeLogo from "../static/large-logo.png";
import smallLogo from "../static/small-logo.png";
import Login from "./Login";
import axios from "axios";
import Captcha from "../components/ReCAPTCHA";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	height: 100vh;
	@media screen and (max-width: ${(props) => props.theme.screen.sm}) {
		justify-content: center;
	}
	margin: 20px;
`;
const DescWrapper = styled.div`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
	@media screen and (max-width: ${(props) => props.theme.screen.sm}) {
		display: none;
	}
`;

const Desc = styled.div`
	font-size: 18px;
	margin-bottom: 20px;
	&.join {
		font-size: 30px;
	}
`;

const SignupWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100vh;
`;

const Logo = styled.img`
	width: 40px;
	margin-bottom: 20px;
`;
const GithubSignup = styled.button`
	width: 290px;
	height: 37px;
	margin-bottom: 10px;
	background-color: #23262a;
	color: white;
	border-radius: 3px;
`;
const EmailSignup = styled.form`
	display: flex;
	width: 290px;
	height: 600px;
	flex-direction: column;
	align-items: center;
	border: 1px solid #23262a;
	border-radius: 3px;
`;
const DisplayNameWrapper = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;
`;
const DisplayNameLabel = styled.div`
	margin: 30px 10px 2px 24px;
	font-weight: bold;
	font-size: ${({ theme }) => theme.fontSizes.lg};
`;
const DisplayNameInput = styled.input`
	margin: 10px;
	width: 240px;
	height: 35px;
`;
const EmailWrapper = styled.div`
	display: flex;
	justify-content: start;

	align-items: center;
	width: 100%;
`;
const EmailLabel = styled.div`
	margin: 10px 10px 2px 24px;
	font-weight: bold;
	font-size: ${({ theme }) => theme.fontSizes.lg};
`;
const EmailInput = styled.input`
	margin: 10px;
	width: 240px;
	height: 35px;
`;
const PasswordWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const PasswordLabel = styled.div`
	margin-left: 26px;
	font-weight: bold;
	font-size: ${({ theme }) => theme.fontSizes.lg};
`;
const ForgotPassword = styled.a`
	margin-right: 26px;
	color: blue;
`;

const PasswordInput = styled.input`
	margin: 10px;
	width: 240px;
	height: 35px;
`;

const SignupButton = styled.button`
	margin: 10px;
	width: 240px;
	height: 35px;
	color: white;
	border-radius: 3px;
	border: none;
	background-color: ${({ theme }) => theme.colors.skyblue};
`;

export default function Signup() {
	const navigate = useNavigate();
	const [emailInputValue, setEmailInputValue] = useState("");
	const [passwordInputValue, setPasswordInputValue] = useState("");
	const [displayNameInputValue, setDisplayNameInputValue] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com/api/members",
				{
					email: emailInputValue,
					username: displayNameInputValue,
					password: passwordInputValue,
				}
			);
			alert("회원가입 성공!");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Wrapper>
			<DescWrapper>
				<Desc className="join">Join the Stack Overflow community</Desc>
				<Desc>
					<svg width="26" height="26" className="svg-icon mtn2">
						<path
							fill="#0995FF"
							opacity=".5"
							d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
						></path>
						<path
							fill="#0995FF"
							d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"
						></path>
					</svg>
					ㅤGet unstuck - ask a question
				</Desc>
				<Desc>
					<svg width="26" height="26" className="svg-icon mtn2">
						<path
							fill="#0995FF"
							d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"
						></path>
						<path
							opacity=".5"
							d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
						></path>
						<path
							fill="#0995FF"
							opacity=".5"
							d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
						></path>
					</svg>
					ㅤUnlock new privileges like voting and commenting
				</Desc>
				<Desc>
					<svg width="26" height="26" className="svg-icon mtn2">
						<path
							fill="#0995FF"
							d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"
						></path>
						<path
							fill="#0995FF"
							opacity=".5"
							d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
						></path>
					</svg>
					ㅤSave your favorite questions, answers, watch tags, and more
				</Desc>
				<Desc>
					<svg width="26" height="26" className="svg-icon mtn2">
						<path
							fill="#0995FF"
							d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"
						></path>
					</svg>
					ㅤEarn reputation and badges
				</Desc>
			</DescWrapper>
			<SignupWrapper>
				<Logo src={smallLogo} />
				<GithubSignup>
					<AiFillGithub size={22} /> Sign up with Github
				</GithubSignup>
				<EmailSignup onSubmit={handleSignup}>
					<DisplayNameWrapper>
						<DisplayNameLabel>Display name</DisplayNameLabel>
					</DisplayNameWrapper>
					<DisplayNameInput
						type="name"
						onChange={(e) => setDisplayNameInputValue(e.target.value)}
					/>
					<EmailWrapper>
						<EmailLabel>Email</EmailLabel>
					</EmailWrapper>
					<EmailInput
						type="email"
						onChange={(e) => setEmailInputValue(e.target.value)}
					/>
					<PasswordWrapper>
						<PasswordLabel>Password</PasswordLabel>
						<ForgotPassword>Forgot password?</ForgotPassword>
					</PasswordWrapper>
					<PasswordInput
						type="password"
						onChange={(e) => setPasswordInputValue(e.target.value)}
					/>
					{/* <Captcha /> */}
					<SignupButton type="submit">Sign up</SignupButton>
				</EmailSignup>
			</SignupWrapper>
		</Wrapper>
	);
}
