import React, { useState, useEffect } from "react";
import MusicPlayerCard from "./components/MusicPlayerCard";
import { fetchSongList } from "./Api";
import { genres } from "./data/data";
import { Button } from "@mui/material";
import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Confetti from "react-confetti";

// Type definitions:
// "question" will be of the type "string",
// "correct" will be of the type "boolean", in this case, the boolean will also define the colors,
// if correct, then it's green, if !correct, then it's red etc.

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string[];
};

// defining useState hooks - the initial state goes here and it's in parenthesis,
// if we want to start with an empty view, we use (false), ("") or ([])
const App = () => {
	const [loading, setLoading] = useState(false);
	const [question, setQuestion] = useState<any>([]);
	const [number, setNumber] = useState(0);
	const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [genre, setGenre] = useState("any");
	const [gameOn, setGameOn] = useState(false);
	const [totalSongs, setTotalSongs] = useState(0);
	const [showConfetti, setShowConfetti] = useState(false);

	// this selects the genre state (setGenre) based on the selection in the dropdown menu,
	// it also converts the selection to string
	const handleChange = (event: SelectChangeEvent) => {
		setGenre(event.target.value as string);
	};

	const startTrivia = async () => {
		setLoading(true);
		setGameOn(true);
		setGameOver(false);

		const newSongs = await fetchSongList(genre);
		setQuestion(newSongs);
		setScore(0);
		setUserAnswer([]);
		setNumber(0);
		setLoading(false);
		setTotalSongs(newSongs.length);
	};

	const checkAnswer = (e: any) => {
		const answer = e.target.innerText;

		if (!gameOver) {
			const correct =
				question[number].correct_answer.toLowerCase() === answer.toLowerCase();
			if (correct) setScore((prevSate) => prevSate + 1);
			const answerObject = {
				question: question[number].question,
				answer,
				correct,
				correctAnswer: question[number].correct_answer,
			};
			setUserAnswer((prevState) => [...prevState, answerObject]);
		}
	};

	const nextQuestion = () => {
		const nextQ = number + 1;
		if (nextQ === totalSongs) {
			setGameOver(true);
			setGameOn(false);
		} else {
			setNumber(nextQ);
		}
	};
	// if all the songs have been played AND answered correctly (5/5),
	// start a timeout of 8000 ms
	// then change the ShowConfetti state to true,
	// then reset the score (to 0)
	// and restart the game with nextQuestion component.
	useEffect(() => {
		if (totalSongs > 0 && score === totalSongs) {
			setShowConfetti(true);
			setTimeout(() => {
				setShowConfetti(false);
				setScore(0);
				nextQuestion();
			}, 8000);
		}
	});

	return (
		<div className="App">
			{/* confetti funtion: if score is not 0 and if scrore IS equals to totalSongs, then shoot! */}
			{/* {totalSongs > 0 && score === totalSongs && ( */}
			{showConfetti && (
				<Confetti width={window.screen.width} height={window.screen.height} />
			)}
			{/* heading for the home page that updates for the game header */}
			{!gameOn ? (
				<h1>This is… Spotiguess!</h1>
			) : (
				<h2>You are Spotiguessing!</h2>
			)}

			{/* These are the buttons, with style variables (defines as types in ) */}
			{!gameOn && (
				<FormControl
					variant="standard"
					style={{
						color: "white",
						width: "30%",
						margin: "1rem auto",
						display: "block",
					}}
				>
					<InputLabel
						id="demo-simple-select-label"
						style={{
							color: "white",
						}}
					>
						Choose genre…
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						style={{
							color: "white",
						}}
						value={genre}
						label="Genre"
						onChange={handleChange}
					>
						<MenuItem value="any">All songs</MenuItem>
						{genres.map((mappedGenre, index) => (
							<MenuItem value={mappedGenre} key={index}>
								{mappedGenre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
			{gameOver || userAnswer.length === totalSongs ? (
				<Button
					variant="contained"
					onClick={startTrivia}
					style={{
						backgroundColor: "#1DB954",
						color: "white",
						borderRadius: "30px",
					}}
				>
					PLAY!
				</Button>
			) : null}
			{/* if it's not game over, then show the Score, else, show nothing null */}
			{!gameOver ? <p className="score">Score: {score}</p> : null}
			{/* if the page is loading, maybe on a slow Internet connection or device, then show Loading songs… */}
			{loading ? <p className="">Loading songs…</p> : null}
			{/* if it's not loading nor game over, then use the MusicPlayerCard component */}
			{!loading && !gameOver && (
				<MusicPlayerCard
					questionNr={number + 1}
					totalSongs={totalSongs}
					question={question[number].question}
					answers={question[number].answers}
					userAnswer={userAnswer ? userAnswer[number] : undefined}
					callback={checkAnswer}
				/>
			)}
			{!gameOver &&
			!loading &&
			userAnswer.length === number + 1 &&
			number !== totalSongs ? (
				<Button variant="contained" onClick={nextQuestion}>
					Next song
				</Button>
			) : null}
		</div>
	);
};

export default App;
