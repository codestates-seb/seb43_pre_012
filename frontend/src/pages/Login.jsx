import React from "react";
import styled from "styled-components";
import largeLogo from "../static/large-logo.png"
import smallLogo from "../static/small-logo.png"


const LoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height : 100vh;
    width : 100%;
`

const Logo = styled.img`
    width : 40px;
    margin-bottom : 20px;
`
const GithubLogin = styled.button`
    width : 290px;
    height : 37px;
    margin-bottom : 10px;
    background-color : black;
    color : white;
`
const EmailLogin = styled.div`
    display: flex;
    width : 290px;
    height : 235px;
    flex-direction: column;
    align-items: center;
    border : 1px solid black;
`

const EmailWrapper = styled.div`
    display: flex;
    justify-content: start;

    align-items: center;
    width: 100%;

`
const EmailLabel = styled.div`
    margin: 10px 10px 2px 24px;
    font-weight : bold;
    font-size : ${({ theme }) => theme.fontSizes.lg};
`
const EmailInput = styled.input`
    margin: 10px;
    width : 240px;
    height : 35px;
`
const PasswordWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const PasswordLabel = styled.div`
    margin-left: 26px;
    font-weight : bold;
    font-size : ${({ theme }) => theme.fontSizes.lg};
`
const ForgotPassword = styled.a`
    margin-right: 26px;
    color : blue;
`

const PasswordInput = styled.input`
    margin: 10px;
    width : 240px;
    height : 35px;
`

const LoginButton = styled.button`
    margin: 10px;
    width : 240px;
    height : 35px;
    color : white;
    background-color : ${({ theme }) => theme.colors.skyblue};

`

export default function Login() {
	return (
        <LoginWrapper>
            <Logo src={smallLogo} />
            <GithubLogin>Log in with Github</GithubLogin>
            <EmailLogin>
                <EmailWrapper>
                    <EmailLabel>Email</EmailLabel>
                </EmailWrapper>
                <EmailInput type="email" />
                <PasswordWrapper>
                    <PasswordLabel>Password</PasswordLabel>
                    <ForgotPassword>Forgot password?</ForgotPassword>
                </PasswordWrapper>
                <PasswordInput type="password" />
                <LoginButton>Log in</LoginButton>
            </EmailLogin>
        </LoginWrapper>
	);
}
