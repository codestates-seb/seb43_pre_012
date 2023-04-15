import styled from "styled-components";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";

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

function App() {
	return (
		<Page>
			<Header />
			<Container>
				<Nav />
				<Outlet />
			</Container>
			<Footer />
		</Page>
	);
}

export default App;
