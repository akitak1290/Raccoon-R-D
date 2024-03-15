import Image from "next/image";
import Link from "next/link";


export default function GFooter() {
	return (
		<div className="bg-[#283238] text-white px-[5%] py-10 [&>*]:mb-8">
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-2 gap-10 lg:gap-0">
				<div className="flex flex-col items-center gap-1 [&>*]:mb-3">
					<Image
						src="/assets/images/logo_full_horizontal_1.png"
						width={280}
						height={200} // !this is not the correct way to size this, check docs
						alt="logo"
					/>
					<p className="font-bold">Raccoon R-D Team</p>
					<div className="font-extralight [&>*]:mb-1.5">
						<span className="grid grid-cols-2 gap-6">
							<p className="justify-self-end">Software Developer</p>
							<p className="justify-self-start">Anh Kien Nguyen</p>
						</span>
						<span className="grid grid-cols-2 gap-6">
							<p className="justify-self-end">Software Developer</p>
							<p className="justify-self-start">Viet Bach Ha</p>
						</span>
						<span className="grid grid-cols-2 gap-6">
							<p className="justify-self-end">Visual Designer</p>
							<p className="justify-self-start">Diem Hang Pham</p>
						</span>
					</div>
				</div>
				<div className="flex flex-col items-center gap-10 border-x-0 lg:border-x-1 border-[#f0f0f0]">
					<Image
						src="/assets/images/logo_full_horizontal_4.png"
						width={180}
						height={100} // !this is not the correct way to size this, check docs
						alt="logo"
					/>
					<p className="font-extralight">Created by students, for students</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0 [&>*]:justify-self-center">
					<div className="flex flex-col sm:text-left text-center gap-1.5 font-extralight">
						<p className="font-bold no-underline mb-2">Navigate</p>
						<Link className="underline" color="foreground" href="/#about">
							About Us
						</Link>
						<Link className="underline" color="foreground" href="/#getscore">
							Get Score
						</Link>
						<Link className="underline" color="foreground" href="/#resources">
							Resources
						</Link>
						<Link className="underline" color="foreground" href="/#faqs">
							FAQs
						</Link>
						<Link className="underline" color="foreground" href="/#contact">
							Contact Us
						</Link>
						<p></p>
					</div>
					<div className="flex flex-col sm:text-left text-center gap-1.5 font-extralight">
						<p className="font-bold mb-2">Student Space</p>
						<p>Monday - Friday</p>
						<p>9871 - 4 Finch Avenue West</p>
						<p>North York, Ontario M2J2X5</p>
						<p>+1 (123) - 456 - 5124</p>
						<p>akitak1290@gmail.com</p>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center">
				<hr className="border-[#f0f0f0] grow hidden sm:inline-block" />
				<div className="flex gap-2 sm:gap-10 mx-6">
					<Image
						src="/assets/images/twitter.png"
						width={31}
						height={31}
						alt="logo"
					/>
					<Image
						src="/assets/images/instagram.png"
						width={31}
						height={31}
						alt="logo"
					/>
					<Image
						src="/assets/images/facebook.png"
						width={31}
						height={31}
						alt="logo"
					/>
					<Image
						src="/assets/images/github.png"
						width={31}
						height={31}
						alt="logo"
					/>
					<Image
						src="/assets/images/linkedin.png"
						width={31}
						height={31}
						alt="logo"
					/>
				</div>
				<hr className="border-[#f0f0f0] grow hidden sm:inline-block" />
			</div>
			<div>
				<p className="text-center font-extralight mb-2">Copyright © 2024 StudentSpace</p>
				<div className="text-center [&>*]:px-8 [&>*]:underline [&>*]:decoration-solid">
					<Link color="foreground" href="#">
						Legal
					</Link>
					<Link className="border-x-1" color="foreground" href="#">
						Privacy
					</Link>
					<Link color="foreground" href="#">
						Security
					</Link>
				</div>
			</div>
		</div>
	);
}