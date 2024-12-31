import React from "react";
import NavigationHeader from "@/components/NavigationHeader";
import LaptopSyrup from "@/public/LaptopSyrup.png";
import Image from "next/image";
import { Pacifico, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import HeroAbstract from "@/public/HeroAbstract.svg";

const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
});

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function Home() {
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <main className={roboto.className}>
            <NavigationHeader title="Syrup" links={navLinks} />
            {/* Hero */}
            <div className="relative bg-[#A02801] flex flex-row items-center text-center px-16 pt-32 overflow-hidden h-screen">
                {/* Right */}
                <div className="flex-1 p-8 flex justify-center items-center h-full">
                    <Image
                        src={LaptopSyrup}
                        alt="Laptop with Syrup"
                        className="max-w-full h-auto rounded-lg"
                        quality={100}
                    />
                </div>

                {/* Left */}
                <div className="flex-1 flex flex-col h-full text-primary-foreground text-left gap-8">
                    <h1 className={cn(pacifico.className, "text-5xl")}>
                        Syrup
                    </h1>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl">
                            Save Money. Stay Transparent.
                        </h1>
                        <p className="text-lg">
                            Syrup is the ethical, open-source browser extension
                            that finds and applies the best discounts,
                            <b>
                                {" "}
                                no tracking, no bullshit, just savings you can
                                trust.
                            </b>
                        </p>
                    </div>
                </div>

                {/* Abstract svgs */}
                <div className="absolute bottom-0 right-0 w-full h-full -z-1 select-none pointer-events-none">
                    <Image
                        src={HeroAbstract}
                        alt="Hero Abstract"
                        className="absolute -bottom-32 -right-16"
                    />
                </div>
            </div>

            {/*  */}
            <div className="h-96"></div>
        </main>
    );
}
