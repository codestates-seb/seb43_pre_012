import styled from "styled-components";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HamModal from "./components/HamModal";
import { QueryClient, QueryClientProvider } from "react-query";
import Nav from "./components/Nav";
import { useState } from "react";

const Body = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Page = styled.div`
	width: 100%;
	max-width: 1280px;
	height: auto;
	font-size: ${({ theme }) => theme.fontSizes.sm};
	font-weight: 400;
`;
const Container = styled.div`
	display: flex;
	align-items: start;
`;

const queryClient = new QueryClient();
const pagesWithoutNav = ["ask", "login", "signup"];

function App() {
	const location = useLocation().pathname.split("/").pop();
	const isNav = pagesWithoutNav.includes(location) ? true : false;
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Header modalOpen={modalOpen} setModalOpen={setModalOpen} />
			{modalOpen && <HamModal />}
			<Body>
				<Page>
					<QueryClientProvider client={queryClient}>
						<Container>
							{!isNav && <Nav />}
							<Outlet />
						</Container>
					</QueryClientProvider>
				</Page>
				<Footer />
			</Body>
		</>
	);
}

export default App;
