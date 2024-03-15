"use client"

import { useCallback, Key } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Switch, Link } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

// TODO: fill with real data
const columns = [
	{ name: "Address", uid: "address" },
	{ name: "Score", uid: "score" },
	{ name: "School", uid: "school" },
	{ name: "Actions", uid: "actions" },
];

const listings = [
	{
		id: 1,
		address: "41 Young Street",
		score: 85,
		school: "Seneca College"
	}
]

type Listing = typeof listings[0];

// !CONSTRAIN: only 3 listings can be compared for now

export default function CompareTable() {
	const router = useRouter();
	// const [isSelected, setIsSelected] = useState(true);

	const renderCell = useCallback((listing: Listing, columnKey: Key) => {
		const cellValue = listing[columnKey as keyof Listing];

		switch (columnKey) {
			case "address":
				return (
					<p>{listing.address}</p>
				);
			case "score":
				return (
					<p>{listing.score}</p>
				);
			case "school":
				return (
					<p>{listing.school}</p>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
							<Switch
								defaultSelected aria-label="Automatic updates"
							// isSelected={isSelected}
							// onValueChange={setIsSelected}	
							/>
						</span>
						<span className="text-danger">
							<svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.7778 31H6.22222C4.504 31 3.11111 29.6121 3.11111 27.9V7.75H0V4.65H6.22222V3.1C6.22222 1.38792 7.61511 0 9.33333 0H18.6667C20.3849 0 21.7778 1.38792 21.7778 3.1V4.65H28V7.75H24.8889V27.9C24.8889 29.6121 23.496 31 21.7778 31ZM6.22222 7.75V27.9H21.7778V7.75H6.22222ZM9.33333 3.1V4.65H18.6667V3.1H9.33333ZM18.6667 24.8H15.5556V10.85H18.6667V24.8ZM12.4444 24.8H9.33333V10.85H12.4444V24.8Z" fill="#D32F2F" />
							</svg>
						</span>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<div className="flex flex-col justify-center mt-10 [&>*]:mb-16">
			<div className="flex items-center justify-center ">
				<hr className="border-[#2196F3] grow hidden sm:inline-block" />
				<hr className="border-[#f0f0f0] grow hidden sm:inline-block" />
				<p className="text-5xl font-bold text-center mx-10">My Listing</p>
				<hr className="border-[#f0f0f0] grow hidden sm:inline-block" />
				<hr className="border-[#2196F3] grow hidden sm:inline-block" />
			</div>

			<Table aria-label="Listing Table" className="px-40">
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
				</TableHeader>
				<TableBody items={listings}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>

			<div className="px-60 flex justify-center">
				<Link href="/#getscore">
					<Button color="primary" className="text-white text-lg rounded py-1 justify-center bg-[#2196F3] justify-self-start hover:text-white">
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.52863 11.6332C3.22671 11.9322 3.05713 12.3376 3.05713 12.7603C3.05713 13.183 3.22671 13.5884 3.52863 13.8875L9.60773 19.905C9.91018 20.2042 10.3204 20.3723 10.7481 20.3723C11.1758 20.3723 11.586 20.2042 11.8885 19.905C12.1909 19.6058 12.3608 19.1999 12.3608 18.7768C12.3608 18.3536 12.1909 17.9478 11.8885 17.6486L8.56087 14.3553L20.9588 14.3553C21.3863 14.3553 21.7964 14.1873 22.0988 13.8882C22.4011 13.589 22.571 13.1833 22.571 12.7603C22.571 12.3373 22.4011 11.9316 22.0988 11.6325C21.7964 11.3333 21.3863 11.1653 20.9588 11.1653L8.56087 11.1653L11.8885 7.87314C12.0382 7.72498 12.157 7.54909 12.2381 7.35551C12.3191 7.16193 12.3608 6.95446 12.3608 6.74493C12.3608 6.5354 12.3191 6.32792 12.2381 6.13434C12.157 5.94076 12.0382 5.76487 11.8885 5.61671C11.7387 5.46855 11.5609 5.35102 11.3653 5.27084C11.1696 5.19066 10.9599 5.14939 10.7481 5.14939C10.5363 5.14939 10.3266 5.19066 10.1309 5.27084C9.93527 5.35102 9.75749 5.46855 9.60773 5.61671L3.52863 11.6332Z" fill="white" />
						</svg>
						Find other place
					</Button>
				</Link>
			</div>
		</div>
	);
}