"use client"

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";

export default function GNavBard() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			className="bg-[#F7F8FB] py-2 px-[5%] w-full"
			classNames={{ wrapper: "px-0 justify-between max-w-full", item: "px-0" }}>
			<NavbarBrand className="sm:inline-block hidden">
				<Link href="/">
					<Image
						src="/assets/images/logo_full_horizontal_2.png"
						width={200}
						height={200}
						style={{ minWidth: "150px" }}
						alt="logo"
					/>
				</Link>
			</NavbarBrand>
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				onClick={() => setIsMenuOpen(true)}
				className="sm:hidden"
			/>
			<NavbarContent className="hidden sm:flex" justify="end">
				<NavbarItem>
					<Link color="foreground" href="/#about">
						About
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="/#getscore">
						Get Score
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="/#resources">
						Resources
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="/#faqs">
						FAQs
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="/#contact">
						Contact Us
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem>
					<Link color={"primary"} className="w-full" href="/#about" size="lg" onClick={() => setIsMenuOpen(false)}>
						About
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link color={"primary"} className="w-full" href="/#getscore" size="lg" onClick={() => setIsMenuOpen(false)}>
						Get Score
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link color={"primary"} className="w-full" href="/#resources" size="lg" onClick={() => setIsMenuOpen(false)}>
						Resources
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link color={"primary"} className="w-full" href="/#faqs" size="lg" onClick={() => setIsMenuOpen(false)}>
						FAQs
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link color={"primary"} className="w-full" href="#/contact" size="lg" onClick={() => setIsMenuOpen(false)}>
						Contact Us
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}