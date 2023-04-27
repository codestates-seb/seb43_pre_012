import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import largeLogo from "../static/large-logo.png";
import smallLogo from "../static/small-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f1f2f3;
`;

const Logo = styled.img`
  width: 40px;
  margin-bottom: 20px;
`;
const GithubLogin = styled.button`
  width: 290px;
  height: 37px;
  margin-bottom: 10px;
  background-color: #23262a;
  color: white;
  border-radius: 3px;
`;
const EmailLogin = styled.form`
  display: flex;
  width: 290px;
  height: 235px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #bbbbbb;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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

const LoginButton = styled.button`
  margin: 10px;
  width: 240px;
  height: 35px;
  color: white;
  background-color: ${({ theme }) => theme.colors.skyblue};
  border-radius: 3px;
  border: none;
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("hello@gmail.com");
  const [password, setPassword] = useState("1234");
  const { authState, setAuthState } = useAuthContext();
  console.log("before login", authState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-13-209-67-47.ap-northeast-2.compute.amazonaws.com/login",
        { email, password }
      );
      setAuthState({
        token: response.headers.authorization,
        refresh: response.headers.refresh,
      });
      alert("로그인 성공!");
      navigate("/questions");
    } catch (error) {
      alert("로그인에 실패했습니다. Email과 Password를 다시 확인해주세요.");
      console.error(error);
    }
  };

  return (
    <LoginWrapper>
      <Logo src={smallLogo} />
      <GithubLogin>
        <AiFillGithub size={22} /> Log in with Github
      </GithubLogin>
      <EmailLogin onSubmit={handleSubmit}>
        <EmailWrapper>
          <EmailLabel>Email</EmailLabel>
        </EmailWrapper>
        <EmailInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordWrapper>
          <PasswordLabel>Password</PasswordLabel>
          <ForgotPassword>Forgot password?</ForgotPassword>
        </PasswordWrapper>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Log in</LoginButton>
      </EmailLogin>
    </LoginWrapper>
  );
}
