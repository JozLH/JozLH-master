import { musicData } from "./data/data";
import { shuffleArray } from "./utils/utils";

// types 
export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
};


// Here gender is a string. 
// If an option other than ANY is selected, then filter the categories based on the selection, the categories come from the musicData.db file)
export const fetchSongList = async (genre: string) => {
	let data = musicData
	if (genre !== "any")
	{
		data = musicData.filter((musicObject) => musicObject.category === genre)
	}
	
	return data.map((question: Question) => ({
		...question,
		answers: shuffleArray([
			...question.incorrect_answers,
			question.correct_answer,
		]),
	}));
};
