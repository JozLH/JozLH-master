import styled from "styled-components";
import Button from "@mui/material/Button";

export const Wrapper = styled.div`
	max-width: 1100px;
	background: #ebfeff;
	border-radius: 10px;
	border: 2px solid #0085a3;
	padding: 20px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
	text-align: center;

	p {
		font-size: 1rem;
	}
`;

type ButtonWrapperProps = {
	correct?: boolean;
	userClicked?: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
	transition: all 0.3s ease;

	:hover {
		opacity: 0.8;
	}

	/* button {
		user-select: none;
		width: 100%;
		margin: 5px 0;
		background: ${({ correct, userClicked }) =>
		correct
			? ""
			: !correct && userClicked
			? "linear-gradient(90deg, #FF5656, #C16868)"
			: "linear-gradient(90deg, #56ccff, #6eafb4)"};
		text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
	} */
`;
