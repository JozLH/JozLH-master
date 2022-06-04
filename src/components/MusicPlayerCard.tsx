import React, { useEffect } from "react";
import { Wrapper, ButtonWrapper } from "./MusicCardStyles";
import Button from "@mui/material/Button";

type Props = {
	question: string;
	answers?: string[];
	callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: any;
	questionNr: number;
	totalSongs?: number;
};

// hideSpan.text("");

// const hideSpan = document.querySelectorAll("span");

// hideSpan.forEach(() => {
// 	hideSpan.innerHTML = "";
// });

const MusicPlayerCard: React.FC<Props> = (props: Props) => {
	// useEffect(() => {
	// 	// Update the document title using the browser API
	// 	//		document.querySelectorAll("span");
	// 	const hideSpan = document.getElementById("frame");

	// 	console.log(hideSpan);
	// 	//	hideSpan[1].style.display = "none";
	// });

	return (
		<div>
			<Button className="number">
				Question {props.questionNr} / {props.totalSongs}
			</Button>
			<p dangerouslySetInnerHTML={{ __html: props.question }}></p>
			{props.answers?.map((answer) => (
				// <ButtonWrapper
				// 	key={answer}
				// 	correct={props.userAnswer?.correctAnswer === answer}
				// 	userClicked={props.userAnswer?.answer === answer}
				// >
				<Button
					variant="contained"
					key={answer}
					style={{ display: "block", margin: "1rem auto" }}
					fullWidth
					onClick={props.callback}
					color={
						props.userAnswer?.answer
							? props.userAnswer?.correctAnswer === answer
								? "success"
								: "error"
							: "primary"
					}
				>
					{answer}
				</Button>
			))}
		</div>
	);
};

export default MusicPlayerCard;
