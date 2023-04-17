import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";
import { RiInformationFill } from "react-icons/ri";
import { ImEarth } from "react-icons/im";
import Modal from "./Modal";
import { useState } from "react";
import CollectiveContents from "./CollectiveContents";
import CreateTeamContents from "./CreateTeamContents";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
	padding-top: 20px;
	border-right: 1px solid ${({ theme }) => theme.colors.gray};
	padding-right: 10px;
	margin: 5px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	width: 160px;
	height: 100vh;
	flex-shrink: 0;
	@media (max-width: ${({ theme }) => theme.screen.sm}) {
		display: none;
	}
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
const PWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding-bottom: 25px;
`;
const P = styled.div`
	color: gray;
	font-weight: 500;
	display: flex;
	justify-content: space-between;
	margin-left: 5px;
	width: 100%;
`;
const InfoIcon = styled.div`
	position: relative;
	cursor: pointer;
`;
const buttons = ["Tags", "Users", "Companies"];
export default function Nav() {
	const [showCollectives, setShowCollective] = useState(false);
	const [showCreateTeam, setShowCreateTeam] = useState(false);
	return (
		<Wrapper>
			<Link to="/">
				<ButtonContainer name={"Home"} style={{ marginBottom: "20px" }} />
			</Link>
			<P>PUBLIC</P>
			<PublicWrapper>
				<Link to="questions">
					<ButtonContainer name={"Questions"}>
						<ImEarth size={17} />
					</ButtonContainer>
				</Link>
				{buttons.map((button) => (
					<Link key={button} to={button.toLowerCase()}>
						<ButtonContainer key={button} name={button} />
					</Link>
				))}
			</PublicWrapper>
			<PWrapper>
				<P>
					COLLECTIVES
					<InfoIcon>
						<RiInformationFill
							size={15}
							data-name={"collectives"}
							onClick={() => setShowCollective((prev) => !prev)}
						/>
						{showCollectives && (
							<Modal
								rect={{
									top: "-210px",
									left: "-98px",
									width: "211px",
									aftertop: "100%",
									topColor: "white",
									positionY: "50%",
								}}
								setShowModal={setShowCollective}
							>
								<CollectiveContents />
							</Modal>
						)}
					</InfoIcon>
				</P>
				<ButtonContainer name={"Explore Collective"} />
			</PWrapper>
			<P>
				TEAMS
				<InfoIcon>
					<RiInformationFill
						size={15}
						data-name={"createTeam"}
						onClick={() => setShowCreateTeam((prev) => !prev)}
						style={{ cursor: "pointer" }}
					/>
					{showCreateTeam && (
						<Modal
							rect={{
								top: "35px",
								left: "-25px",
								width: "200px",
								afterbottom: "100%",
								bottomColor: "white",
								positionY: "15%",
							}}
							setShowModal={setShowCreateTeam}
						>
							<CreateTeamContents />
						</Modal>
					)}
				</InfoIcon>
			</P>
			<ButtonContainer name={"Create free Team"}></ButtonContainer>
		</Wrapper>
	);
}
