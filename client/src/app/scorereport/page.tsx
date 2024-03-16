"use client"

import { useEffect, useState } from "react";
import { Button, Link, Card, CardHeader, CardBody, Switch } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useRecoilState } from "recoil";
import { ScoreCriteriaType, ScoreType, scoreState } from "../_recoil/ContextProvider";
import Map from "./_components/map";

// type CriteriaType = {
// 	[key] 
// }

// stupid mapping 
const criteria = {
	transit: 'Transit Score',
	quietEnvironment: 'Walk Score',
	grocery: 'Grocery Store',
	restaurant: 'Restaurant Score'
};

// ... at least is it better than hardcoded desc, oh wait...
// !for demo only, not enough time for proper logic
function getDescription(key: string, score: number) {
	let desc = '';
	switch (key) {
		case 'transit':
			if(score > 60) {
				desc = "Great commute!"
			}
			else if (score > 40 && score <= 60) {
				desc = "Decent commute!"
			}
			else if (score > 10 && score <= 40) {
				desc = "You might have a hard time commuting"
			}
			else {
				desc = "You will definitely have a hard time commuting"
			}
			break;
		case 'quietEnvironment':
			if(score > 60) {
				desc = "Quiet, peaceful environment, lots of parks"
			}
			else if (score > 40 && score <= 60) {
				desc = "Relatively quiet environment"
			}
			else if (score > 10 && score <= 40) {
				desc = "Not a lot of places to go to reduce stress"
			}
			else {
				desc = "Hostile environment, enemy closing in, suit up!"
			}
			break;
		case 'grocery':
			if(score > 60) {
				desc = "Great grocery choices!"
			}
			else if (score > 40 && score <= 60) {
				desc = "Decent grocery choices"
			}
			else if (score > 10 && score <= 40) {
				desc = "Lack of grocery variety"
			}
			else {
				desc = "Get ready to hunt to eat!"
			}
			break;
		case 'restaurant':
			if(score > 60) {
				desc = "Lots of restaurant options to choose from!"
			}
			else if (score > 40 && score <= 60) {
				desc = "Somme options for restaurant"
			}
			else if (score > 10 && score <= 40) {
				desc = "Might need to cook your own food or be ready to commute"
			}
			else {
				desc = "Hope your cooking skill is not rusty!"
			}
			break;
		default:
			desc = 'uh.. https://dota2.fandom.com/wiki/Shitty_Wizard'
			break;
	}

	return desc;
}

