import React from "react";
import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";
import { ImEarth } from "react-icons/im";
import { Link } from "react-router-dom";

const HamModalWrapper = styled.div`
	position: absolute;
	background-color: #ffffff;
	width: 165px;
	height: 320px;
	font-size: 40px;
	z-index: 32113;
	border : 1px solid #EBECEC;
	border-top : 3px solid white;
	box-shadow: 3px 3px 3px #d3d3d3;
`;
const Wrapper = styled.div`
	padding-top: 20px;
	padding-right: 10px;
	margin: 5px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	width: 160px;
	height: 100vh;
	flex-shrink: 0;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 10;
`;
const PublicWrapper = styled.div`
	padding-top: 5px;
	display: flex;
	padding-bottom: 20px;
	flex-direction: column;
	align-items: start;
	width: 100%;
`;

const P = styled.div`
	color: gray;
	font-weight: 500;
	display: flex;
	justify-content: space-between;
	margin-left: 5px;
	font-size: 14px;
`;

export default function HamModal() {
	return (
		<HamModalWrapper>
			<Wrapper>
				<Link to="/">
					<ButtonContainer name={"Home"} style={{ marginBottom: "20px" }} />
				</Link>
				<P>PUBLIC</P>
				<PublicWrapper>
					<Link to="/questions">
						<ButtonContainer name={"Questions"}>
							<ImEarth size={17} />
						</ButtonContainer>
					</Link>
					<Link to="/tags">
						<ButtonContainer name={"Tags"}></ButtonContainer>
					</Link>
					<Link to="/companies">
						<ButtonContainer name={"Companies"}></ButtonContainer>
					</Link>
				</PublicWrapper>

				<ButtonContainer name={"Create free Team"}></ButtonContainer>
			</Wrapper>
		</HamModalWrapper>
	);
}
