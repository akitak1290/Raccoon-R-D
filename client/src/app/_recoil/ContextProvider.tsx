"use client";

import { RecoilRoot, atom } from "recoil";

export type ScoreCriteriaType = {
	transit: number,
	grocery: number,
	restaurant: number,
	quietEnvironment: number
};

export type ScoreType = {
	overall: number,
	scores: ScoreCriteriaType,
	source: string,
	destination: string
};

export const scoreState = atom<ScoreType>({
	key: "scoreState",
	default: {
		overall: 0,
		scores: {
			transit: 0,
			grocery: 0,
			restaurant: 0,
			quietEnvironment: 0
		},
		source: '',
		destination: ''
	},
});

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
	return <RecoilRoot>{children}</RecoilRoot>;
}