import type { Metadata } from "next";
import { Inter } from "next/font/google";

import RecoilContextProvider from "./_recoil/ContextProvider";
import { UIProvider } from "./_nextui/UIProvider";
import GNavBard from "./_components/navigation";
import GFooter from "./_components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "StudentSpace",
	description: "Gateway to the perfect space to start your student journey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>
				<RecoilContextProvider>
					<UIProvider>
						<GNavBard/>
						{children}
						<GFooter/>
					</UIProvider>
				</RecoilContextProvider>
			</body>
		</html>
	);
}