export default function ScoreReport() {
	const [bookmarked, setBookmarked] = useState(false);
	const [score, setScore] = useRecoilState(scoreState);
	const router = useRouter();

	const bookmarkScore = () => {
		// TODO: this should also allow deletion from local storage
		// TODO: but for now it will just keep adding stuff
		const storedScore = localStorage.getItem('scores');
		if (storedScore !== null) {
			// ! good enough way to store data for demo
			const storedScoreParse: any[] = JSON.parse(storedScore);
			const data = {
				id: storedScoreParse.length + 1,
				address: score.source,
				score: score.overall,
				school: score.destination
			}
			storedScoreParse.push(data);
			if (typeof window !== "undefined"){
				localStorage.setItem('scores', JSON.stringify(storedScoreParse));
			}
		} else {
			if (typeof window !== "undefined"){
				localStorage.setItem('scores', JSON.stringify([
					{
						id: 1,
						address: score.source,
						score: score.overall,
						school: score.destination
					}
				]));
			}
		}

		setBookmarked(!bookmarked);
	}

	return (
		<div className="[&>*]:mb-10">
			<div id="address" className="bg-[#2196F3] font-bold text-white text-center py-3 text-2xl">
				<p>{score.source}</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 px-10 md:px-30 lg:px-40 gap-10 md:gap-15">
				<Card className="justify-self-center md:justify-self-end">
					<CardBody className="text-center justify-center">
						<p className="text-2xl">Total Score</p>
						<p className="text-bold text-7xl">{score.overall}</p>
					</CardBody>
				</Card>
				{/* !I mean, again, pretty rtded, need to reuse css */}
				<div className="grid grid-cols-1 gap-2 justify-self-center md:justify-self-start">
					<div className="justify-self-start flex gap-2">
						<Button
							color="primary"
							className="text-black text-lg rounded py-1 bg-[#CDE7FC] hover:bg-[#2196F3] hover:text-white"
							onClick={() => bookmarkScore()}>
							{

								bookmarked ?
									<>
										<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M19.4117 0.511971C19.7738 0.853534 19.9851 1.3246 19.9992 1.82159C20.0133 2.31859 19.829 2.80083 19.4869 3.16228L8.83665 14.4136C8.66404 14.5956 8.45662 14.7413 8.22664 14.842C7.99665 14.9426 7.74878 14.9963 7.49765 14.9998C7.24652 15.0033 6.99724 14.9566 6.76453 14.8623C6.53182 14.7681 6.32041 14.6282 6.14277 14.4511L0.504424 8.82543C0.172438 8.46995 -0.00829807 7.99978 0.000292811 7.51397C0.00888369 7.02816 0.206131 6.56465 0.550479 6.22108C0.894827 5.8775 1.35939 5.6807 1.84629 5.67213C2.3332 5.66356 2.80443 5.84389 3.16071 6.17512L7.43333 10.4356L16.7554 0.58698C17.0977 0.225681 17.5699 0.0148173 18.068 0.000751445C18.5661 -0.0133144 19.0494 0.170569 19.4117 0.511971Z" fill="black" />
										</svg>
										<p>Added to List</p>
									</>
									:
									<>
										<svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.92234C0 2.14728 0.296316 1.40398 0.823762 0.855933C1.35121 0.307888 2.06658 0 2.8125 0H12.1875C12.9334 0 13.6488 0.307888 14.1762 0.855933C14.7037 1.40398 15 2.14728 15 2.92234V18.5354C15 19.7238 13.7062 20.4154 12.7762 19.7248L7.5 15.8089L2.22375 19.7248C1.29281 20.4164 0 19.7248 0 18.5364V2.92234ZM2.8125 1.94822C2.56386 1.94822 2.3254 2.05085 2.14959 2.23354C1.97377 2.41622 1.875 2.66399 1.875 2.92234V17.5895L6.6825 14.0214C6.92103 13.8443 7.20685 13.7491 7.5 13.7491C7.79315 13.7491 8.07897 13.8443 8.3175 14.0214L13.125 17.5895V2.92234C13.125 2.66399 13.0262 2.41622 12.8504 2.23354C12.6746 2.05085 12.4361 1.94822 12.1875 1.94822H2.8125Z" fill="black" />
										</svg>
										<p>Add to List</p>
									</>
							}

						</Button>
						<Link href="/comparetable">
							<Button color="primary" className="text-black text-lg rounded py-1 bg-[#CDE7FC] hover:bg-[#2196F3] hover:text-white">
								Compare
								<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M22.2668 13.8873C22.5687 13.5883 22.7383 13.1829 22.7383 12.7602C22.7383 12.3375 22.5687 11.9321 22.2668 11.633L16.1877 5.61552C15.8852 5.31629 15.475 5.14819 15.0473 5.14819C14.6196 5.14819 14.2094 5.31629 13.9069 5.61552C13.6045 5.91474 13.4346 6.32057 13.4346 6.74373C13.4346 7.1669 13.6045 7.57273 13.9069 7.87195L17.2345 11.1652L4.83665 11.1652C4.40906 11.1652 3.99899 11.3332 3.69664 11.6323C3.39429 11.9315 3.22443 12.3372 3.22443 12.7602C3.22443 13.1832 3.39429 13.5889 3.69664 13.888C3.99899 14.1872 4.40906 14.3552 4.83664 14.3552L17.2345 14.3552L13.9069 17.6474C13.7572 17.7955 13.6384 17.9714 13.5573 18.165C13.4763 18.3586 13.4346 18.5661 13.4346 18.7756C13.4346 18.9851 13.4763 19.1926 13.5573 19.3862C13.6384 19.5797 13.7572 19.7556 13.9069 19.9038C14.0567 20.052 14.2345 20.1695 14.4301 20.2497C14.6258 20.3299 14.8355 20.3711 15.0473 20.3711C15.2591 20.3711 15.4688 20.3299 15.6645 20.2497C15.8601 20.1695 16.0379 20.052 16.1877 19.9038L22.2668 13.8873Z" fill="black" />
								</svg>
							</Button>
						</Link>
					</div>
					<Link href="/#getscore">
						<Button color="primary" className="text-black text-lg rounded py-1 bg-[#CDE7FC] justify-self-start hover:bg-[#2196F3] hover:text-white">
							<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.52863 11.6332C3.22671 11.9322 3.05713 12.3376 3.05713 12.7603C3.05713 13.183 3.22671 13.5884 3.52863 13.8875L9.60773 19.905C9.91018 20.2042 10.3204 20.3723 10.7481 20.3723C11.1758 20.3723 11.586 20.2042 11.8885 19.905C12.1909 19.6058 12.3608 19.1999 12.3608 18.7768C12.3608 18.3536 12.1909 17.9478 11.8885 17.6486L8.56087 14.3553L20.9588 14.3553C21.3863 14.3553 21.7964 14.1873 22.0988 13.8882C22.4011 13.589 22.571 13.1833 22.571 12.7603C22.571 12.3373 22.4011 11.9316 22.0988 11.6325C21.7964 11.3333 21.3863 11.1653 20.9588 11.1653L8.56087 11.1653L11.8885 7.87314C12.0382 7.72498 12.157 7.54909 12.2381 7.35551C12.3191 7.16193 12.3608 6.95446 12.3608 6.74493C12.3608 6.5354 12.3191 6.32792 12.2381 6.13434C12.157 5.94076 12.0382 5.76487 11.8885 5.61671C11.7387 5.46855 11.5609 5.35102 11.3653 5.27084C11.1696 5.19066 10.9599 5.14939 10.7481 5.14939C10.5363 5.14939 10.3266 5.19066 10.1309 5.27084C9.93527 5.35102 9.75749 5.46855 9.60773 5.61671L3.52863 11.6332Z" fill="black" />
							</svg>
							Find other place
						</Button>
					</Link>
					<Button color="primary" isDisabled className="text-black text-lg rounded py-1 bg-[#CDE7FC] justify-self-start hover:bg-[#2196F3] hover:text-white">Get score for your site</Button>
				</div>
			</div>
			{/* TODO: update this after connecting to API */}
			<div className="w-full flex justify-center">
				<Map source={score.source} destination={score.destination} />
			</div>
			<div className="flex flex-col xl:flex-row justify-between px-10 md:px-20 lg:px-60 gap-10">
				{
					Object.keys(score.scores).map((key, idx) =>
						<Card key={idx}>
							<CardBody className="flex flex-row gap-4">
								<div>
									<Switch className="mb-3" defaultSelected aria-label="Automatic updates" />
									<p className="font-bold text-4xl justify-self-end">{score.scores[key as keyof ScoreCriteriaType]}</p>
								</div>
								<div>
									<p className="font-bold text-large mb-3">{criteria[key as keyof ScoreCriteriaType]}</p>
									<p className="justify-self-start">{getDescription(key, score.scores[key as keyof ScoreCriteriaType])}</p>
								</div>
							</CardBody>
						</Card>
					)
				}
			</div>
		</div>
	);
}