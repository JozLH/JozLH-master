import styled from "styled-components";
import Button from "@mui/material/Button";


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
