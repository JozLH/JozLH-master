import { queries } from "@testing-library/react";
import React from "react";
import { useState } from "react";
import MusicPlayerCard from "./components/MusicPlayerCard";
import { fetchSongList } from "./Api";
import { musicData } from "./data/data";
import { Button } from "@mui/material";
import "./App.css";

// these are typeScript types, which means data structures.
// Here I am saying: the "question" will be of the type "string",
// "correct" will be of the type "boolean" and "correct answer" will be a "string from an array"
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
	const [songs, setSongs] = useState([]);
	const [number, setNumber] = useState(0);
	const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const Total_Songs = musicData.length;

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newSongs = await fetchSongList();
		setQuestion(newSongs);
		setScore(0);
		setUserAnswer([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: any) => {
		const answer = e.target.innerText;

		if (!gameOver) {
			const correct =
				question[number].correct_answer.toLowerCase() == answer.toLowerCase();
			console.log(correct);
			if (correct) setScore((prevSate) => prevSate + 1);
			const answerObject = {
				question: question[number].question,
				answer,
				correct,
				correctAnswer: question[number].correct_answer,
			};
			setUserAnswer((prevSate) => [...prevSate, answerObject]);
		}
	};

	const nextQuestion = () => {
		const nextQ = number + 1;
		if (nextQ === Total_Songs) {
			setGameOver(true);
		} else {
			setNumber(nextQ);
		}
	};

	return (
		<div className="App">
			<h1>This is… Spotiguess!</h1>
			{gameOver || userAnswer.length === Total_Songs ? (
				<Button variant="contained" onClick={startTrivia}>
					Start guessing!
				</Button>
			) : null}
			{/* if it's not game over, then show the Score, and there is not en else, so there's null */}
			{!gameOver ? <p className="score">Score: {score}</p> : null}
			{/* if there page is loading, maybe on internet connection or slow device, then show Loading songs */}
			{loading ? <p className="">Loading songs…</p> : null}
			{/* if it's not loading and game over, then show the MusicPlayerCard component */}
			{!loading && !gameOver && (
				<MusicPlayerCard
					questionNr={number + 1}
					totalSongs={Total_Songs}
					question={question[number].question}
					answers={question[number].answers}
					userAnswer={userAnswer ? userAnswer[number] : undefined}
					callback={checkAnswer}
				/>
			)}
			{!gameOver &&
			!loading &&
			userAnswer.length === number + 1 &&
			number !== Total_Songs ? (
				<Button variant="contained" onClick={nextQuestion}>
					Next song
				</Button>
			) : null}
		</div>
	);
};

export default App;
