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
    width : 80px;
`
const GithubLogin = styled.button`
    width : 200px;
    height : 40px;
    margin-bottom : 10px;
`
const EmailLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border : 1px solid black;
`
const EmailLabel = styled.div`
    margin: 10px;
`
const EmailInput = styled.input`
    margin: 10px;
`
const PasswordLabel = styled.div`
    margin-bottom: 5px;
`
const PasswordInput = styled.input`
    margin: 10px;
`

const LoginButton = styled.button`
    margin: 10px;
`

export default function Login() {
	return (
        <LoginWrapper>
            <Logo src={smallLogo} />
            <GithubLogin>Log in with Github</GithubLogin>
            <EmailLogin>
                <EmailLabel>Email</EmailLabel>
                <EmailInput type="email" placeholder="Email" />
                <PasswordLabel>Password</PasswordLabel>
                <PasswordInput type="password" placeholder="Password" />
                <LoginButton>Log in</LoginButton>
            </EmailLogin>
        </LoginWrapper>
	);
}
