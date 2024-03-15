"use client"

import { useState } from "react";
import Image from "next/image";
import { FormEvent } from "react";
import { Input, Link, Accordion, AccordionItem, Button, Textarea } from "@nextui-org/react";

// TODO: refac
// TODO: this shit ain't mobile friendly yet

export default function Home() {
	const [fName, setFName] = useState('');
	const [lName, setLName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const formData = new FormData(event.currentTarget)
		// const response = await fetch('/api/submit', {
		//   method: 'POST',
		//   body: formData,
		// })
	};

	const onSubmitContactForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();



		setFName('');
		setLName('');
		setEmail('');
		setMessage('');
	}

	return (
		<main className="flex flex-col items-center m-auto [&>*]:w-full [&>*]:mb-16 max-w-screen-2xl">
			<div id="hero" className="h-[480px]">
				<div className="absolute -z-10 w-full w-inherit left-0 h-[380px] md:h-[400px] lg:h-[480px]">
					<Image
						src="/assets/images/hero.jpg"
						fill
						style={{ objectFit: "cover" }}
						quality={100}
						alt="logo"
					/>
				</div>
				<div className="align-middle h-full mx-10 sm:mx-16 pt-12 md:pt-16 lg:pt-32 [&>*]:mb-8">
					<Image
						src="/assets/images/logo_full_horizontal_3.png"
						width={280}
						height={200} // !this is not the correct way to size this, check docs
						alt="logo"
					/>
					<p className="text-3xl max-w-full md:max-w-[40%]">Gateway to the perfect space to start your student journey</p>
					<Link href="#getscore" className="bg-[#2196F3] text-white px-4 py-3 md:px-5 md:py-4 ">
						<span className="flex gap-3 items-center">
							<p className="hidden sm:inline-block">Looking for a neighborhood?</p>
							<Image
								src="/assets/images/logo_2.png"
								width={20}
								height={20}
								alt="logo"
								className="sm:hidden inline-block"
							/>
							<svg className="pl-1" width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="1.41418" y1="1.8798" x2="9.01017" y2="9.58588" stroke="white" stroke-width="2" stroke-linecap="round" />
								<line x1="16.9542" y1="1.41168" x2="9.41168" y2="9.91543" stroke="white" stroke-width="2" stroke-linecap="round" />
							</svg>
						</span>
					</Link>
				</div>
			</div>
			<hr id="about" className="hidden" />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-[5%]">
				<p className="text-4xl col-span-2">About Us</p>
				<div className="col-span-2 sm:col-span-1 [&>*]:mb-5 [&>*]:text-xl [&>*]:font-light">
					<p>Student Space is more than just a platform - we are your trusted allies in the exciting journey of finding a perfect place to call home.</p>
					<p>Created with the main purpose of ensuring that students can seamlessly discover not just safe and convenient housing options, but also places that are beneficial to your academic advancement and mental health. </p>
				</div>
				<div className="relative h-[200px] sm:h-auto">
					<Image
						src="/assets/images/about_us.png"
						fill
						style={{ objectFit: "contain", minHeight: "200px" }}
						alt="about us"
					/>
				</div>
			</div>
			<hr id="getscore" className="border-1 border-[#f0f0f0]" />
			<div className="grid grid-cols-4 -pmx-[5%]">
				<div className="hidden md:inline-block self-end w-full left-0">
					<div className="">
						<Image
							src="/assets/images/extra_graphic_2.png"
							width={200}
							height={200}
							className="bottom-0"
							alt="extra graphic 1"
						/>
					</div>
				</div>
				<div className="col-span-4 mx-10 md:col-span-2 md:mx-5">
					<form onSubmit={onSubmit} className="flex flex-col items-center gap-10">
						<div className="mb-6">
							<p className="text-4xl mb-2">Find Your Neighborhood</p>
							<p className="font-light">Search for an address and see what the area has to offer</p>
						</div>
						<Input
							variant="bordered"
							type="text"
							label="Location"
							name="location"
							startContent={
								<svg width="21" height="21" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M24.1245 25.3257L16.7426 17.9425C13.4588 20.2771 8.93375 19.7061 6.33289 16.6288C3.73204 13.5515 3.92301 8.9946 6.77222 6.14571C9.62068 3.29558 14.178 3.10378 17.2559 5.7045C20.3338 8.30521 20.9051 12.8307 18.5703 16.1148L25.9522 23.498L24.1258 25.3244L24.1245 25.3257ZM12.2515 6.45827C9.80209 6.45773 7.68891 8.17708 7.19134 10.5754C6.69376 12.9737 7.94856 15.3918 10.196 16.3657C12.4435 17.3396 15.0659 16.6015 16.4755 14.5984C17.8852 12.5954 17.6946 9.87774 16.0193 8.09096L16.8007 8.86596L15.9198 7.98763L15.9043 7.97213C14.9379 6.99973 13.6224 6.45458 12.2515 6.45827Z" fill="#B3B3B3" />
								</svg>
							}
						/>
						<Input
							variant="bordered"
							type="text"
							name="school"
							label="Your school"
							startContent={
								<svg width="21" height="21" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M24.1245 25.3257L16.7426 17.9425C13.4588 20.2771 8.93375 19.7061 6.33289 16.6288C3.73204 13.5515 3.92301 8.9946 6.77222 6.14571C9.62068 3.29558 14.178 3.10378 17.2559 5.7045C20.3338 8.30521 20.9051 12.8307 18.5703 16.1148L25.9522 23.498L24.1258 25.3244L24.1245 25.3257ZM12.2515 6.45827C9.80209 6.45773 7.68891 8.17708 7.19134 10.5754C6.69376 12.9737 7.94856 15.3918 10.196 16.3657C12.4435 17.3396 15.0659 16.6015 16.4755 14.5984C17.8852 12.5954 17.6946 9.87774 16.0193 8.09096L16.8007 8.86596L15.9198 7.98763L15.9043 7.97213C14.9379 6.99973 13.6224 6.45458 12.2515 6.45827Z" fill="#B3B3B3" />
								</svg>
							}
						/>
						<Button color="primary" className="text-2xl rounded py-6 px-6 bg-[#2196F3]" type="submit">Get Score</Button>
					</form>
				</div>
				<div className="hidden md:inline-block self-end w-full left-0">
					<Image
						src="/assets/images/extra_graphic_1.png"
						width={390}
						height={214}
						className="ml-auto mr-0"
						alt="extra graphic 1"
					/>
				</div>
			</div>
			<hr id="resources" className="border-1 border-[#f0f0f0]" />
			<div className="flex flex-col px-10 gap-16">
				<div>
					<p className="text-4xl text-center mb-2">Student Housing Resources</p>
					<p className="font-light text-center">First time renters? New to Canada? Check out these resources!</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mmd:gap-20 md:px-40">
					{/* !this shit could have been so much cleaner with css instead of tailwind */}
					<div className="grid content-start">
						<p className="justify-self-start bg-[#AECCF2] font-semibold ml-3 px-3 py-1">Official Guild</p>
						<Link href="https://www.canada.ca/en/financial-consumer-agency/services/renting-first-apartment.html">
							<div className="w-full hover:bg-[#AECCF2] text-black border-[#AECCF2] border-2 px-6 py-4">
								<p>First Time Renting Guild</p>
								<p className="font-light">by Canada | 20 MIN READ</p>
							</div>
						</Link>
					</div>
					<div className="grid content-start">
						<p className="justify-self-start bg-[#AECCF2] font-semibold ml-3 px-3 py-1">Student Housing</p>
						<Link href="https://studentlife.utoronto.ca/task/housing-scams-and-how-to-spot-them/">
							<div className="w-full hover:bg-[#AECCF2] text-black border-[#AECCF2] border-2 px-6 py-4">
								<p>How To Avoid Housing Scams</p>
								<p className="font-light">by University of Toronto | 50 MIN READ</p>
							</div>

						</Link>
					</div>
					<div className="grid content-start">
						<p className="justify-self-start bg-[#AECCF2] font-semibold ml-3 px-3 py-1">Ontario Guild</p>
						<Link href="https://news.ontario.ca/en/release/41515/know-your-rights-and-responsibilities-as-a-student-renter">
							<div className="w-full hover:bg-[#AECCF2] text-black border-[#AECCF2] border-2 px-6 py-4">
								<p>Rights and Responsibilities as a Student Renter</p>
								<p className="font-light">by Ontario News | 10 MIN READ</p>
							</div>
						</Link>
					</div>
					<div className="grid content-start">
						<p className="justify-self-start bg-[#AECCF2] font-semibold ml-3 px-3 py-1">International Students</p>
						<Link href="https://immigrationnewscanada.ca/international-students-rentals-in-canada/">
							<div className="w-full hover:bg-[#AECCF2] text-black border-[#AECCF2] border-2 px-6 py-4">
								<p>International Students Rentals in Canada</p>
								<p className="font-light">by Immigration News Canada | 25 MIN READ</p>
							</div>
						</Link>
					</div>
				</div>
				<div className="relative h-[220px] sm:inline-block hidden">
					<Image
						src="/assets/images/resources.png"
						fill
						style={{ objectFit: "contain" }}
						quality={100}
						alt="resources"
					/>
				</div>
			</div>
			<hr id="faqs" className="border-1 border-[#f0f0f0]" />
			<div className="flex flex-col px-10 gap-16">
				<div>
					<p className="text-4xl text-center mb-2">Frequently Asked Questions</p>
					<p className="font-light text-center">Click the questions to access the drop down answers</p>
				</div>
				<div className="md:px-30 xl:px-40 grid md:grid-cols-[97px_minmax(0px,_1fr)_138px] grid-cols-1 gap-10">
					<Image
						src="/assets/images/extra_graphic_4.png"
						width={97}
						height={84}
						alt="logo"
						className="justify-self-end hidden md:inline-block"
					/>
					<Accordion variant="splitted">
						<AccordionItem key="1" aria-label="Accordion 1" title="What is Student Space?">
							asd
						</AccordionItem>
						<AccordionItem key="2" aria-label="Accordion 2" title="How do we calculate score?">
							asd
						</AccordionItem>
						<AccordionItem key="3" aria-label="Accordion 3" title="Assets and softwares we used for this demo">
							Images - Unsplash Icons - Freepik  Planning - Figma Map - Google
						</AccordionItem>
						<AccordionItem key="4" aria-label="Accordion 4" title="Who we are and our values">
							asd
						</AccordionItem>
					</Accordion>
					<Image
						src="/assets/images/extra_graphic_3.png"
						width={138}
						height={141}
						alt="logo"
						className="justify-self-start self-end hidden md:inline-block"
					/>
				</div>
			</div>
			<hr id="contact" className="border-1 border-[#f0f0f0]" />
			<div className="flex justify-center px-10 md:px-30 lg:px-40 gap-10">
				<Image
					src="/assets/images/mailbox.jpg"
					width={340}
					height={340}
					style={{ objectFit: "cover" }}
					alt="mailbox"
					className="hidden lg:block"
				/>
				<form onSubmit={onSubmitContactForm} className="grid grid-cols-2 items-center gap-5">
					<div className="mb-2 col-span-2">
						<p className="text-4xl mb-2 text-center sm:text-start">Still Have Questions? Contact Us!</p>
						<p className="font-light text-center sm:text-start">Leave a message and we will get back to you soon!</p>
					</div>
					<Input
						variant="bordered"
						type="text"
						label="First Name"
						name="fname"
						value={fName}
						onValueChange={setFName}
						className="col-span-2 sm:col-span-1"
					/>
					<Input
						variant="bordered"
						type="text"
						label="Last Name"
						name="lname"
						value={lName}
						onValueChange={setLName}
						className="col-span-2 sm:col-span-1"
					/>
					<Input
						variant="bordered"
						type="email"
						label="Email"
						name="email"
						value={email}
						onValueChange={setEmail}
						className="col-span-2"
					/>
					<Textarea
						label="Your Message"
						placeholder="Leave us a message"
						value={message}
						onValueChange={setMessage}
						className="col-span-2"
					/>
					<Button color="primary" className="text-2xl rounded py-6 px-6 bg-[#2196F3] col-span-2 justify-self-end" type="submit">Submit</Button>
				</form>
			</div>
		</main>
	);
}

