import styled from "styled-components";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

function App() {
	return (
		<>
			<Header />
			<Body>
				<Page>
					<QueryClientProvider client={queryClient}>
						<Container>
							<Nav />
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
