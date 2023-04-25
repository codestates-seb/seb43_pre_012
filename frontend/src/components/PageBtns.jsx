import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.section`
	margin-top: 20px;
	margin-left: 25px;
	/* width: 770px; */
	height: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Btns = styled.section`
	display: flex;
	justify-content: left;
	align-items: center;
`;

const Btn = styled.div`
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #d4d8da;
	padding: 10px;
	margin-right: 5px;
	background-color: ${(props) =>
		props.currentPage ? props.theme.colors.orange : "white"};

	&:hover {
		background-color: ${(props) =>
			props.currentPage
				? (props) => props.theme.colors.orange
				: props.theme.colors.gray};
	}
`;

const DotDotDot = styled.span`
	margin-right: 5px;
	font-size: ${(props) => props.fontsize};
	font-weight: 400;
`;

export default function PageBtns({ totalPage, currentPage, handlePage }) {
	const [pages, setPages] = useState([]);

	useEffect(() => {
		let initPages = [];

		for (let page = 1; page <= totalPage; ++page) {
			initPages.push(page);
		}

		setPages((prev) => initPages);
	}, []);

	return (
		<Container>
			<Btns>
				{pages.map((page) => (
					<Btn
						currentPage={page === currentPage}
						key={page + ""}
						onClick={() => handlePage(page)}
					>
						{page}
					</Btn>
				))}
				<DotDotDot fontSize={"10px"}>...</DotDotDot>
				<Btn onClick={() => handlePage(totalPage)}>{`${totalPage}`}</Btn>
				<Btn>Next</Btn>
			</Btns>
			<Btns>
				{totalPage >= 15 && <Btn>15</Btn>}
				{totalPage >= 30 && <Btn>30</Btn>}
				{totalPage >= 50 && <Btn>50</Btn>}
			</Btns>
		</Container>
	);
}
