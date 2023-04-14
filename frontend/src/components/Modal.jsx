import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
	position: absolute;
	background: white;
	border-radius: 10px;
	/* top: -210px; */
	/* left: -98px;
	width: 211px;
	height: 190px; */
	top: ${(p) => p.rect.top};
	left: ${(p) => p.rect.left};
	width: ${(p) => p.rect.width};
	height: ${(p) => p.rect.height};
	box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
	-webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
	-moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
	z-index: 3;
	&:after {
		top: ${(p) => p.rect.aftertop};
		bottom: ${(p) => p.rect.afterbottom};
		left: ${(p) => p.rect.positionY};
		border: solid transparent;
		content: "";
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
		border-top-color: ${(p) => p.rect.topColor};
		border-bottom-color: ${(p) => p.rect.bottomColor};
		border-width: 10px;
		margin-left: -10px;
	}
`;
export default function Modal({ rect, children, setShowModal }) {
	const modal = useRef(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
	const handleClickOutside = (event) => {
		if (modal && !modal.current.contains(event.target)) {
			setShowModal(false);
		} else {
			setShowModal(true);
		}
	};
	return (
		<ModalWrapper rect={rect} ref={modal}>
			{children}
		</ModalWrapper>
	);
}
